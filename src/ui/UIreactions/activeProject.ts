import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { viewProject } from "../views/component/detailPanel";
import { getPrevProjId, setPrevProjId } from "../views/home";

function showActiveProject(data: unknown) {
  let viewPanel = document.querySelector(".projectsView") as HTMLElement | null;
  if (viewPanel && typeof data === "string") {
    renderElement(
      viewPanel,
      viewProject(data, getStore()),
      // false, () =>
      // updateList(data),
    );

    updateList(data);
  }
}

function updateList(id: string) {
  const listContainer = document.querySelector(
    ".projectsList",
  ) as HTMLDialogElement | null;

  if (listContainer) {
    let prev = listContainer.querySelector(`[data-id="${getPrevProjId()}"]`);
    let active = listContainer.querySelector(`[data-id="${id}"]`);
    if (prev) prev.classList.remove("active");
    if (active) active.classList.add("active");
    setPrevProjId(id);
  }
}
export { showActiveProject };
