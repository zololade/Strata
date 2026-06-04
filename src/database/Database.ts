import { StoreReader } from "../core/serializer";
import { databaseBus } from "../lib/Buses";
import type { StoredType, Snapshot as Outgoing } from "../lib/Types";
import { hasKeys } from "../lib/utils";

const storedData =
  typeof localStorage !== "undefined" && localStorage.getItem("todoData");

let workingProjectData: Outgoing | null = storedData
  ? JSON.parse(storedData)
  : null;

function getStoredData(): Outgoing | null {
  return workingProjectData;
}

function putProjects(incoming: unknown) {
  if (!isStoredType(incoming)) return;
  if (typeof localStorage === "undefined") return;

  let reader = new StoreReader(incoming);

  const data: Outgoing = {
    projects: reader.hydrateProject(),
    tasks: reader.hydrateTask(),
    items: reader.hydrateItem(),
  };

  workingProjectData = data;
  localStorage.setItem("todoData", JSON.stringify(data));
}

databaseBus.subscribe("database:save", putProjects);

//helper
function isStoredType(value: unknown): value is StoredType {
  return hasKeys(value, ["projects", "tasks", "items"]);
}

export { putProjects, getStoredData };
