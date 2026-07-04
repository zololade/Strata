import type { ItemInstance, ProjectInstance, StoredType, TaskInstance } from "../types/Types";

/**
 * The public read-only interface for the UI.
 * The UI depends on this shape, not on the internal Maps.
 */
export interface StoreSelectors {
  projects: {
    getAll: () => ProjectInstance[];
    getById: (id: string) => ProjectInstance | undefined;
  };
  tasks: {
    getAll: () => TaskInstance[];
    getById: (id: string) => TaskInstance | undefined;
    getByProjectId: (projectId: string) => TaskInstance[];
  };
  items: {
    getByTaskId: (taskId: string) => ItemInstance[];
  };
}

/**
 * Builds the read-only selector API.
 * This is the ONLY place that touches store.projects, .tasks, .items.
 */
export function buildStoreSelectors(store: StoredType): StoreSelectors {
  return {
    projects: {
      getAll: () => [...store.projects.values()],
      getById: (id) => store.projects.get(id),
    },
    tasks: {
      getAll: () => [...store.tasks.values()],
      getById: (id) => store.tasks.get(id),
      getByProjectId: (projectId) =>
        [...store.tasks.values()].filter((task) => task.projectId === projectId),
    },
    items: {
      getByTaskId: (taskId) => [...store.items.values()].filter((item) => item.taskId === taskId),
    },
  };
}
