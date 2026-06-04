import type { Item } from "../core/Item";
import type { Project } from "../core/Project";
import { serializer } from "../core/serializer";
import type { Task } from "../core/Task";
import { databaseBus } from "../lib/Buses";
import type { ProjectData, StoredType } from "../lib/Types";

const storedData =
  typeof localStorage !== "undefined" && localStorage.getItem("todoData");

let workingProjectData = !storedData ? [] : [...JSON.parse(storedData)];

function getProjects(): ProjectData[] {
  return workingProjectData;
}

function putProjects(incoming: unknown) {
  if (isStoredType(incoming)) {
    if (typeof localStorage !== "undefined") {
      let data = serializer(incoming);
      workingProjectData = data;
      localStorage.setItem("todoData", JSON.stringify(data));
    }
  }
}

databaseBus.subscribe("database:save", putProjects);

//helper
function isStoredType(
  value: unknown,
): value is StoredType<Project, Task, Item> {
  if (typeof value === "object" && value) {
    let projects = "projects" in value;
    let tasks = "tasks" in value;
    let items = "items" in value;

    return projects && items && tasks;
  }
  return false;
}

export { putProjects, getProjects };
