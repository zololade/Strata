import { databaseBus } from "../../../lib/Buses";
import type { Result } from "../../../lib/command";
import type {
  NewItemInput,
  NewProjectInput,
  NewTaskInput,
  StoredType,
} from "../../../lib/Types";
import { Item } from "../../models/Item";
import { Project } from "../../models/Project";
import { Task } from "../../models/Task";

const createHandler = {
  createProject(store: StoredType, payload: NewProjectInput): Result {
    const project = new Project(payload);
    store.projects.set(project.id, project);
    databaseBus.publish("database:update", store);
    return { type: "createdProject", id: project.id };
  },

  createTask(store: StoredType, projectId: string, payload: NewTaskInput) {
    const task = new Task(payload);
    const project = store.projects.get(projectId);

    if (!project) return;
    project.tasks.add(task.id);
    store.tasks.set(task.id, task);
    databaseBus.publish("database:update", store);
    return { type: "createdTask", id: task.id };
  },

  createItem(store: StoredType, taskId: string, payload: NewItemInput) {
    const item = new Item(payload);
    const task = store.tasks.get(taskId);

    if (!task) return;
    task.items.add(item.id);
    store.items.set(item.id, item);
    databaseBus.publish("database:update", store);
    return { type: "createdItem", id: item.id };
  },
};

export { createHandler };
