import type { Command } from "../../lib/command";
import { storedProjects as store } from "../Store";
import { createHandler } from "./actions/create";
import { removeHandler } from "./actions/remove";
import { update } from "./actions/update";

function reducer(command: Command) {
  switch (command.type) {
    case "removeProject": {
      return removeHandler.removeProject(store, command.data);
    }
    case "removeTask": {
      return removeHandler.removeTask(store, command.data);
    }
    case "removeItem": {
      return removeHandler.removeItem(store, command.data);
    }
    case "createProject": {
      return createHandler.createProject(store, command.data);
    }
    case "createTask": {
      return createHandler.createTask(store, command.projectId, command.data);
    }
    case "createItem": {
      return createHandler.createItem(store, command.taskId, command.data);
    }
    case "update": {
      return update(store);
    }
  }
}

export { reducer };
