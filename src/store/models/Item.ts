import type { ItemInput } from "../../lib/Types";

class Item {
  id: string;
  content: string;
  note: string;
  flag: null | string[];

  constructor(param: ItemInput) {
    this.id = param.id ?? crypto.randomUUID();
    this.note = param.note ?? "";
    this.content = param.content;
    this.flag = param.flag;
  }
}

export { Item };
