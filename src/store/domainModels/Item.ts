import { databaseBus } from "../../bootstrap/initializers/eventInit";
import type { Result } from "../../types/command";
import type {
  ItemInput,
  ItemUpdate,
  NewItemInput,
  StoredType,
} from "../../types/Types";

class Item {
  id: string;
  content: string;
  note: string;
  flag: null | string[];
  createdAt: number;
  lastModified: number;

  constructor(param: NewItemInput | ItemInput) {
    this.id = "id" in param ? param.id : crypto.randomUUID();
    this.note = param.note ?? "";
    this.content = param.content;
    this.flag = param.flag;
    this.createdAt = "createdAt" in param ? param.createdAt : Date.now();
    this.lastModified = "lastModified" in param ? param.lastModified : 0;
  }

  static createItem(store: StoredType, taskId: string, payload: NewItemInput) {
    const item = new Item(payload);
    const task = store.tasks.get(taskId);

    if (!task) return;
    task.items.add(item.id);
    store.items.set(item.id, item);
    databaseBus.publish("database:update", store);
    return { type: "createdItem", id: item.id };
  }

  static removeItem(
    store: StoredType,
    payload: { taskId: string; itemId: string },
  ): Result {
    const { taskId, itemId } = payload;
    store.items.delete(itemId);
    const task = store.tasks.get(taskId);

    if (!task) return { type: "notFound", entity: "task" };
    task.items.delete(itemId);

    return { type: "removedItem", id: itemId };
  }

  static updateItem(
    store: StoredType,
    itemId: string,
    payload: ItemUpdate,
  ): Result {
    //get the item then edit
    const item = store.items.get(itemId);
    if (!item) return { type: "notFound", entity: "item" };

    if (payload.content !== undefined) {
      item.content = payload.content;
    }

    if (payload.note !== undefined) {
      item.note = payload.note;
    }

    if (payload.flag !== undefined) {
      item.flag = payload.flag;
    }

    item.lastModified = Date.now();
    databaseBus.publish("database:update", store);
    return { type: "updatedItem", id: itemId };
  }
}

export { Item };
