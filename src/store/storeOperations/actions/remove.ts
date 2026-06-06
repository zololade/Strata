import type { Command } from "../../../lib/command";
import type { StoredType } from "../../../lib/Types";
// handlers
function remove(store: StoredType, payLoad: Command) {
  if (!(payLoad.action === "remove")) return;
  switch (payLoad.type) {
    case "removeProject":
      if (payLoad.projectId) store.projects.delete(payLoad.projectId);
      break;

    case "removeTask":
      if (!payLoad.taskId || !payLoad.projectId) break;
      store.tasks.delete(payLoad.taskId);
      const project = store.projects.get(payLoad.projectId);
      if (!project) break;
      project.tasks.delete(payLoad.taskId);
      break;

    case "removeItem":
      if (!payLoad.taskId || !payLoad.itemId) break;
      store.items.delete(payLoad.itemId);
      const task = store.tasks.get(payLoad.taskId);
      if (!task) return;
      task.items.delete(payLoad.taskId);
  }
}

export { remove };
