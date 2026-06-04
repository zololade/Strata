import { beforeAll, describe, expect, it } from "vitest";
import { Project } from "../../src/core/Project";
import type { StoredType, Snapshot as Outgoing } from "../../src/lib/Types";
import { Task } from "../../src/core/Task";
import { Item } from "../../src/core/Item";
import { rehydrateFactory } from "../../src/core/transformer";
import { TestData } from "../database/TestData";
import { StoreReader } from "../../src/core/serializer";

describe("buildProjectGraph", () => {
  let result: Outgoing | null = null;
  beforeAll(() => {
    let data = TestData;
    let store: StoredType<Project, Task, Item> = rehydrateFactory(data);
    let reader = new StoreReader(store);
    result = {
      projects: reader.hydrateProject(),
      tasks: reader.hydrateTask(),
      items: reader.hydrateItem(),
    };
  });

  it("produces result that match TestData", () => {
    if (result) {
      expect(result).toMatchObject(TestData);
    }
  });

  it("task and item counts match original data", () => {
    if (result) {
      expect(result.projects.length).toBe(TestData.projects.length);
      expect(result.tasks.length).toBe(TestData.tasks.length);
      expect(result.items.length).toBe(TestData.items.length);
    }
  });
});
