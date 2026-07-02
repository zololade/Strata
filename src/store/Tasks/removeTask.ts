import { enqueuePersist } from "../../persistence/writeQueue";
import type { Result } from "../../types/command";
import type { StoredType } from "../../types/Types";
import { removeItem } from "../Items";

function removeTask(store: StoredType, payload: { taskId: string }): Result {
  const { taskId } = payload;
  //clean up items
  enqueuePersist({
    store: "tasks",
    action: "delete",
    id: taskId,
    onSuccess: () => {
      store.tasks.delete(taskId);
      const items = [...store.items.values()].filter((val) => val.taskId === taskId);
      items.forEach((val) => removeItem(store, { itemId: val.id }));
    },
  });

  return { type: "removedTask", id: taskId };
}

export { removeTask };
