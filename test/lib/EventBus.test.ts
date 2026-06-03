import { beforeEach, describe, expect, it } from "vitest";
import { EventBus } from "../../src/lib/EventBus";

describe("EventBus", () => {
  let testEvent: EventBus;
  let unsubscribe: () => void;
  let message: string | null = null;

  beforeEach(() => {
    message = null;
    testEvent = new EventBus();
    unsubscribe = testEvent.subscribe("shout hello", (data) => {
      if (typeof data === "string") message = data;
    });
  });

  it("subscriber receives published data", () => {
    testEvent.publish("shout hello", "hello");
    expect(message).toBe("hello");
  });

  it("unsubscribe event should throw error", () => {
    unsubscribe();
    expect(() => {
      testEvent.publish("shout hello", "hello");
    }).toThrow("Event needs to be registered first");
  });

  it("multiple subscriber receives published data", () => {
    let secondMsg: null | string = null;

    testEvent.subscribe("shout hello", (data) => {
      if (typeof data === "string") secondMsg = data;
    });
    testEvent.publish("shout hello", "hello");
    expect(message).toBe("hello");
    expect(secondMsg).toBe("hello");
  });
});
