//open modal
function handleNewProjBtn(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement | null;

  if (target) {
    let main = target.closest("#app") as HTMLElement;
    let dialog = main.querySelector("dialog");

    if (dialog) {
      (dialog as HTMLDialogElement).showModal();
    }
  }
}

//close modal
function handleCancelProj(_match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement;
  let mainHost = target.closest("#app") as HTMLElement;

  if (mainHost) {
    let dialog = mainHost.querySelector(".new-proj-dialog");
    if (dialog) (dialog as HTMLDialogElement).close();
  }
}

function hideModalHandler(match: HTMLElement, e: Event) {
  if (e.target === match) (match as HTMLDialogElement).close();
}

export { handleCancelProj, hideModalHandler, handleNewProjBtn };
