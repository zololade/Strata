// transformer layer that populate instances and connect them
import type { ProjectData, TaskData, ItemData } from "../lib/Types";
import { hasKeys } from "../lib/utils";
import { Item } from "./Item";
import { Project } from "./Project";
import { Task } from "./Task";

function buildProjectGraph(data: ProjectData[]) {
  const projects = new Map<string, Project>();
  const tasks = new Map<string, Task>();
  const items = new Map<string, Item>();

  for (const projectData of data) {
    const taskIds: string[] = [];
    if (projects.has(projectData.id)) {
      throw new Error(`Duplicate Project ID: ${projectData.id}`);
    }

    for (const taskData of projectData.tasks) {
      const itemIds: string[] = [];
      if (tasks.has(taskData.id)) {
        throw new Error(`Duplicate Task ID: ${taskData.id}`);
      }

      for (const itemData of taskData.items) {
        if (items.has(itemData.id)) {
          throw new Error(`Duplicate Item ID: ${itemData.id}`);
        }
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
      new Project({
        title: projectData.title,
        overview: projectData.overview,
        flag: projectData.flag,
        tasks: taskIds,
        id: projectData.id,
        createdAt: projectData.createdAt,
        lastModified: projectData.lastModified,
      }),
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
  if (!isProjectArray(incoming)) {
    throw new Error("Invalid project data");
  }
  const graph = buildProjectGraph(incoming);

  store.projects.clear();
  store.tasks.clear();
  store.items.clear();

  graph.projects.forEach((v, k) => store.projects.set(k, v));
  graph.tasks.forEach((v, k) => store.tasks.set(k, v));
  graph.items.forEach((v, k) => store.items.set(k, v));
}

//helper
function isItemData(value: unknown): value is ItemData {
  return (
    hasKeys(value, ["id", "content", "flag"]) &&
    typeof value.id === "string" &&
    typeof value.content === "string"
  );
}
function isTaskData(value: unknown): value is TaskData {
  return (
    hasKeys(value, ["id", "title", "overview", "flag", "items"]) &&
    Array.isArray(value.items) &&
    value.items.every(isItemData)
  );
}

function isProjectData(value: unknown): value is ProjectData {
  return (
    hasKeys(value, [
      "id",
      "title",
      "overview",
      "flag",
      "tasks",
      "createdAt",
      "lastModified",
    ]) &&
    Array.isArray(value.tasks) &&
    value.tasks.every(isTaskData)
  );
}

function isProjectArray(value: unknown): value is ProjectData[] {
  return Array.isArray(value) && value.every(isProjectData);
}

export { transformer, buildProjectGraph };
