import { selectProject } from "../../views/home";

function handleSelectProj(match: HTMLElement, _e: Event) {
  let btn = match.dataset["id"];

  if (btn) {
    selectProject(btn);
  }
}

export { handleSelectProj };
