import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";
import { refreshList, selectProject } from "../../home/home";

function handleNewProj(_match: HTMLElement, e: Event) {
  e.preventDefault();
  let target = e.target as HTMLElement;
  let mainHost = target.closest("#app") as HTMLElement;
  //grab user input and commit it

  let Title = mainHost.querySelector("#projTitle") as HTMLInputElement | null;
  let Overview = mainHost.querySelector(
    "#projOverview",
  ) as HTMLInputElement | null;

  if (Title && Overview) {
    if (Title.value.length < 1) {
      alert("invalid entry");
      return;
    }

    let command: Command = {
      type: "createProject",
      data: {
        title: Title.value,
        overview: Overview.value,
        flag: null,
        tasks: [],
      },
    };

    let newProj = dispatch(command);

    //ui side effects, needs to be extracted
    let targetHost = mainHost.querySelector(
      ".projectsView",
    ) as HTMLElement | null;

    let listHost = mainHost.querySelector(
      ".projectsList",
    ) as HTMLElement | null;

    if (targetHost && newProj && newProj.type === "createdProject") {
      mainHost
        .querySelectorAll(`.projectsList button[data-id]`)
        .forEach((val) => {
          val.classList.remove("active");
        });

      selectProject(targetHost, newProj.id, () => {
        if (listHost)
          refreshList(listHost, () => {
            let project = mainHost.querySelector(
              `.projectsList button[data-id="${newProj.id}"]`,
            );
            if (project) (project as HTMLElement).classList.add("active");
          });
      });
    }

    Title.value = "";
    Overview.value = "";
    let dialog = mainHost.querySelector(".new-proj-dialog");
    if (dialog) (dialog as HTMLDialogElement).close();
  }
}

export { handleNewProj };
