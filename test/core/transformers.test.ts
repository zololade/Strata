import { beforeAll, describe, expect, it } from "vitest";
import { Project } from "../../src/core/Project";
import type { StoredType } from "../../src/lib/Types";
import { Task } from "../../src/core/Task";
import { Item } from "../../src/core/Item";
import { buildProjectGraph } from "../../src/core/transformer";
import { TestData } from "../database/TestData";

describe("buildProjectGraph", () => {
  let store: StoredType<Project, Task, Item> | null = null;
  beforeAll(() => {
    let data = TestData;
    store = buildProjectGraph(data);
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
});
