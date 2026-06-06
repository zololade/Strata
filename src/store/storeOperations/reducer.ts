import type { StoredType } from "../../lib/Types";
import type { Command } from "../../lib/command";
import { createHandler } from "./actions/create";
import { removeHandler } from "./actions/remove";
import { update } from "./actions/update";

function reducer(command: Command, store: StoredType) {
  switch (command.type) {
    case "removeProject": {
      removeHandler.removeProject(store, command.data);
      break;
    }
    case "removeTask": {
      removeHandler.removeTask(store, command.data);
      break;
    }
    case "removeItem": {
      removeHandler.removeItem(store, command.data);
      break;
    }
    case "createProject": {
      createHandler.createProject(store, command.data);
      break;
    }
    case "createTask": {
      createHandler.createTask(store, command.projectId, command.data);
      break;
    }
    case "createItem": {
      createHandler.createItem(store, command.taskId, command.data);
      break;
    }
    case "update": {
      update(store);
      break;
    }
  }
}

export { reducer };
