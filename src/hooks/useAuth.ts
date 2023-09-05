import { tryFn } from "@/utilities/tryFn";
import { useEffect } from "react";

const { domain, clientId, redirectUri, scope, state } = environment.auth;

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
}): Promise<number> => {
  const response = await fetch(params.url, {
    method: "POST",
    body: params.body,
    signal: params.abortController.signal,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });

  const data = await response.json();

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

const useAuth = () => {
  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      const [isValid, code] = evaluateUrlQuery(window.location.search);

      if (!isValid) {
        return;
      }

      const codeVerifier = sessionStorage.getItem("codeVerifier") || "";

      const { url, body } = createRequestParams({
        clientId,
        code,
        redirectUri,
        codeVerifier
      });

      const [isOk, err, data] = await tryFn(() =>
        makeRequest({ url, body, abortController })
      );

      sessionStorage.removeItem("codeVerifier");

      if (!isOk) {
        console.log("ERROR", { err });

        return;
      }

      console.log("DATA", { data });
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

    const params = [
      `response_type=code`,
      `state=${state}`,
      `client_id=${clientId}`,
      `scope=${scope}`,
      `redirect_uri=${redirectUri}`,
      `code_challenge_method=S256`,
      `code_challenge=${codeChallange}`,
      `code_challenge_method=S256`
    ].join("&");

    window.location.href = `${domain}/login?${params}`;
  };

  const onLogout = () => {
    const params = [`client_id=${clientId}`, `logout_uri=${redirectUri}`].join(
      "&"
    );

    window.location.href = `${domain}/logout?${params}`;
  };

  return { onLogin, onLogout };
};

export { useAuth };
