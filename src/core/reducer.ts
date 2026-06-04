import type { StoredType, Command } from "../lib/Types";
import { removeTask } from "./storeOp";

function reducer(command: Command, store: StoredType) {
  switch (command.type) {
    case "removeTask":
      removeTask(store, command);
      break;
  }
}

export { reducer };
