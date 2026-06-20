import { renderElement } from "../../lib/renderUtilities";
import { formatDuration, getTimeObj } from "../../lib/time";
import { getStore } from "../../store/Store";
import { viewProject } from "../views/component/detailPanel";
import { generateTaskContent } from "../views/component/selectedProj";
import { getCurrProjId } from "../views/home";

function refreshTask(afterRender?: () => void) {
  const projId = getCurrProjId();
  if (projId) {
    const viewPanel = document.querySelector(
      ".mainContent__workspace",
    ) as HTMLElement;
    if (viewPanel) {
      const store = getStore(); // you'll need to import getStore
      if (afterRender) {
        renderElement(
          viewPanel,
          viewProject(projId, store),
          false,
          afterRender,
        );
      } else {
        renderElement(viewPanel, viewProject(projId, store));
      }
    }
  }
}

function refreshCurrTask(Id: string) {
  const currTask = getStore().tasks.get(Id);
  const host = document.querySelector(
    `article[data-id="${Id}"]`,
  ) as HTMLElement;

  if (currTask && host) {
    const lastUpdated =
      currTask.lastModified === 0 ? currTask.createdAt : currTask.lastModified;

    const duration = formatDuration(getTimeObj(lastUpdated));

    renderElement(host, generateTaskContent(currTask, duration));
  }
}

export { refreshTask, refreshCurrTask };
