import { selectProject } from "../../home/home";

function handleProjectView(match: HTMLElement, e: Event) {
  let btn = match.dataset["id"];
  let target = e.target as HTMLElement;
  let mainHost = target.closest("#app") as HTMLElement;

  let targetHost = mainHost.querySelector(
    ".projectsView",
  ) as HTMLElement | null;
  if (targetHost && btn) {
    mainHost
      .querySelectorAll(".projectsList button[data-id]")
      .forEach((val) => {
        val.classList.remove("active");
      });
    match.classList.add("active");
    selectProject(targetHost, btn);
  }
}

export { handleProjectView };
