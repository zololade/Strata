import { main } from "../index";
import { handleProjectView } from "./handlers/viewProject";
type SelectHnd = {
  selector: string;
  handler: (match: HTMLElement, e: Event) => void;
};

let eventsMap = new Map<string, SelectHnd[]>([
  [
    "click",
    [{ selector: ".projectsList button[data-id]", handler: handleProjectView }],
  ],
]);

let events = new Set(eventsMap.keys());

events.forEach((val) => {
  if (!main) return;

  let event = eventsMap.get(val);
  if (event) {
    main.addEventListener(val, (e) => {
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
