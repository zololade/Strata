import { reducer } from "./reducer";
import type { Command } from "../lib/command";

function dispatch(command: Command) {
  return reducer(command);
}

export { dispatch };
