import type { PageData } from "../../../lib/Page";
import { formatDuration, getTimeObj } from "../../../lib/time";
import type {
  ProjectInstance,
  StoredType,
  TaskInstance,
} from "../../../types/Types";
import { button } from "./btn";

//selected project data
const selectedProj = (
  project: ProjectInstance,
  store: StoredType,
): PageData => {
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
        content: [
          project.tasks.size > 0
            ? {
                tag: "div",
                class: "tasks__mainHeader",
                content: [
                  { tag: "p", content: "Add task" },
                  button(
                    "mainHeader__menu",
                    `Create tasks button`,
                    "create-task",
                    "add",
                  ),
                ],
              }
            : [],
          project.tasks.size > 0
            ? generateTasks([...project.tasks], store)
            : noTasksState,
        ],
      },
    ],
  };
};

const noTasksState: PageData = {
  tag: "div",
  class: "emptyState emptyState--tasks",
  content: [
    {
      tag: "span",
      class: "material-symbols-outlined",
      ["aria-hidden"]: true,
      content: "checklist",
    },
    { tag: "h3", content: "No tasks yet" },
    {
      tag: "p",
      content: "Break this project down into smaller, actionable tasks.",
    },
    {
      tag: "button",
      class: "emptyState__button",
      ["data-action"]: "create-task",
      content: "+ Add task",
    },
  ],
};

function generateTasks(ids: string[], store: StoredType): PageData[] {
  return ids
    .filter((id) => store.tasks.has(id))
    .sort((a, b) => {
      const taskA = store.tasks.get(a)!;
      const taskB = store.tasks.get(b)!;
      return taskB.createdAt - taskA.createdAt;
    })
    .map((val) => {
      const currTask = store.tasks.get(val);

      if (currTask) {
        const lastUpdated =
          currTask.lastModified === 0
            ? currTask.createdAt
            : currTask.lastModified;

        const duration = formatDuration(getTimeObj(lastUpdated));

        return {
          tag: "article",
          "data-id": currTask.id,
          content: generateTaskContent(currTask, duration),
        };
      } else {
        return null;
      }
    })
    .filter((val) => val !== null);
}

function generateTaskContent(
  currTask: TaskInstance,
  duration: string,
): PageData[] {
  return [
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
      contenteditable: true,
      ["data-action"]: "update-task-title prevent-newline paste-plain-text",
      ["data-task-id"]: currTask.id,
      content: currTask.title || "",
      "data-placeholder": "Task title",
    },
    {
      tag: "p",
      class: "task__overview",
      contenteditable: true,
      ["data-action"]: "update-task-overview prevent-newline paste-plain-text",
      ["data-task-id"]: currTask.id,
      content: currTask.overview || "",
      "data-placeholder": "Task overview...",
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
  ];
}

export { selectedProj, generateTaskContent };
