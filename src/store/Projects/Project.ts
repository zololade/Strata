import type { NewProjectInput, ProjectInput } from "../../types/Types";

class Project {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
  createdAt: number;
  lastModified: number;

  constructor(param: NewProjectInput | ProjectInput) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.tasks = new Set(param.tasks);
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }
}

export { Project };
