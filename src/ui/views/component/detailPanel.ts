import type { PageData } from "../../../lib/Page";
import type { ProjectInstance, StoredType } from "../../../lib/Types";

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

//selected project data
let selectedProj = (project: ProjectInstance, store: StoredType) => [
  {
    tag: "header",
    content: [
      {
        tag: "h2",
        content: project.title,
      },
      {
        tag: "p",
        content: project.overview,
      },
    ],
  },

  {
    tag: "div",
    class: "taskList",
    content: [
      {
        tag: "h3",
        content: "Tasks",
      },

      ...[...project.tasks].map((taskId) => {
        const task = store.tasks.get(taskId);

        if (!task) {
          return {
            tag: "div",
            class: "task missing",
            content: "Missing task",
          };
        }

        return {
          tag: "article",
          class: "task",
          id: task.id,
          content: [
            {
              tag: "h4",
              content: task.title,
            },
            {
              tag: "p",
              content: task.overview,
            },
            {
              tag: "small",
              content: `${task.items.size} item(s)`,
            },
          ],
        };
      }),
    ],
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
                id: "detailBackBtn",
                ["aria-label"]: "Go back",
                ["data-action"]: "back",
                content: [
                  {
                    tag: "span",
                    class: "material-symbols-outlined",
                    content: "chevron_backward",
                  },
                ],
              },
              {
                tag: "span",
                ["aria-hidden"]: true,
                id: "projDetailTitle",
                content: "dummy header",
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
