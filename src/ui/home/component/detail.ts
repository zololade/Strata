import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../lib/Types";

// load projects
function detailComponent(): PageData {
  return {
    tag: "section",
    class: "projectsView",
    content: [{ tag: "h2", content: "welcome" }],
  };
}
//selected project
function viewProject(projectId: unknown, store: StoredType): PageData {
  let errorData = {
    tag: "section",
    class: "projectView",
    content: [
      { tag: "h2", content: "Project not found" },
      {
        tag: "p",
        content: "The selected project could not be loaded.",
      },
    ],
  };
  if (typeof projectId !== "string") return errorData;

  const project = store.projects.get(projectId);

  if (!project) {
    return errorData;
  }

  return [
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
}
export { detailComponent, viewProject };
