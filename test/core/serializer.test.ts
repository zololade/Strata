import { beforeAll, describe, expect, it } from "vitest";
import type { StoredType, Snapshot as Outgoing } from "../../src/lib/Types";
import { rehydrateFactory } from "../../src/core/snapshot/transformer";
import { TestData } from "../database/TestData";
import { StoreReader } from "../../src/core/snapshot/serializer";

describe("buildProjectGraph", () => {
  let result: Outgoing | null = null;
  beforeAll(() => {
    let data = TestData;
    let store: StoredType = rehydrateFactory(data);
    let reader = new StoreReader(store);
    result = {
      projects: reader.hydrateProject(),
      tasks: reader.hydrateTask(),
      items: reader.hydrateItem(),
    };
  });

  it("produces result that match TestData", () => {
    if (result) {
      expect(result).toEqual(TestData);
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
