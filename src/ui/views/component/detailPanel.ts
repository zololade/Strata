import type { PageData } from "../../../lib/Page";
import type { ProjectInstance, TaskInstance } from "../../../types/Types";
import { button } from "./btn";
import { selectedProj } from "./selectedProj";

type IncomingViewData = {
  project: ProjectInstance;
  allTask: TaskInstance[];
};

//default data
const defaultData = {
  tag: "div",
  class: "emptyState",
  content: [
    {
      tag: "span",
      class: "material-symbols-outlined",
      ["aria-hidden"]: true,
      content: "layers",
    },
    { tag: "h2", content: "No project selected" },
    {
      tag: "p",
      content: "Select a project from the list or create a new one to get started",
    },
    {
      tag: "button",
      class: "emptyState__button",
      ["data-action"]: "open-modal",
      content: "New project",
    },
  ],
};

//errorData
const errorData = [
  { tag: "h2", content: "Project not found" },
  {
    tag: "p",
    content: "The selected project could not be loaded.",
  },
];

//view selected project
function viewProject(data?: IncomingViewData): PageData {
  return !data ? defaultData : data ? selectedProj(data.project, data.allTask) : errorData;
}

function detailPanelShell(): PageData {
  return {
    tag: "section",
    class: "mainContent",
    content: [
      {
        tag: "header",
        class: "mainContent__header",
        content: [
          {
            tag: "div",
            class: "toolbar__left",
            content: [
              button({
                cls: "toolbar__side-nav",
                label: "Show nav bar",
                action: "show-nav",
                type: "sideNav",
              }),
              {
                tag: "span",
                ["aria-hidden"]: true,
                id: "projDetailTitle",
                content: "Project",
              },
            ],
          },
          {
            tag: "div",
            class: "project-kebab-container kebab-menu",
            content: [],
          },
        ],
      },
      {
        tag: "div",
        class: "mainContent__workspace",
        content: [viewProject()],
      },
    ],
  };
}

export { viewProject, detailPanelShell };
