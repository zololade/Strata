import { beforeAll, describe, expect, it } from "vitest";
import { Project } from "../../src/core/Project";
import type { ProjectData, StoredType } from "../../src/lib/Types";
import { Task } from "../../src/core/Task";
import { Item } from "../../src/core/Item";
import { buildProjectGraph } from "../../src/core/transformer";
import { TestData } from "../database/TestData";
import { StoreReader } from "../../src/core/serializer";

describe("buildProjectGraph", () => {
  let result: ProjectData[] | null = null;
  beforeAll(() => {
    let data = TestData;
    let store: StoredType<Project, Task, Item> = buildProjectGraph(data);
    let reader = new StoreReader(store);
    result = reader.serializer();
  });

  it("produces correct nested ProjectData[] from populated store", () => {
    if (result) {
      expect(result).toMatchObject(TestData);
    }
  });

  it("task and item counts match original data", () => {
    if (result) {
      expect(result[0]?.tasks.length).toBe(TestData[0]?.tasks.length);
      expect(result[0]?.tasks[0]?.items.length).toBe(
        TestData[0]?.tasks[0]?.items.length,
      );
    }
  });
});
