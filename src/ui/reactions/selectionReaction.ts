import { renderElement } from "../../lib/Page";
import type { StoreSelectors } from "../../store";
import { viewProject } from "../views/component/detailPanel";
import { kebabMenuContent } from "../views/component/KebabMenu";

type ShowActiveProjectDeps = {
  selectors: StoreSelectors;
  getPrevProjId: () => string | null;
  setPrevProjId: (id: string) => void;
};

function createShowActiveProject({
  selectors,
  getPrevProjId,
  setPrevProjId,
}: ShowActiveProjectDeps) {
  function updateList(id: string) {
    const listContainer = document.querySelector(".mainNav__list") as HTMLDialogElement | null;

    if (listContainer) {
      const prev = listContainer.querySelector(`[data-id="${getPrevProjId()}"]`);
      const active = listContainer.querySelector(`[data-id="${id}"]`);
      if (prev) prev.classList.remove("active");
      if (active) active.classList.add("active");
      setPrevProjId(id);
    }
  }

  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function updateMainKebab(id: string) {
    const kebabHost = document.querySelector(".project-kebab-container") as HTMLElement | null;

    if (!kebabHost) return;

    renderElement(
      kebabHost,
      kebabMenuContent({
        id,
        type: "project",
        options: [
          { label: "Rename Project", action: "rename-project" },
          { label: "Delete Project", action: "delete-project", danger: true },
        ],
      }),
    );
  }

  return function showActiveProject(data: unknown) {
    const viewPanel = document.querySelector(".mainContent__workspace") as HTMLElement | null;
    const projectHeaderTitle = document.querySelector("#projDetailTitle") as HTMLElement | null;

    if (viewPanel && projectHeaderTitle && typeof data === "string") {
      const project = selectors.projects.getById(data);
      projectHeaderTitle.textContent = project ? project.title : "";

      if (project) {
        renderElement(
          viewPanel,
          viewProject({ project: project, tasks: selectors.tasks.getByProjectId(data) }),
          false,
          () => updateMainKebab(data),
        );

        updateList(data);
      }
    }
  };
}

export { createShowActiveProject };
