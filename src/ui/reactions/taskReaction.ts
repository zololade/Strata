import { renderElementAsync } from "../../lib/Page";
import { formatDuration, getTimeObj } from "../../lib/time";
import type { StoreSelectors } from "../../store";
import { viewProject } from "../views/component/detailPanel";
import { generateTaskStatus } from "../views/component/selectedProj";

type TaskReactionDeps = {
  selectors: StoreSelectors;
  getCurrProjId: () => string | null;
};

function createTaskReactions({ selectors, getCurrProjId }: TaskReactionDeps) {
  async function refreshTask(afterRender?: () => void) {
    const projId = getCurrProjId();
    if (projId) {
      const viewPanel = document.querySelector(".mainContent__workspace") as HTMLElement;
      let project = selectors.projects.getById(projId);
      let tasks = selectors.tasks.getByProjectId(projId);

      if (viewPanel && project && tasks) {
        await renderElementAsync(viewPanel, viewProject({ project, tasks }));
        if (afterRender) afterRender();
      }
    }
  }

  async function refreshCurrTask(id: string) {
    const currTask = selectors.tasks.getById(id);
    const host = document.querySelector(
      `article[data-id="${id}"] .task__header .task__left`,
    ) as HTMLElement;

    if (currTask && host) {
      const lastUpdated = currTask.lastModified === 0 ? currTask.createdAt : currTask.lastModified;
      const duration = formatDuration(getTimeObj(lastUpdated));
      await renderElementAsync(host, generateTaskStatus(duration));
    }
  }

  return { refreshTask, refreshCurrTask };
}

export { createTaskReactions };
