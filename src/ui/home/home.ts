import type { PageData } from "../../lib/Page";
import { renderElement } from "../../lib/renderUtilities";
import type { StoredType } from "../../lib/Types";
import { storedProjects } from "../../store/Store";
import { detailComponent, viewProject } from "./component/detail";
import { newProject } from "./component/newProject";
import { generateList, projectLoader } from "./component/projectList";

//initial render
function appShell(snapshot: StoredType): PageData {
  return [projectLoader(snapshot), [newProject(), detailComponent()]];
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
    renderElement(host, detailComponent());
    return;
  }
  renderElement(
    host,
    viewProject(selectedProjectId, storedProjects),
    false,
    afterRender,
  );
}

//update list
function refreshList(host: HTMLElement, afterRender?: () => void) {
  renderElement(host, generateList(storedProjects), false, afterRender);
}

export { appShell, render, selectProject, refreshList };
