import { reducer } from "./reducer";
import type { StoredType } from "../../lib/Types";
import type { Command } from "../../lib/command";

function dispatch(command: Command, store: StoredType) {
  reducer(command, store);
}

export { dispatch };
