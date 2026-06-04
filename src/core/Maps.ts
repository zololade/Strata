// project map shared state
import type { Item } from "./Item";
import type { Project } from "./Project";
import type { Task } from "./Task";

let ProjectMap = new Map<string, Project>();
let TaskMap = new Map<string, Task>();
let ItemMap = new Map<string, Item>();

export { ProjectMap, TaskMap, ItemMap };
