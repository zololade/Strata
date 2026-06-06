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
    let project = new Project(payload);
    store.projects.set(project.id, project);
    return { type: "createdProject", id: project.id };
  },

  createTask(store: StoredType, projectId: string, payload: NewTaskInput) {
    let task = new Task(payload);
    let project = store.projects.get(projectId);

    if (!project) return;
    project.tasks.add(task.id);
    store.tasks.set(task.id, task);
    return { type: "createdTask", id: task.id };
  },

  createItem(store: StoredType, taskId: string, payload: NewItemInput) {
    let item = new Item(payload);
    let task = store.tasks.get(taskId);

    if (!task) return;
    task.items.add(item.id);
    store.items.set(item.id, item);
    return { type: "createItem", id: item.id };
  },
};

export { createHandler };
