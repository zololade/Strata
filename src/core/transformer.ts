// transformer layer that populate instances and connect them
import type { ProjectData, StoredType } from "../lib/Types";
import { Item } from "./Item";
import { Project } from "./Project";
import { Task } from "./Task";

function isProject(value: unknown): value is ProjectData[] {
  if (Array.isArray(value) && value.length > 0) {
    let id = "id" in value[0];
    let title = "title" in value[0];
    let overview = "overview" in value[0];
    let tasks = "tasks" in value[0];

    return id && title && overview && tasks;
  }
  return false;
}

function buildProjectGraph(
  data: ProjectData[],
  store?: StoredType<Project, Task, Item>,
) {
  const projects = new Map<string, Project>();
  const tasks = new Map<string, Task>();
  const items = new Map<string, Item>();

  for (const projectData of data) {
    const taskIds: string[] = [];

    for (const taskData of projectData.tasks) {
      const itemIds: string[] = [];

      for (const itemData of taskData.items) {
        itemIds.push(itemData.id);

        items.set(
          itemData.id,
          new Item({
            content: itemData.content,
            note: itemData.note,
            flag: itemData.flag,
            id: itemData.id,
          }),
        );
      }

      taskIds.push(taskData.id);

      tasks.set(
        taskData.id,
        new Task({
          title: taskData.title,
          overview: taskData.overview,
          flag: taskData.flag,
          items: itemIds,
          id: taskData.id,
        }),
      );
    }

    projects.set(
      projectData.id,
      new Project(
        {
          title: projectData.title,
          overview: projectData.overview,
          flag: projectData.flag,
          tasks: taskIds,
          id: projectData.id,
          createdAt: projectData.createdAt,
          lastModified: projectData.lastModified,
        },
        store,
      ),
    );
  }

  return { projects, tasks, items };
}

function transformer(
  incoming: unknown,
  store: {
    projects: Map<string, Project>;
    tasks: Map<string, Task>;
    items: Map<string, Item>;
  },
) {
  if (!isProject(incoming)) return;
  const graph = buildProjectGraph(incoming, store);

  store.projects.clear();
  store.tasks.clear();
  store.items.clear();

  graph.projects.forEach((v, k) => store.projects.set(k, v));
  graph.tasks.forEach((v, k) => store.tasks.set(k, v));
  graph.items.forEach((v, k) => store.items.set(k, v));
}

export { transformer };
