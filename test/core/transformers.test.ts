import { beforeAll, describe, expect, it } from "vitest";
import { Project } from "../../src/core/Project";
import type { StoredType } from "../../src/lib/Types";
import { Task } from "../../src/core/Task";
import { Item } from "../../src/core/Item";
import { rehydrateFactory } from "../../src/core/transformer";
import { badData, TestData } from "../database/TestData";

describe("rehydrateFactory", () => {
  describe("good data", () => {
    let store: StoredType | null = null;
    beforeAll(() => {
      let data = TestData;
      store = rehydrateFactory(data);
    });
    it("creates correct number of project instances", () => {
      if (store) {
        expect(store.projects.size).toBe(1);
      }
    });

    it("project tasks Set contains correct task ids", () => {
      if (store) {
        expect(store.tasks.size).toBe(1);
      }
    });

    it("task items Set contains correct item ids", () => {
      if (store) {
        expect(store.items.size).toBe(2);
      }
    });

    it("instances are stored in correct maps", () => {
      if (store) {
        expect(store.projects.has("proj-1")).toBe(true);
        expect(store.tasks.has("task-1")).toBe(true);
        expect(store.items.has("item-1")).toBe(true);
      }
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
      expect(() => rehydrateFactory(badData)).toThrow();
    });
    it("throws on missing task reference", () => {
      expect(() => rehydrateFactory(badData)).toThrow();
    });
    it("throws on missing item reference", () => {
      expect(() => rehydrateFactory(badData)).toThrow();
    });
  });
});
