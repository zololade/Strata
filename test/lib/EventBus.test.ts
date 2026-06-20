import { beforeEach, describe, expect, it } from "vitest";
import { EventBus } from "../../src/lib/EventBus";

describe("EventBus", () => {
  let testEvent: EventBus;
  let message: string | null = null;
  const action: (data: unknown) => void = (data) => {
    if (typeof data === "string") message = data;
  };

  beforeEach(() => {
    message = null;
    testEvent = new EventBus();
    testEvent.subscribe("shout hello", action);
  });

  it("subscriber receives published data", () => {
    testEvent.publish("shout hello", "hello");
    expect(message).toBe("hello");
  });

  it("unsubscribe event should throw error", () => {
    testEvent.unsubscribe("shout hello", action);
    expect(() => {
      testEvent.publish("shout hello", "hello");
    }).toThrow("shout hello needs to be registered first");
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
