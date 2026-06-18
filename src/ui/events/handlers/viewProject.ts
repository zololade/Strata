import { selectProject } from "../../views/home";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleSelectProj(match: HTMLElement, _e: Event) {
  const btn = match.dataset["id"];

  if (btn) {
    selectProject(btn);
  }
}

export { handleSelectProj };
