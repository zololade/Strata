import type { EnqueuePersist } from "../persistence/writeQueue";
import type { Command, Result } from "../types/command";
import type { StoredType } from "../types/Types";
import * as Item from "./Items";
import * as Project from "./Projects";
import * as Task from "./Tasks";

function createReducer(enqueuePersist: EnqueuePersist) {
  return function reducer(store: StoredType, command: Command): Result {
    switch (command.type) {
      case "removeProject":
        return Project.removeProject(store, enqueuePersist, command.data);
      case "removeTask":
        return Task.removeTask(store, enqueuePersist, command.data);
      case "removeItem":
        return Item.removeItem(store, enqueuePersist, command.data);
      case "createProject":
        return Project.createProject(store, enqueuePersist, command.data);
      case "createTask":
        return Task.createTask(store, enqueuePersist, command.data);
      case "createItem":
        return Item.createItem(store, enqueuePersist, command.data);
      case "updateProject":
        return Project.updateProject(store, enqueuePersist, command.projectId, command.data);
      case "updateTask":
        return Task.updateTask(store, enqueuePersist, command.taskId, command.data);
      case "updateItem":
        return Item.updateItem(store, enqueuePersist, command.itemId, command.data);
      default:
        throw new Error(`Unhandled command type: ${(command as Command).type}`);
    }
  };
}

export { createReducer };
