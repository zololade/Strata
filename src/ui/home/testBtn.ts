import type { PageData } from "../../lib/Page";
import { renderElement } from "../../lib/renderUtilities";

let app = document.querySelector("#app");

function buttonComponent(): PageData {
  return {
    tag: "button",
    id: "string",
    content: "click for action",
  };
}

renderElement(app as HTMLElement, buttonComponent());

export { app };
