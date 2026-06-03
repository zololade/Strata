type event = string;
type action<T> = (data?: T) => void;

class EventBus {
  private events = new Map<event, action<unknown>[]>();

  public subscribe(ev: event, act: action<unknown>) {
    let currEvent = this.events.get(ev);
    if (currEvent && this.events.has(ev)) {
      currEvent.push(act);
    } else {
      this.events.set(ev, [act]);
    }

    return () => {
      this.unsubscribe(ev, act);
    };
  }

  public publish(ev: event, data?: unknown) {
    let currEvent = this.events.get(ev);

    if (currEvent?.length) {
      currEvent.forEach((act) => {
        act(data);
      });
    } else {
      throw new Error("Event needs to be registered first");
    }
  }

  private unsubscribe(ev: event, act: action<unknown>) {
    let currEvent = this.events.get(ev);

    if (currEvent)
      this.events.set(
        ev,
        currEvent.filter((val) => act !== val),
      );
  }
}

const eventBus = new EventBus();

export { EventBus, eventBus };
