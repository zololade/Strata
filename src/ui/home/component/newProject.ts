import type { PageData } from "../../../lib/Page";

function newProject(): PageData {
  return {
    tag: "form",
    class: "newProject",
    content: [
      {
        tag: "fieldset",
        content: [
          { tag: "legend", content: "Add Project" },
          {
            tag: "label",
            for: "projTitle",
            content: "Title",
          },
          { tag: "input", id: "projTitle", type: "text" },
          {
            tag: "label",
            for: "projOverview",
            content: "Overview",
          },
          { tag: "textarea", id: "projOverview" },
          {
            tag: "div",
            class: "formBtns",
            content: [
              {
                tag: "button",
                content: "cancel",
                type: "button",
                id: "cancelProjBtn",
              },
              {
                tag: "button",
                content: "submit",
                type: "submit",
                id: "newProjBtn",
              },
            ],
          },
        ],
      },
    ],
  };
}

export { newProject };
