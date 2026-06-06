import type { StoredType } from "../../../lib/Types";

const removeHandler = {
  //handlers
  removeProject(store: StoredType, payload: { projectId: string }) {
    const { projectId } = payload;
    //clean up tasks
    console.log("start");
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
  },

  removeTask(
    store: StoredType,
    payload: { projectId: string; taskId: string },
  ) {
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

    //remove task
    store.tasks.delete(taskId);
    const project = store.projects.get(projectId);
    if (!project) return;
    project.tasks.delete(taskId);
  },

  removeItem(store: StoredType, payload: { taskId: string; itemId: string }) {
    const { taskId, itemId } = payload;
    store.items.delete(itemId);
    const task = store.tasks.get(taskId);
    if (!task) return;

    task.items.delete(itemId);
  },
};

export { removeHandler };
