import { appBus } from "../../lib/Buses";
import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { viewProject } from "./component/detailPanel";
import { newProject } from "./component/Modal";
import { projectLoader } from "./component/projectList";

let main = document.querySelector("#app") as HTMLElement;
let selectedProjectId: string | null = null;
let prevSelectedProjId: string | null = null;
let getCurrProjId = () => selectedProjectId;
let getPrevProjId = () => prevSelectedProjId;
let setPrevProjId = (id: string) => (prevSelectedProjId = id);

//initial render
function appShell() {
  renderElement(main, [
    projectLoader(getStore()),
    [newProject(), viewProject(true, null, null)],
  ]);
}

//select project to view
function selectProject(id: string) {
  selectedProjectId = id;
  appBus.publish("view:project", id);
}

export { appShell, getCurrProjId, selectProject, getPrevProjId, setPrevProjId };
