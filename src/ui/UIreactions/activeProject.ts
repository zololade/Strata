import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { viewProject } from "../views/component/detailPanel";
import { getPrevProjId, setPrevProjId } from "../views/home";

function showActiveProject(data: unknown) {
  const viewPanel = document.querySelector(
    ".mainContent__workspace",
  ) as HTMLElement | null;
  const projectHeaderTitle = document.querySelector(
    "#projDetailTitle",
  ) as HTMLElement | null;

  if (viewPanel && projectHeaderTitle && typeof data === "string") {
    const project = getStore().projects.get(data);
    projectHeaderTitle.textContent = project ? project.title : "";

    renderElement(viewPanel, viewProject(data, getStore()));

    updateList(data);
  }
}

function updateList(id: string) {
  const listContainer = document.querySelector(
    ".mainNav__list",
  ) as HTMLDialogElement | null;

  if (listContainer) {
    const prev = listContainer.querySelector(`[data-id="${getPrevProjId()}"]`);
    const active = listContainer.querySelector(`[data-id="${id}"]`);
    if (prev) prev.classList.remove("active");
    if (active) active.classList.add("active");
    setPrevProjId(id);
  }
}
export { showActiveProject };
