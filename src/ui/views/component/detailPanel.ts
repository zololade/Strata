import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../lib/Types";
import { selectedProj } from "./selectedProj";

//default data
const defaultData = [
  { tag: "h2", content: "Project Detail" },
  {
    tag: "p",
    content: "Select a project to view",
  },
];

//errorData
const errorData = [
  { tag: "h2", content: "Project not found" },
  {
    tag: "p",
    content: "The selected project could not be loaded.",
  },
];

//view selected project
function viewProject(
  projectId: string | null,
  store: StoredType | null,
): PageData {
  const project = projectId && store && store.projects.get(projectId);

  return !projectId && !store
    ? defaultData
    : store && projectId && project
      ? selectedProj(project, store)
      : errorData;
}

function detailPanelShell(): PageData {
  return {
    tag: "section",
    class: "projectsView",
    content: [
      {
        tag: "header",
        class: "panelHeader",
        content: [
          {
            tag: "div",
            class: "headerGroup",
            content: [
              {
                tag: "button",
                id: "sideNavBtn",
                ["aria-label"]: "Show nav bar",
                ["data-action"]: "show-nav",
                content: [
                  {
                    tag: "span",
                    class: "material-symbols-outlined",
                    content: "side_navigation",
                  },
                ],
              },
              {
                tag: "div",
                ["aria-hidden"]: true,
                content: [
                  {
                    tag: "span",
                    ["aria-hidden"]: true,
                    id: "projDetailTitle",
                    content: "dummy header",
                  },
                ],
              },
            ],
          },
          {
            tag: "button",
            class: "projectKebab",
            ["aria-label"]: "Project options",
            content: [
              {
                tag: "span",
                class: "material-symbols-outlined",
                content: "more_horiz",
              },
            ],
          },
        ],
      },
      {
        tag: "div",
        class: "projectContent",
        content: [viewProject(null, null)],
      },
    ],
  };
}

export { viewProject, detailPanelShell };
