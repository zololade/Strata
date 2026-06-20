import { databaseBus } from "../../lib/Buses";
import type { Result } from "../../lib/command";
import type {
  NewTaskInput,
  StoredType,
  TaskInput,
  TaskUpdate,
} from "../../lib/Types";
import { Item } from "../Items/Item";

class Task {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;
  createdAt: number;
  lastModified: number;

  constructor(param: NewTaskInput | TaskInput) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.items = new Set(param.items);
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }

  static createTask(
    store: StoredType,
    projectId: string,
    payload: NewTaskInput,
  ) {
    const task = new Task(payload);
    const project = store.projects.get(projectId);

    if (!project) return;
    project.tasks.add(task.id);
    store.tasks.set(task.id, task);
    databaseBus.publish("database:update", store);
    return { type: "createdTask", id: task.id };
  }

  static removeTask(
    store: StoredType,
    payload: { projectId: string; taskId: string },
  ): Result {
    const { taskId, projectId } = payload;
    //clean up items
    const items = store.tasks.get(taskId)?.items;

    if (items)
      [...items].forEach((item) => {
        Item.removeItem(store, {
          itemId: item,
          taskId: taskId,
        });
      });

    store.tasks.delete(taskId);
    const project = store.projects.get(projectId);
    if (!project) return { type: "notFound", entity: "project" };

    //remove task
    project.tasks.delete(taskId);
    return { type: "removedTask", id: taskId };
  }

  static updateTask(
    store: StoredType,
    taskId: string,
    payload: TaskUpdate,
  ): Result {
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
  }
}

export { Task };
