import { isStoredType } from "../data/dao";
import { renderElement } from "../lib/renderUtilities";
import { initialLoad } from "./home/home";

let main = document.querySelector("#app") as HTMLElement;

//initial render
function initialRender(data: unknown) {
  if (!isStoredType(data)) return;
  renderElement(main, initialLoad(data));
}
export { main, initialRender };
