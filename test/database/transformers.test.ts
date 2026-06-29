import { beforeAll, describe, expect, it } from "vitest";

import { rehydrateFactory } from "../../src/storage/transformers/rehydrate";
import { Item } from "../../src/store/Items";
import { Project } from "../../src/store/Projects";
import { Task } from "../../src/store/Tasks";
import type { StoredType } from "../../src/types/Types";
import { duplicateItemData, missingItemRefData, missingTaskRefData, TestData } from "./TestData";

describe("rehydrateFactory", () => {
  describe("good data", () => {
    let store: StoredType;
    beforeAll(() => {
      const data = TestData;
      store = rehydrateFactory(data);
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

    it("project contains expected task ids", () => {
      if (!store) return;
      const project = store.projects.get("proj-1");

      expect(project?.tasks.has("task-1")).toBe(true);
    });

    it("task contains expected item ids", () => {
      if (!store) return;
      const task = store.tasks.get("task-1");

      expect(task?.items.has("item-1")).toBe(true);
      expect(task?.items.has("item-2")).toBe(true);
    });

    it("creates Project instances", () => {
      if (!store) return;
      expect(store.projects.get("proj-1")).toBeInstanceOf(Project);
    });

    it("creates Task instances", () => {
      if (!store) return;
      expect(store.tasks.get("task-1")).toBeInstanceOf(Task);
    });

    it("creates Item instances", () => {
      if (!store) return;
      expect(store.items.get("item-1")).toBeInstanceOf(Item);
    });
  });

  describe("bad data", () => {
    it("throws on duplicate item ids", () => {
      expect(() => rehydrateFactory(duplicateItemData)).toThrow("Duplicate Id");
    });
    it("throws on missing task reference", () => {
      expect(() => rehydrateFactory(missingTaskRefData)).toThrow("Missing Tasks reference");
    });
    it("throws on missing item reference", () => {
      expect(() => rehydrateFactory(missingItemRefData)).toThrow("Missing Items reference");
    });
  });
});
