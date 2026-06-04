import type { ItemInput } from "../lib/Types";

class Item {
  id: string;
  content: string;
  note: string;
  flag: null | string[];

  constructor(param: ItemInput) {
    this.id = param.id;
    this.note = param.note ?? "";
    this.content = param.content;
    this.flag = param.flag;
  }

  /*
  Item

  edit — update content, note
  toggleFlag — done, important etc
  */
}

export { Item };
