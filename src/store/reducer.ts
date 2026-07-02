import type { Command, Result } from "../types/command";
import * as Item from "./Items";
import * as Project from "./Projects";
import type { ProjectStore } from "./Store";
import * as Task from "./Tasks";

function reducer(store: ProjectStore, command: Command): Result {
  switch (command.type) {
    case "removeProject":
      return Project.removeProject(store, command.data);
    case "removeTask":
      return Task.removeTask(store, command.data);
    case "removeItem":
      return Item.removeItem(store, command.data);
    case "createProject":
      return Project.createProject(store, command.data);
    case "createTask":
      return Task.createTask(store, command.data);
    case "createItem":
      return Item.createItem(store, command.data);
    case "updateProject":
      return Project.updateProject(store, command.projectId, command.data);
    case "updateTask":
      return Task.updateTask(store, command.taskId, command.data);
    case "updateItem":
      return Item.updateItem(store, command.itemId, command.data);
    default:
      throw new Error(`Unhandled command type: ${(command as Command).type}`);
  }
}

export { reducer };
