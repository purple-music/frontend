type SuccessType<S> = {
  type: "success";
  content: S;
};

type ErrorType<E> = {
  type: "error";
  error: E;
};

// TODO
// export type Result<T, E = Error> =
//   | { ok: true; value: T }
//   | { ok: false; error: E };
export type Result<S, E> = SuccessType<S> | ErrorType<E>;

export function success<S>(content: S): SuccessType<S> {
  return { type: "success", content };
}

export function error<E>(error: E): ErrorType<E> {
  return { type: "error", error };
}
