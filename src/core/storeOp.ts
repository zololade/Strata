import type { StoredType } from "../lib/Types";
// handlers
function removeTask(
  store: StoredType,
  { projectId, taskId }: { projectId: string; taskId: string },
) {
  store.tasks.delete(taskId);

  const project = store.projects.get(projectId);
  if (!project) return;

  project.tasks.delete(taskId);
}

export { removeTask };
