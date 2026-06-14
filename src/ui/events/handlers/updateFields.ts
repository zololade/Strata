import type { Command } from "../../../lib/command";
import { dispatch } from "../../../store/storeOperations/dispatch";
import { getCurrProjId } from "../../views/home";

function handleUpdateTitle(match: HTMLElement, _e: Event) {
  const id = getCurrProjId();
  if (!id || !match) return;
  const command: Command = {
    type: "updateProject",
    projectId: id,
    data: {
      title: match.textContent,
    },
  };
  dispatch(command);

  //update ui
  let toolbar = document.querySelector("#projDetailTitle");
  let btn = document.querySelector(
    `[data-action="select-project"][data-id="${id}"] h3`,
  );
  if (btn && toolbar) {
    btn.textContent = match.textContent;
    toolbar.textContent = match.textContent;
  }
}

function handlePreventNewLine(match: HTMLElement, e: Event) {
  const keyEvent = e as KeyboardEvent;
  if (keyEvent.key === "Enter") {
    e.preventDefault();
    match.blur();
  }
}

function handleUpdateOverview(match: HTMLElement, _e: Event) {
  const id = getCurrProjId();
  if (!id || !match) return;
  const command: Command = {
    type: "updateProject",
    projectId: id,
    data: {
      overview: match.textContent,
    },
  };
  dispatch(command);
}

export { handleUpdateOverview, handleUpdateTitle, handlePreventNewLine };
