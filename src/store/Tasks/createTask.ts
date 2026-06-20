import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { NewTaskInput, StoredType } from "../../types/Types";
import { Task } from "./Task";

function createTask(
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

export { createTask };
