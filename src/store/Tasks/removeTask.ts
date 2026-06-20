import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeItem } from "../Items";

function removeTask(
  store: StoredType,
  payload: { projectId: string; taskId: string },
): Result {
  const { taskId, projectId } = payload;
  //clean up items
  const items = store.tasks.get(taskId)?.items;

  if (items)
    [...items].forEach((item) => {
      removeItem(store, {
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

export { removeTask };
