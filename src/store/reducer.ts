import type { Command } from "../types/command";
import * as Item from "./Items";
import * as Project from "./Projects";
import { getStore } from "./Store";
import * as Task from "./Tasks";

function reducer(command: Command) {
  switch (command.type) {
    case "removeProject": {
      return Project.removeProject(getStore(), command.data);
    }
    case "removeTask": {
      return Task.removeTask(getStore(), command.data);
    }
    case "removeItem": {
      return Item.removeItem(getStore(), command.data);
    }
    case "createProject": {
      return Project.createProject(getStore(), command.data);
    }
    case "createTask": {
      return Task.createTask(getStore(), command.projectId, command.data);
    }
    case "createItem": {
      return Item.createItem(getStore(), command.taskId, command.data);
    }
    case "updateProject": {
      return Project.updateProject(getStore(), command.projectId, command.data);
    }
    case "updateTask": {
      return Task.updateTask(getStore(), command.taskId, command.data);
    }
    case "updateItem": {
      return Item.updateItem(getStore(), command.itemId, command.data);
    }
  }
}

export { reducer };
