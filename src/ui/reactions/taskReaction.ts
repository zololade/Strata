import { renderElement } from "../../lib/renderUtilities";
import { formatDuration, getTimeObj } from "../../lib/time";
import { viewProject } from "../views/component/detailPanel";
import { generateTaskContent } from "../views/component/selectedProj";
import type { StoredType } from "../../types/Types";

type TaskReactionDeps = {
  store: StoredType;
  getCurrProjId: () => string | null;
};

function createTaskReactions({ store, getCurrProjId }: TaskReactionDeps) {
  function refreshTask(afterRender?: () => void) {
    const projId = getCurrProjId();
    if (projId) {
      const viewPanel = document.querySelector(".mainContent__workspace") as HTMLElement;
      if (viewPanel) {
        if (afterRender) {
          renderElement(viewPanel, viewProject(projId, store), false, afterRender);
        } else {
          renderElement(viewPanel, viewProject(projId, store));
        }
      }
    }
  }

  function refreshCurrTask(id: string) {
    const currTask = store.tasks.get(id);
    const host = document.querySelector(`article[data-id="${id}"]`) as HTMLElement;

    if (currTask && host) {
      const lastUpdated = currTask.lastModified === 0 ? currTask.createdAt : currTask.lastModified;
      const duration = formatDuration(getTimeObj(lastUpdated));
      renderElement(host, generateTaskContent(currTask, duration));
    }
  }

  return { refreshTask, refreshCurrTask };
}

export { createTaskReactions };
