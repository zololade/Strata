type Wrapper = <R>(request: IDBRequest<R>) => Promise<R>;

function wrapper<R>(request: IDBRequest<R>) {
  return new Promise<R>((resolve, reject) => {
    request.addEventListener("error", () => {
      reject(request.error);
    });
    request.addEventListener("success", () => {
      resolve(request.result);
    });
  });
}

export { wrapper, type Wrapper };
