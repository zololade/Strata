import { main } from "../..";

function handleNewProjBtn(_match: HTMLElement, _e: Event) {
  let dialog = main.querySelector("dialog");

  if (dialog) {
    (dialog as HTMLDialogElement).showModal();
  }
}

export { handleNewProjBtn };
