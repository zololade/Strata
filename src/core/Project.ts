import { storeBus } from "../lib/Buses";
import type { ProjectInput } from "../lib/Types";

//Captial "I" > "Incoming"
class Project {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
  createdAt: number;
  lastModified: number;

  constructor(param: ProjectInput) {
    this.id = param.id ?? crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.tasks = new Set(param.tasks);
    this.createdAt = param.createdAt ?? Date.now();
    this.lastModified = param.lastModified ?? 0;
  }

  /*
  Project

  edit — update title, overview
  toggleFlag — add/remove a flag
  save — publish to databaseBus
  delete — remove from store, publish
  achieve — toggle achieved flag specifically
  addTask — add task id to tasks Set
  removeTask — remove task id from tasks Set
  */

  removeTask(id: string) {
    storeBus.publish("Project:removeTask", {
      projectId: this.id,
      taskId: id,
    });
  }
}

export { Project };
