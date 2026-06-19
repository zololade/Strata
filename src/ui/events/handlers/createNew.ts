import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";
import { refreshTask } from "../../UIreactions/taskReaction";
import { ModalManager } from "../../views/component/Modal";
import { getCurrProjId, refreshList, selectProject } from "../../views/home";

// create new project
function handleCreateProj(_match: HTMLElement, e: Event) {
  e.preventDefault();
  //first you build the data
  const titleField = document.querySelector(
    "#projTitle",
  ) as HTMLInputElement | null;
  const overviewField = document.querySelector(
    "#projOverview",
  ) as HTMLInputElement | null;
  const listHost = document.querySelector(
    ".mainNav__list",
  ) as HTMLUListElement | null;

  if (titleField && overviewField) {
    const command: Command = {
      type: "createProject",
      data: {
        title:
          titleField.value.trim().length < 1 ? "New project" : titleField.value,
        overview: overviewField.value,
        flag: null,
        tasks: [],
      },
    };
    const projData = dispatch(command);

    //few things to do before rendering
    titleField.value = "";
    overviewField.value = "";
    //some side effects
    ModalManager.close(".dialog");
    const afterRender = refreshList();
    //render created project
    if (projData?.type === "createdProject" && listHost)
      afterRender(listHost, () => selectProject(projData.id));
  }
}

//create new task
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleCreateTask(_match: HTMLElement, _e: Event) {
  const id = getCurrProjId();
  if (id) {
    const command: Command = {
      projectId: id,
      type: "createTask",
      data: {
        title: "",
        overview: "",
        flag: null,
        items: [],
      },
    };

    const result = dispatch(command);

    refreshTask(() => {
      if (result?.type !== "createdTask") return;

      const selector = `h3[contenteditable="true"][data-task-id="${result.id}"]`;
      const heading3 = document.querySelector(selector) as HTMLElement | null;

      if (heading3) focusAtEnd(heading3);
    });
  }
}

function focusAtEnd(element: HTMLElement) {
  element.focus(); // First, bring focus to the element

  const selection = window.getSelection(); // Get the browser's selection object
  const range = document.createRange(); // Create a new text range

  range.selectNodeContents(element); // Select all contents of the editable element
  range.collapse(false); // Collapse the range to the end (false = end, true = start)
  if (selection) {
    selection.removeAllRanges(); // Clear any existing text selections
    selection.addRange(range); // Apply the new range to move the cursor
  }
}

export { handleCreateProj, handleCreateTask };
