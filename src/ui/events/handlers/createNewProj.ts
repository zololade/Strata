import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";
import { ModalManager } from "../../views/component/Modal";
import { refreshList, selectProject } from "../../views/home";

function handleCreateProj(_match: HTMLElement, _e: Event) {
  //first you build the data
  let titleField = document.querySelector(
    "#projTitle",
  ) as HTMLInputElement | null;
  let overviewField = document.querySelector(
    "#projOverview",
  ) as HTMLInputElement | null;
  const listHost = document.querySelector(
    ".projectsList",
  ) as HTMLUListElement | null;

  if (titleField && overviewField) {
    let command: Command = {
      type: "createProject",
      data: {
        title: titleField.value,
        overview: overviewField.value,
        flag: null,
        tasks: [],
      },
    };
    let projData = dispatch(command);

    //few things to do before rendering
    titleField.value = "";
    overviewField.value = "";
    //some side effects
    ModalManager.close(".new-proj-dialog");
    let afterRender = refreshList();
    //render created project
    if (projData?.type === "createdProject" && listHost)
      afterRender(listHost, () => selectProject(projData.id));
  }
}

export { handleCreateProj };
