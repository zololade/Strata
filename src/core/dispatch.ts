import { reducer } from "./reducer";
import type { StoredType, Command } from "../lib/Types";

function dispatch(command: Command, store: StoredType) {
  reducer(command, store);
}

export { dispatch };
