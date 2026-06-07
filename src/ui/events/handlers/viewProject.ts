import { appBus } from "../../../lib/Buses";

function handleProjectView(match: HTMLElement, e: Event) {
  let target = e.target as HTMLElement;
  let mainHost = target.closest("#app") as HTMLElement;
  let targetHost = mainHost.querySelector(".projectsView");
  if (!match) return;
  if (targetHost) {
    appBus.publish("view:project", {
      id: match.dataset["id"],
      host: targetHost,
    });
  }
}

export { handleProjectView };
