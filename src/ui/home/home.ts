import type { PageData } from "../../lib/Page";
import { renderElement } from "../../lib/renderUtilities";
import type { StoredType } from "../../lib/Types";
import { storedProjects } from "../../store/Store";
import { detailComponent, viewProject } from "./component/detail";
import { newProject } from "./component/newProject";
import { projectLoader } from "./component/projectList";

let selectedProjectId: string | null = null;

function selectProject(host: HTMLElement, id: string) {
  selectedProjectId = id;
  render(host);
}

function appShell(snapshot: StoredType): PageData {
  return [
    projectLoader(snapshot),
    {
      tag: "div",
      class: "rightSide",
      content: [newProject(), detailComponent()],
    },
  ];
}

function render(host: HTMLElement) {
  if (!selectedProjectId) {
    renderElement(host, detailComponent());
    return;
  }
  renderElement(host, viewProject(selectedProjectId, storedProjects));
}

export { appShell, render, selectProject };
