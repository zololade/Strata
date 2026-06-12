// import type { PageData } from "../../lib/Page";
import { renderElement } from "../../lib/renderUtilities";
// import type { StoredType } from "../../lib/Types";
import { getStore } from "../../store/Store";
import { viewProject } from "./component/detail";
import { newProject } from "./component/newProject";
import { generateList, projectLoader } from "./component/projectList";

let main = document.querySelector("#app") as HTMLElement;

//initial render
function appShell() {
  renderElement(main, [projectLoader(getStore()), [newProject()]]);
}

//subsequent render
let selectedProjectId: string | null = null;

//select project to view
function selectProject(
  host: HTMLElement,
  id: string,
  afterRender?: () => void,
) {
  selectedProjectId = id;
  render(host, afterRender);
}

function render(host: HTMLElement, afterRender?: () => void) {
  if (!selectedProjectId) {
    // renderElement(host);
    return;
  }
  renderElement(
    host,
    viewProject(selectedProjectId, getStore()),
    false,
    afterRender,
  );
}

//update list
function refreshList(host: HTMLElement, afterRender?: () => void) {
  renderElement(host, generateList(getStore()), false, afterRender);
}

export { appShell, render, selectProject, refreshList };
