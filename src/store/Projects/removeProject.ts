import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeTask } from "../Tasks";

type Payload = {
  projectId: string;
  onPersistSuccess?: () => void;
};

function removeProject(
  store: StoredType,
  enqueuePersist: EnqueuePersist,
  payload: Payload,
): Result {
  const { projectId } = payload;

  //remove project
  enqueuePersist({
    store: "projects",
    action: "delete",
    id: projectId,
    onSuccess: () => {
      store.projects.delete(projectId);
      const tasks = [...store.tasks.values()].filter((val) => val.projectId === projectId);
      tasks.forEach((val) => removeTask(store, enqueuePersist, { taskId: val.id }));
      if (payload.onPersistSuccess) payload.onPersistSuccess();
    },
  });

  return { type: "removedProject", id: projectId };
}

export { removeProject };
