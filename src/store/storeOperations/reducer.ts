import type { Command } from "../../lib/command";
import { getStore } from "../Store";
import { createHandler } from "./actions/create";
import { removeHandler } from "./actions/remove";
import { updateHandler } from "./actions/update";

function reducer(command: Command) {
  switch (command.type) {
    case "removeProject": {
      return removeHandler.removeProject(getStore(), command.data);
    }
    case "removeTask": {
      return removeHandler.removeTask(getStore(), command.data);
    }
    case "removeItem": {
      return removeHandler.removeItem(getStore(), command.data);
    }
    case "createProject": {
      return createHandler.createProject(getStore(), command.data);
    }
    case "createTask": {
      return createHandler.createTask(
        getStore(),
        command.projectId,
        command.data,
      );
    }
    case "createItem": {
      return createHandler.createItem(getStore(), command.taskId, command.data);
    }
    case "updatedProject": {
      return updateHandler.updateProject(
        getStore(),
        command.projectId,
        command.data,
      );
    }
    case "updatedTask": {
      return updateHandler.updateTask(getStore(), command.taskId, command.data);
    }
    case "updatedItem": {
      return updateHandler.updateItem(getStore(), command.itemId, command.data);
    }
  }
}

export { reducer };
