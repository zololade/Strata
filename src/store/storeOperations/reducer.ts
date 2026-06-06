import type { StoredType } from "../../lib/Types";
import type { Command } from "../../lib/command";
import { createHandler } from "./actions/create";
import { removeHandler } from "./actions/remove";
import { update } from "./actions/update";

function reducer(command: Command, store: StoredType) {
  switch (command.type) {
    case "removeProject":
      removeHandler.removeProject(store, { projectId: command.projectId });
      break;

    case "removeTask":
      removeHandler.removeTask(store, {
        taskId: command.taskId,
        projectId: command.projectId,
      });
      break;

    case "removeItem":
      removeHandler.removeItem(store, {
        taskId: command.taskId,
        itemId: command.itemId,
      });
      break;

    case "createProject":
      createHandler.createProject(store, command.data);
      break;

    case "update":
      update(store, command);
      break;
  }
}

export { reducer };
