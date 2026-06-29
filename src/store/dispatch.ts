import type { Command } from "../types/command";
import type { StoredType } from "../types/Types";
import { reducer } from "./reducer";

function createDispatch(store: StoredType) {
  return function dispatch(command: Command) {
    return reducer(store, command);
  };
}

export { createDispatch };
