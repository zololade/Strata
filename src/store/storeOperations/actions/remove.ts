import type { Result } from "../../../lib/command";
import type { StoredType } from "../../../lib/Types";

const removeHandler = {
  //handlers
  removeProject(store: StoredType, payload: { projectId: string }): Result {
    const { projectId } = payload;
    //clean up tasks
    let tasks = store.projects.get(projectId)?.tasks;
    if (tasks)
      [...tasks].forEach((task) => {
        const newPayload = {
          taskId: task,
          projectId: projectId,
        };
        removeHandler.removeTask(store, newPayload);
      });

    //remove project
    store.projects.delete(projectId);
    return { type: "removedProject", id: projectId };
  },

  removeTask(
    store: StoredType,
    payload: { projectId: string; taskId: string },
  ): Result {
    const { taskId, projectId } = payload;
    //clean up items
    let items = store.tasks.get(taskId)?.items;

    if (items)
      [...items].forEach((item) => {
        removeHandler.removeItem(store, {
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
  },

  removeItem(
    store: StoredType,
    payload: { taskId: string; itemId: string },
  ): Result {
    const { taskId, itemId } = payload;
    store.items.delete(itemId);
    const task = store.tasks.get(taskId);

    if (!task) return { type: "notFound", entity: "task" };
    task.items.delete(itemId);

    return { type: "removedItem", id: itemId };
  },
};

export { removeHandler };
