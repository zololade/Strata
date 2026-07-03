import type { Command, Result } from "../types/command";
import type { StoredType } from "../types/Types";

function createDispatch(
  store: StoredType,
  reducer: (store: StoredType, command: Command) => Result,
) {
  return function dispatch(command: Command) {
    return reducer(store, command);
  };
}

export { createDispatch };
