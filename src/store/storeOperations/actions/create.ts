import type {
  ItemInput,
  ProjectInput,
  StoredType,
  TaskInput,
} from "../../../lib/Types";
import { Item } from "../../models/Item";
import { Project } from "../../models/Project";
import { Task } from "../../models/Task";

const createHandler = {
  createProject(store: StoredType, payload: ProjectInput) {
    let project = new Project(payload);
    store.projects.set(project.id, project);
    return project;
  },

  createTask(store: StoredType, projectId: string, payload: TaskInput) {
    let task = new Task(payload);
    let project = store.projects.get(projectId);

    if (!project) return;
    project.tasks.add(task.id);
    store.tasks.set(task.id, task);
    return task;
  },

  createItem(store: StoredType, taskId: string, payload: ItemInput) {
    let item = new Item(payload);
    let task = store.tasks.get(taskId);

    if (!task) return;
    task.items.add(item.id);
    store.items.set(item.id, item);
    return item;
  },
};

export { createHandler };
