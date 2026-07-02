import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeTask } from "../Tasks";

function removeProject(store: StoredType, payload: { projectId: string }): Result {
  const { projectId } = payload;

  //remove project
  enqueuePersist({
    store: "projects",
    action: "delete",
    id: projectId,
    onSuccess: () => {
      store.projects.delete(projectId);
      const tasks = [...store.tasks.values()].filter((val) => val.projectId === projectId);
      tasks.forEach((val) => removeTask(store, { taskId: val.id }));
    },
  });

  return { type: "removedProject", id: projectId };
}

export { removeProject };
