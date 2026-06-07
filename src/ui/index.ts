import { isStoredType } from "../data/dao";
import { renderElement } from "../lib/renderUtilities";
import { appShell } from "./home/home";

let main = document.querySelector("#app") as HTMLElement;

//initial render
function initialRender(data: unknown) {
  if (!isStoredType(data)) return;
  renderElement(main, appShell(data));
}
export { main, initialRender };
