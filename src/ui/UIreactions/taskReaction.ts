import { renderElement } from "../../lib/renderUtilities";
import { getStore } from "../../store/Store";
import { viewProject } from "../views/component/detailPanel";
import { getCurrProjId } from "../views/home";

function refreshTask() {
  const projId = getCurrProjId();
  if (projId) {
    const viewPanel = document.querySelector(
      ".mainContent__workspace",
    ) as HTMLElement;
    if (viewPanel) {
      const store = getStore(); // you'll need to import getStore
      renderElement(viewPanel, viewProject(projId, store));
    }
  }
}

export { refreshTask };
