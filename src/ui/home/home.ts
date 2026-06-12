import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { viewProject } from "./component/detailPanel";
import { newProject } from "./component/newProject";
import { generateList, projectLoader } from "./component/projectList";

let main = document.querySelector("#app") as HTMLElement;
let selectedProjectId: string | null = null;

//initial render
function appShell() {
  renderElement(main, [
    projectLoader(getStore()),
    [newProject(), viewProject(true, null, null)],
  ]);
}

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
    viewProject(false, selectedProjectId, getStore()),
    false,
    afterRender,
  );
}

//update list
function refreshList(host: HTMLElement, afterRender?: () => void) {
  renderElement(host, generateList(getStore()), false, afterRender);
}

export { appShell, render, selectProject, refreshList };
