import type { PageData } from "../../../lib/Page";
import { formatDuration, getTimeObj } from "../../../lib/time";
import type { ProjectInstance, StoredType } from "../../../lib/Types";
import { button } from "./btn";

//selected project data
let selectedProj = (project: ProjectInstance, store: StoredType): PageData => {
  return {
    tag: "div",
    class: "workspace__container",
    content: [
      {
        tag: "div",
        class: "workspace__icon",
        ["aria-hidden"]: true,
        content: [
          {
            tag: "span",
            class: "material-symbols-outlined",
            content: "layers",
          },
        ],
      },
      {
        tag: "h2",
        contenteditable: true,
        ["data-action"]: "update-title prevent-newline paste-plain-text",
        content: project.title,
        "data-placeholder": "New project",
      },
      {
        tag: "ul",
        class: "project__flags",
        content: ["important", "favorite"].map((val) => {
          return {
            tag: "li",
            content: [
              {
                tag: "button",
                content: val,
              },
            ],
          };
        }),
      },
      { tag: "hr" },
      {
        tag: "p",
        contenteditable: true,
        "data-placeholder": "Project overview...",
        ["data-action"]: "update-overview prevent-newline paste-plain-text",
        content: project.overview,
      },
      {
        tag: "div",
        class: "workspace__task",
        content: generateTasks([...project.tasks], store),
      },
    ],
  };
};

function generateTasks(ids: string[], store: StoredType): PageData[] {
  return ids
    .map((val) => {
      let currTask = store.tasks.get(val);

      if (currTask) {
        const lastUpdated =
          currTask.lastModified === 0
            ? currTask.createdAt
            : currTask.lastModified;

        const duration = formatDuration(getTimeObj(lastUpdated));

        return {
          tag: "article",
          "data-id": currTask.id,
          content: [
            {
              tag: "div",
              class: "task__header",
              content: [
                {
                  tag: "div",
                  class: "task__left",
                  content: [
                    {
                      tag: "p",
                      class: "status",
                      content: "ongoing",
                    },
                    {
                      tag: "div",
                      class: "separator",
                      content: "•",
                    },
                    {
                      tag: "p",
                      class: "task-date",
                      content: `${duration} ago`,
                    },
                  ],
                },

                button("task__menu", `task option`, "not-set", "more"),
              ],
            },
            {
              tag: "h3",
              class: "task__title",
              content: currTask.title,
            },
            {
              tag: "p",
              class: "task__overview",
              content: currTask.overview,
            },
            {
              tag: "ul",
              class: "task__flags",
              content: [
                {
                  tag: "li",
                  content: [
                    button(
                      "task__favorite",
                      `Add Task to favorite`,
                      "not-set",
                      "favor",
                    ),
                  ],
                },
              ],
            },
          ],
        };
      } else {
        return null;
      }
    })
    .filter((val) => val !== null);
}

export { selectedProj };
