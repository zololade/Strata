import { appBus } from "../../lib/Buses";
import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { detailPanelShell } from "./component/detailPanel";
import { newProject } from "./component/Modal";
import { generateList, projectLoader } from "./component/projectList";

let main = document.querySelector("#app") as HTMLElement;
let selectedProjectId: string | null = null;
let prevSelectedProjId: string | null = null;
let getCurrProjId = () => selectedProjectId;
let getPrevProjId = () => prevSelectedProjId;
let setPrevProjId = (id: string) => (prevSelectedProjId = id);

//initial render
function appShell() {
  renderElement(main, [
    { tag: "h1", class: "accessible", content: "Strata" },
    {
      tag: "div",
      class: "drawer-backdrop",
      id: "backdrop",
      ["data-action"]: "close-nav",
    },
    projectLoader(getStore()),
    [newProject(), detailPanelShell()],
  ]);
}

//select project to view
function selectProject(id: string) {
  selectedProjectId = id;
  appBus.publish("view:project", id);
  main.classList.add("project-selected");
}

//refresh list
function refreshList() {
  return (listHost: HTMLElement, afterRender: () => void) =>
    renderElement(listHost, generateList(getStore()), false, afterRender);
}

export {
  appShell,
  getCurrProjId,
  selectProject,
  getPrevProjId,
  setPrevProjId,
  refreshList,
};
