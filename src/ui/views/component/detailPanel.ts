import type { PageData } from "../../../lib/Page";
import type { ProjectInstance, StoredType } from "../../../lib/Types";

let initialView = {
  tag: "section",
  class: "projectsView",
  content: [
    { tag: "h2", content: "Project Detail" },
    {
      tag: "p",
      content: "Select a project to view",
    },
  ],
};

//errorData
let errorData = {
  tag: "section",
  class: "projectsView",
  content: [
    { tag: "h2", content: "Project not found" },
    {
      tag: "p",
      content: "The selected project could not be loaded.",
    },
  ],
};

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
  initial: boolean,
  projectId: string | null,
  store: StoredType | null,
): PageData {
  if (initial && projectId === null && store === null) {
    return initialView;
  }

  if (store && projectId) {
    const project = store.projects.get(projectId);
    if (!project) return errorData;
    return selectedProj(project, store);
  }

  return errorData;
}
export { viewProject };
