import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeTask } from "../Tasks";

function removeProject(
  store: StoredType,
  payload: { projectId: string },
): Result {
  const { projectId } = payload;
  //clean up tasks
  const tasks = store.projects.get(projectId)?.tasks;
  if (tasks)
    [...tasks].forEach((task) => {
      const newPayload = {
        taskId: task,
        projectId: projectId,
      };
      removeTask(store, newPayload);
    });

  //remove project
  store.projects.delete(projectId);
  return { type: "removedProject", id: projectId };
}

export { removeProject };
