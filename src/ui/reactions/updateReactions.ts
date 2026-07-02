import { ModalManager } from "../views/component/Modal";

type taskReactions = {
  refreshTask: (afterRender?: (() => void) | undefined) => void;
  refreshCurrTask: (id: string) => void;
};

function createUpdateReaction(
  refreshList: () => (listHost: HTMLElement, afterRender: () => void) => void,
  selectProject: (id: string) => void,
  refreshTask: taskReactions["refreshTask"],
  refreshCurrTask: taskReactions["refreshCurrTask"],
) {
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function handleProjectCreated(data: unknown) {
    const id = data as string | null;
    const listHost = document.querySelector(".mainNav__list") as HTMLUListElement | null;
    const titleField = document.querySelector("#projTitle") as HTMLInputElement | null;
    const overviewField = document.querySelector("#projOverview") as HTMLInputElement | null;
    if (titleField && overviewField) {
      titleField.value = "";
      overviewField.value = "";
      ModalManager.close(".dialog");
      const afterRender = refreshList();
      if (listHost && id) afterRender(listHost, () => selectProject(id));
    }
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function handleTaskCreated(data: unknown) {
    const id = data as string | null;
    if (id !== null) {
      refreshTask(() => {
        const selector = `h3[contenteditable="true"][data-task-id="${id}"]`;
        const heading3 = document.querySelector(selector) as HTMLElement | null;
        if (heading3) heading3.focus();
      });
    }
  }

  function handleTaskUpdated(data: unknown) {
    let id = data as string | null;
    if (id) refreshCurrTask(id);
  }
  return { handleProjectCreated, handleTaskCreated, handleTaskUpdated };
}

export { createUpdateReaction };
