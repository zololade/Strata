import type { Command, Result } from "../../types/command";
import { ModalManager } from "../../ui/views/component/Modal";

type CreateProjDeps = {
  dispatch: (command: Command) => Result;
};

function createHandleCreateProj({ dispatch }: CreateProjDeps) {
  return function handleCreateProj(_match: HTMLElement, e: Event) {
    e.preventDefault();
    const titleField = document.querySelector("#projTitle") as HTMLInputElement | null;
    const overviewField = document.querySelector("#projOverview") as HTMLInputElement | null;

    if (titleField && overviewField) {
      const command: Command = {
        type: "createProject",
        data: {
          title: titleField.value.trim().length < 1 ? "New project" : titleField.value,
          overview: overviewField.value,
          flag: null,
        },
      };
      dispatch(command);

      titleField.value = "";
      overviewField.value = "";
      ModalManager.close(".dialog");
    }
  };
}

type CreateTaskDeps = {
  dispatch: (command: Command) => Result;
  getCurrProjId: () => string | null;
};

function createHandleCreateTask({ dispatch, getCurrProjId }: CreateTaskDeps) {
  return function handleCreateTask(_match: HTMLElement, _e: Event) {
    const id = getCurrProjId();
    if (id) {
      const command: Command = {
        type: "createTask",
        data: { title: "", overview: "", flag: null, projectId: id },
      };
      dispatch(command);
    }
  };
}

export { createHandleCreateProj, createHandleCreateTask };
