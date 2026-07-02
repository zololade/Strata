import type { PageData } from "../../../lib/Page";
import { formatDuration, getTimeObj } from "../../../lib/time";
import type { ProjectInstance, StoredType, TaskInstance } from "../../../types/Types";
import { button } from "./btn";
import { kebabMenuContent } from "./KebabMenu";

//selected project data
const selectedProj = (project: ProjectInstance, store: StoredType): PageData => {
  const tasks = [...store.tasks.values()].filter((t) => t.projectId === project.id);

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
        ["data-action"]: "update-title prevent-newline paste-plain-text menu-close",
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
                class: project.flag?.includes(val) ? "active" : "",
                content: val,
                ["data-action"]: "toggle-flag",
                ["data-flag"]: val,
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
        ["data-action"]: "update-overview prevent-newline paste-plain-text menu-close",
        content: project.overview,
      },
      {
        tag: "div",
        class: "workspace__task",
        content: [
          tasks.length > 0
            ? {
                tag: "div",
                class: "tasks__mainHeader",
                content: [
                  { tag: "p", content: "Add task" },
                  button({
                    cls: "mainHeader__menu",
                    label: `Create tasks button`,
                    action: "create-task",
                    type: "add",
                  }),
                ],
              }
            : [],
          tasks.length > 0 ? generateTasks(tasks) : noTasksState,
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

function generateTasks(data: TaskInstance[]): PageData[] {
  return data
    .toSorted((taskA, taskB) => {
      return taskB.createdAt - taskA.createdAt;
    })
    .map((val) => {
      const currTask = val;

      if (currTask) {
        const lastUpdated =
          currTask.lastModified === 0 ? currTask.createdAt : currTask.lastModified;

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

function generateTaskStatus(duration: string) {
  return [
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
  ];
}

function generateTaskContent(currTask: TaskInstance, duration: string): PageData[] {
  return [
    {
      tag: "div",
      class: "task__header",
      content: [
        {
          tag: "div",
          class: "task__left",
          content: [...generateTaskStatus(duration)],
        },
        {
          tag: "div",
          class: "kebab-menu",
          content: kebabMenuContent({
            id: currTask.id,
            type: "task",
            options: [
              { label: "Edit Task", action: "edit-task" },
              { label: "Delete Task", action: "delete-task", danger: true },
            ],
          }),
        },
      ],
    },
    {
      tag: "h3",
      class: "task__title",
      contenteditable: true,
      ["data-action"]: "update-task-title prevent-newline paste-plain-text menu-close",
      ["data-task-id"]: currTask.id,
      content: currTask.title || "",
      "data-placeholder": "Task title",
    },
    {
      tag: "p",
      class: "task__overview",
      contenteditable: true,
      ["data-action"]: "update-task-overview prevent-newline paste-plain-text menu-close",
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
            button({
              cls: currTask.flag?.includes("favorite") ? "active task__favorite" : "task__favorite",
              id: ["task-id", currTask.id],
              label: `Add Task to favorite`,
              action: "toggle-task-flag",
              type: "favor",
              flag: "favorite",
            }),
          ],
        },
      ],
    },
  ];
}

export { selectedProj, generateTaskStatus };
