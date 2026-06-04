import { app } from "../main";
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
  console.log("hello");
}
