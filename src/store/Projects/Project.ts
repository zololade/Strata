import type { NewProjectInput, ProjectInstance } from "../../types/Types";

class Project {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  createdAt: number;
  lastModified: number;

  constructor(param: NewProjectInput | ProjectInstance) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }
}

export { Project };
