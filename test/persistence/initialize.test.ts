import { beforeAll, describe, expect, it } from "vitest";

import { rehydrateFactory } from "../../src/persistence/lib/rehydrate";
import type {
  ItemInstance,
  ProjectInstance,
  StoredType,
  TaskInstance,
} from "../../src/types/Types";
import { TestData } from "./TestData";

describe("rehydrateFactory", () => {
  describe("good data", () => {
    class ProjectStore implements StoredType {
      projects = new Map<string, ProjectInstance>();
      tasks = new Map<string, TaskInstance>();
      items = new Map<string, ItemInstance>();
    }
    let store: StoredType;
    beforeAll(() => {
      const data = TestData;
      store = new ProjectStore();
      rehydrateFactory(data, store);
    });
    it("creates correct number of project instances", () => {
      expect(store.projects.size).toBe(1);
    });

    it("project tasks Set contains correct task ids", () => {
      expect(store.tasks.size).toBe(1);
    });

    it("task items Set contains correct item ids", () => {
      expect(store.items.size).toBe(2);
    });

    it("instances are stored in correct maps", () => {
      expect(store.projects.has("proj-1")).toBe(true);
      expect(store.tasks.has("task-1")).toBe(true);
      expect(store.items.has("item-1")).toBe(true);
    });

    it("tasks points to expected project", () => {
      if (!store) return;
      const task = store.tasks.get("task-1");

      expect(task?.projectId).toBe("proj-1");
    });

    it("item points to expected task", () => {
      if (!store) return;
      const item = store.items.get("item-1");

      expect(item?.taskId).toBe("task-1");
    });
  });
});
