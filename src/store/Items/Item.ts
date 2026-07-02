import type { ItemInstance, NewItemInput } from "../../types/Types";

class Item {
  id: string;
  content: string;
  note: string;
  flag: null | string[];
  taskId: string;
  createdAt: number;
  lastModified: number;

  constructor(param: NewItemInput | ItemInstance) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.note = param.note ?? "";
    this.content = param.content;
    this.flag = param.flag;
    this.taskId = param.taskId;
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }
}

export { Item };
