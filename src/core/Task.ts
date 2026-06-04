import type { TaskInput } from "../lib/Types";

class Task {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;

  constructor(param: TaskInput) {
    this.id = param.id;
    this.title = param.title;
    this.overview = param.overview;
    this.flag = param.flag;
    this.items = new Set(param.items);
  }
  /*
  Task

  edit — update title, overview
  addItem — add item id to items Set
  removeItem — remove item id

  */
}

export { Task };
