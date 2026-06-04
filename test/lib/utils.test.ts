import { describe, expect, it } from "vitest";
import { hasKeys } from "../../src/lib/utils";

describe("hasKeys", () => {
  let testObj = {
    name: "john",
    gender: "male",
    club: "arsenal",
  };
  it("returns true for valid object with all keys", () => {
    expect(hasKeys(testObj, ["name", "gender", "club"])).toBe(true);
  });

  it("returns false for missing keys", () => {
    expect(hasKeys(testObj, ["name", "club", "gender", "country"])).toBe(false);
  });

  it("returns false for null", () => {
    expect(hasKeys(null, ["name", "club"])).toBe(false);
  });

  it("returns false for non-object", () => {
    expect(hasKeys("john says hello!", ["name", "club"])).toBe(false);
  });
  it("returns false for empty object", () => {
    expect(hasKeys({}, ["name", "club"])).toBe(false);
  });
});
