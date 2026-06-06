import type { NewTaskInput, TaskInput } from "../../lib/Types";

class Task {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;
  createdAt: number;
  lastModified: number;

  constructor(param: NewTaskInput | TaskInput) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.items = new Set(param.items);
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }
}

export { Task };
