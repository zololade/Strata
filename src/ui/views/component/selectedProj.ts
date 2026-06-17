import type { ProjectInstance, StoredType } from "../../../lib/Types";

//selected project data
let selectedProj = (project: ProjectInstance, _store: StoredType) => {
  return {
    tag: "div",
    class: "contentContainer",
    content: [
      {
        tag: "div",
        class: "decIcon",
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
        class: "flags",
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
    ],
  };
};

export { selectedProj };
