import type { PageData } from "../../../lib/Page";
import type { ProjectInstance, StoredType } from "../../../lib/Types";
import { button } from "./btn";

type TimeObject = {
  years: number;
  months: number;
  days: number;
  hours: number;
  min: number;
  secs: number;
};

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
                class: "flagsBtn",
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

function getTimeObj(inputVal: number): TimeObject {
  let diff = Date.now() - inputVal;

  const MS = {
    year: 31536000000,
    month: 2592000000,
    day: 86400000,
    hour: 3600000,
    min: 60000,
    sec: 1000,
  };

  const years = Math.floor(diff / MS.year);
  diff %= MS.year;

  const months = Math.floor(diff / MS.month);
  diff %= MS.month;

  const days = Math.floor(diff / MS.day);
  diff %= MS.day;

  const hours = Math.floor(diff / MS.hour);
  diff %= MS.hour;

  const min = Math.floor(diff / MS.min);
  diff %= MS.min;

  const secs = Math.floor(diff / MS.sec);

  return { years, months, days, hours, min, secs };
}

const formatDuration = (d: TimeObject) => {
  if (d.years) return `${d.years} year${d.years > 1 ? "s" : ""}`;
  if (d.months) return `${d.months} month${d.months > 1 ? "s" : ""}`;
  if (d.days) return `${d.days} day${d.days > 1 ? "s" : ""}`;
  if (d.hours) return `${d.hours} hour${d.hours > 1 ? "s" : ""}`;
  if (d.min) return `${d.min} min`;
  return `${d.secs} sec`;
};

export { selectedProj };
