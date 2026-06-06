import type { StoredType } from "../../lib/Types";
import type { Command } from "../../lib/command";
import { removeTask } from "./actions";

function reducer(command: Command, store: StoredType) {
  switch (command.type) {
    case "removeTask":
      removeTask(store, command);
      break;
  }
}

export { reducer };
