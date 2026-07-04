import type { EnqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeItem } from "../Items";

type Payload = {
  taskId: string;
  onPersistSuccess?: () => void;
};

function removeTask(store: StoredType, enqueuePersist: EnqueuePersist, payload: Payload): Result {
  const { taskId } = payload;
  //clean up items
  enqueuePersist({
    store: "tasks",
    action: "delete",
    id: taskId,
    onSuccess: () => {
      store.tasks.delete(taskId);
      const items = [...store.items.values()].filter((val) => val.taskId === taskId);
      items.forEach((val) => removeItem(store, enqueuePersist, { itemId: val.id }));
      if (payload.onPersistSuccess) payload.onPersistSuccess();
    },
  });

  return { type: "removedTask", id: taskId };
}

export { removeTask };
