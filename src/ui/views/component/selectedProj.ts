import type { ProjectInstance, StoredType } from "../../../lib/Types";

//selected project data
let selectedProj = (project: ProjectInstance, _store: StoredType) => [
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
    ["data-action"]: "update-title",
    content: project.title,
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
    ["data-action"]: "update-overview",
    content: project.overview,
  },
];

export { selectedProj };
