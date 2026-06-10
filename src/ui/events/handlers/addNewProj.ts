import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";

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

    dispatch(command);
  }
}

export { handleNewProj };
