import type { Command, Result } from "../../types/command";
import { ModalManager } from "../../ui/views/component/Modal";

type CreateProjDeps = {
  dispatch: (command: Command) => Result;
  refreshList: () => (listHost: HTMLElement, cb: () => void) => void;
  selectProject: (id: string) => void;
};

function createHandleCreateProj({ dispatch, refreshList, selectProject }: CreateProjDeps) {
  return function handleCreateProj(_match: HTMLElement, e: Event) {
    e.preventDefault();
    const titleField = document.querySelector("#projTitle") as HTMLInputElement | null;
    const overviewField = document.querySelector("#projOverview") as HTMLInputElement | null;
    const listHost = document.querySelector(".mainNav__list") as HTMLUListElement | null;

    if (titleField && overviewField) {
      const command: Command = {
        type: "createProject",
        data: {
          title: titleField.value.trim().length < 1 ? "New project" : titleField.value,
          overview: overviewField.value,
          flag: null,
        },
      };
      const projData = dispatch(command);

      titleField.value = "";
      overviewField.value = "";
      ModalManager.close(".dialog");
      const afterRender = refreshList();

      if (projData?.type === "createdProject" && listHost)
        afterRender(listHost, () => selectProject(projData.id));
    }
  };
}

type CreateTaskDeps = {
  dispatch: (command: Command) => Result;
  refreshTask: (cb: () => void) => void;
  getCurrProjId: () => string | null;
};

function createHandleCreateTask({ dispatch, refreshTask, getCurrProjId }: CreateTaskDeps) {
  return function handleCreateTask(_match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (id) {
      const command: Command = {
        type: "createTask",
        data: { title: "", overview: "", flag: null, projectId: id },
      };
      const result = dispatch(command);

      refreshTask(() => {
        if (result?.type !== "createdTask") return;
        const selector = `h3[contenteditable="true"][data-task-id="${result.id}"]`;
        const heading3 = document.querySelector(selector) as HTMLElement | null;
        if (heading3) heading3.focus();
      });
    }
  };
}

export { createHandleCreateProj, createHandleCreateTask };
