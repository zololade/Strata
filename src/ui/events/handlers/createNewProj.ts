import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";
import { ModalManager } from "../../views/component/Modal";
import { refreshList, selectProject } from "../../views/home";

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
    ModalManager.close(".new-proj-dialog");
    const afterRender = refreshList();
    //render created project
    if (projData?.type === "createdProject" && listHost)
      afterRender(listHost, () => selectProject(projData.id));
  }
}

export { handleCreateProj };
