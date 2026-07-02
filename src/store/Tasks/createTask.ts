import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { NewTaskInput, StoredType } from "../../types/Types";
import { Task } from "./Task";

function createTask(store: StoredType, projectId: string, payload: NewTaskInput): Result {
  const task = new Task(payload);
  const project = store.projects.get(projectId);

  if (!project) return { type: "notFound", entity: "project" };
  enqueuePersist({
    store: "projects",
    action: "put",
    payload: project,
    onSuccess: () => {
      project.tasks.add(task.id);
    },
  });
  enqueuePersist({
    store: "tasks",
    action: "put",
    payload: task,
    onSuccess: () => {
      store.tasks.set(task.id, task);
    },
  });

  return {
    type: "createdTask",
    id: task.id,
  };
}

export { createTask };
