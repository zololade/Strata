import { databaseBus } from "../../../lib/Buses";
import type { Result } from "../../../lib/command";
import type {
  ItemUpdate,
  ProjectUpdate,
  TaskUpdate,
  StoredType,
} from "../../../lib/Types";

// handler
const updateHandler = {
  updateProject(
    store: StoredType,
    projectId: string,
    payload: ProjectUpdate,
  ): Result {
    //get the project then edit
    const project = store.projects.get(projectId);
    if (!project) return { type: "notFound", entity: "project" };

    if (payload.title !== undefined) {
      project.title = payload.title;
    }

    if (payload.overview !== undefined) {
      project.overview = payload.overview;
    }

    if (payload.flag !== undefined) {
      project.flag = payload.flag;
    }

    project.lastModified = Date.now();
    databaseBus.publish("database:update", store);
    return { type: "updatedProject", id: projectId };
  },
  updateTask(store: StoredType, taskId: string, payload: TaskUpdate): Result {
    //get the task then edit
    const task = store.tasks.get(taskId);
    if (!task) return { type: "notFound", entity: "task" };

    if (payload.title !== undefined) {
      task.title = payload.title;
    }

    if (payload.overview !== undefined) {
      task.overview = payload.overview;
    }

    if (payload.flag !== undefined) {
      task.flag = payload.flag;
    }

    task.lastModified = Date.now();
    databaseBus.publish("database:update", store);
    return { type: "updatedTask", id: taskId };
  },
  updateItem(store: StoredType, itemId: string, payload: ItemUpdate): Result {
    //get the item then edit
    const item = store.items.get(itemId);
    if (!item) return { type: "notFound", entity: "item" };

    if (payload.content !== undefined) {
      item.content = payload.content;
    }

    if (payload.note !== undefined) {
      item.note = payload.note;
    }

    if (payload.flag !== undefined) {
      item.flag = payload.flag;
    }

    item.lastModified = Date.now();
    databaseBus.publish("database:update", store);
    return { type: "updatedItem", id: itemId };
  },
};

export { updateHandler };
