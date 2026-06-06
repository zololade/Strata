import { reducer } from "./reducer";
import type { Command } from "../../lib/command";
import { storedProjects } from "../Store";

function dispatch(command: Command) {
  reducer(command, storedProjects);
}

export { dispatch };
