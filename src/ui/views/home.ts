import type { EventBus } from "../../lib/EventBus";
import { renderElement } from "../../lib/Page";
import type { StoredType } from "../../types/Types";
import { button } from "./component/btn";
import { detailPanelShell } from "./component/detailPanel";
import { newProject } from "./component/Modal";
import { generateList, projectLoader } from "./component/projectList";

function createAppShell(store: StoredType, bus: EventBus) {
  const main = document.querySelector("#app") as HTMLElement;
  //add an action
  main.dataset["action"] = "menu-close";

  let selectedProjectId: string | null = null;
  let prevSelectedProjId: string | null = null;

  const getCurrProjId = () => selectedProjectId;
  const getPrevProjId = () => prevSelectedProjId;
  const setPrevProjId = (id: string) => (prevSelectedProjId = id);

  function appShell() {
    renderElement(main, [
      { tag: "h1", class: "accessible", content: "Strata" },
      {
        tag: "div",
        class: "drawer-backdrop",
        id: "backdrop",
        ["data-action"]: "close-nav",
      },
      button({
        cls: "mainNav__close",
        label: "Close navigation",
        action: "close-nav",
        type: "close",
      }),
      projectLoader(store),
      [newProject(), detailPanelShell()],
    ]);
  }

  function selectProject(id: string) {
    selectedProjectId = id;
    bus.publish("view:project", id);
    main.classList.add("project-selected");
  }

  function refreshList() {
    return (listHost: HTMLElement, afterRender: () => void) => {
      renderElement(listHost, generateList(store), false, afterRender);
    };
  }

  return {
    appShell,
    getCurrProjId,
    selectProject,
    getPrevProjId,
    setPrevProjId,
    refreshList,
  };
}

export { createAppShell };
