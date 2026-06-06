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
    type: "removeProject",
    data: { projectId: "proj-1" },
  };

  // let command2: Command = {
  //   type: "update",
  // };
  // dispatch(command1);

  // let command1: Command = {
  //   type: "createProject",
  //   data: {
  //     title: "New project",
  //     overview: "This is created to test my system",
  //     flag: null,
  //     tasks: [],
  //   },
  // };

  console.log(dispatch(command1));
}
