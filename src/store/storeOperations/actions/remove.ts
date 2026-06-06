import type { Command } from "../../../lib/command";
import type { StoredType } from "../../../lib/Types";

// handler
function remove(
  store: StoredType,
  payload: Extract<Command, { action: "remove" }>,
) {
  switch (payload.type) {
    case "removeProject": {
      removeProject(store, payload.projectId);
      break;
    }
    case "removeTask": {
      removeTask(store, payload.taskId, payload.projectId);
      break;
    }
    case "removeItem": {
      removeItem(store, payload.itemId, payload.taskId);
      break;
    }
  }
}

//helpers
function removeProject(store: StoredType, projectId: string) {
  //clean up tasks
  console.log("start");
  let tasks = store.projects.get(projectId)?.tasks;
  if (tasks)
    [...tasks].forEach((task) => {
      removeTask(store, task, projectId);
    });

  //remove project
  store.projects.delete(projectId);
}

function removeTask(store: StoredType, taskId: string, projectId: string) {
  //clean up items
  let items = store.tasks.get(taskId)?.items;
  if (items)
    [...items].forEach((item) => {
      removeItem(store, item, taskId);
    });

  //remove task
  store.tasks.delete(taskId);
  const project = store.projects.get(projectId);
  if (!project) return;
  project.tasks.delete(taskId);
}

function removeItem(store: StoredType, itemId: string, taskId: string) {
  store.items.delete(itemId);
  const task = store.tasks.get(taskId);
  if (!task) return;
  task.items.delete(itemId);
}

export { remove };
