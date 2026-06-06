import type { Command } from "../../lib/command";
import { dispatch } from "../../store/storeOperations/dispatch";
import { app } from "../../ui/home/testBtn";
type SelectHnd = {
  selector: string;
  handler: (match: HTMLElement, e: Event) => void;
};

let eventsMap = new Map<string, SelectHnd[]>([
  ["click", [{ selector: "#string", handler: dummyEvent }]],
]);

let events = new Set(eventsMap.keys());

events.forEach((val) => {
  if (!app) return;

  let event = eventsMap.get(val);
  if (event) {
    app.addEventListener(val, (e) => {
      let target = e.target as HTMLElement;
      for (const { selector, handler } of event) {
        if (target) {
          let match = target.closest(selector) as HTMLElement;
          if (match) {
            handler(match, e);
            break;
          }
        }
      }
    });
  }
});

function dummyEvent() {
  let command1: Command = {
    action: "remove",
    type: "removeProject",
    projectId: "proj-1",
  };

  let command2: Command = {
    action: "update",
  };
  dispatch(command1);
  dispatch(command2);
}
