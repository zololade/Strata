import { reducer } from "./reducer";
import type { Command } from "../types/command";
import type { StoredType } from "../types/Types";

function createDispatch(store: StoredType) {
  return function dispatch(command: Command) {
    return reducer(store, command);
  };
}

export { createDispatch };
