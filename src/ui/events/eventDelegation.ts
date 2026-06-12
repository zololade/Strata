import { handleNewProj } from "./handlers/addNewProj";
import {
  handleCancelProj,
  handleNewProjBtn,
  hideModalHandler,
} from "./handlers/addProjHnd";

import { handleProjectView } from "./handlers/viewProject";

let main = document.querySelector("#app") as HTMLElement;
type SelectHnd = {
  selector: string;
  handler: (match: HTMLElement, e: Event) => void;
};

function initializeEvents() {
  let eventsMap = new Map<string, SelectHnd[]>([
    [
      "click",
      [
        {
          selector: ".projectsList button[data-id]",
          handler: handleProjectView,
        },
        { selector: "#newProjBtn", handler: handleNewProj },
        { selector: "#openNewProjBtn", handler: handleNewProjBtn },
        { selector: "#cancelProjBtn", handler: handleCancelProj },
        { selector: ".new-proj-dialog", handler: hideModalHandler },
      ],
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
}

export { initializeEvents };
