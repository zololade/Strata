import { beforeAll, describe, expect, it } from "vitest";

import type { StoredType, DBCollection as Outgoing } from "../../src/types/Types";
import { TestData } from "./TestData";

describe("buildProjectGraph", () => {
  let result: Outgoing;
  beforeAll(() => {
    const data = TestData;
    const store: StoredType = rehydrateFactory(data);
    const reader = new StoreReader(store);
    result = {
      projects: reader.hydrateProject(),
      tasks: reader.hydrateTask(),
      items: reader.hydrateItem(),
    };
  });

  it("produces result that match TestData", () => {
    expect(result).toEqual(TestData);
  });

  it("task and item counts match original data", () => {
    expect(result.projects.length).toBe(TestData.projects.length);
    expect(result.tasks.length).toBe(TestData.tasks.length);
    expect(result.items.length).toBe(TestData.items.length);
  });
});
