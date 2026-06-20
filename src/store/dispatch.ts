import { reducer } from "./reducer";
import type { Command } from "../types/command";

function dispatch(command: Command) {
  return reducer(command);
}

export { dispatch };
