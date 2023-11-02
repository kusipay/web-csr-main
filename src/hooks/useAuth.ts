import { environment } from "@/environment/environment";
import { tryFn } from "@/utilities/tryFn";
import axios from "axios";
import { useEffect } from "react";

interface TokenSet {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

const { domain, clientId, scope } = environment.auth;

const state = "login";

const createCodeVerifier = (): string => {
  const array = new Uint8Array(64);

  crypto.getRandomValues(array);

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

  return Array.from(array)
    .map((byte) => characters[byte % characters.length])
    .join("");
};

const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  const hash = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hash));

  const fromCharCode = String.fromCharCode(...hashArray);

  return btoa(fromCharCode)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const createRequestParams = (params: {
  clientId: string;
  code: string;
  redirectUri: string;
  codeVerifier: string;
}): { url: string; body: URLSearchParams } => {
  const url = `${domain}/oauth2/token`;

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: params.clientId,
    code: params.code,
    redirect_uri: params.redirectUri,
    code_verifier: params.codeVerifier
  });

  return { url, body };
};

const makeRequest = async (params: {
  url: string;
  body: URLSearchParams;
  abortController: AbortController;
}): Promise<TokenSet> => {
  const { data } = await axios.post<TokenSet>(params.url, params.body, {
    signal: params.abortController.signal,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  return data;
};

const evaluateUrlQuery = (
  urlQueries: string
): [isValid: boolean, code: string] => {
  const urlParams = new URLSearchParams(urlQueries);

  const code = urlParams.get("code") || "";

  const paramState = urlParams.get("state");

  const isValid = Boolean(code) && paramState === state;

  return [isValid, code];
};

const useAuth = (params: { onTokenSuccess: () => void }) => {
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const [isValid, code] = evaluateUrlQuery(window.location.search);

      if (!isValid) {
        return;
      }

      const codeVerifier = sessionStorage.getItem("codeVerifier") || "";

      const currentUrl = window.location.origin;

      const { url, body } = createRequestParams({
        clientId,
        code,
        redirectUri: currentUrl,
        codeVerifier
      });

      const [ok, _, data] = await tryFn<TokenSet>(() =>
        makeRequest({ url, body, abortController })
      );

      sessionStorage.removeItem("codeVerifier");

      if (ok) {
        sessionStorage.setItem("idToken", data.id_token);
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);

        params.onTokenSuccess();
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  const onLogin = async () => {
    const codeVerifier = createCodeVerifier();

    const [isOk, err, codeChallange] = await tryFn(() =>
      generateCodeChallenge(codeVerifier)
    );

    if (!isOk) {
      console.log("ERROR", { err });

      return;
    }

    sessionStorage.setItem("codeVerifier", codeVerifier);

    const currentUrl = window.location.origin;

    const params = [
      `response_type=code`,
      `state=${state}`,
      `client_id=${clientId}`,
      `scope=${scope}`,
      `redirect_uri=${currentUrl}`,
      `code_challenge_method=S256`,
      `code_challenge=${codeChallange}`,
      `code_challenge_method=S256`
    ].join("&");

    window.location.href = `${domain}/login?${params}`;
  };

  const onLogout = () => {
    const currentUrl = window.location.origin;

    const params = [`client_id=${clientId}`, `logout_uri=${currentUrl}`].join(
      "&"
    );

    window.location.href = `${domain}/logout?${params}`;
  };

  return { onLogin, onLogout };
};

export { useAuth };
