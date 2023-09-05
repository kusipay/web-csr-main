export type Response<D> =
  | [isOk: true, error: null, data: D]
  | [isOk: false, error: unknown, data: null];

export const tryFn = async <D = unknown>(
  fn: () => Promise<D>
): Promise<Response<D>> => {
  try {
    const data = await fn();

    return [true, null, data];
  } catch (error) {
    return [false, error, null];
  }
};

export const tryFnSync = <D = unknown>(fn: () => D): Response<D> => {
  try {
    const data = fn();

    return [true, null, data];
  } catch (error) {
    return [false, error, null];
  }
};