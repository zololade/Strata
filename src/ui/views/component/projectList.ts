import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../lib/Types";
import { button } from "./btn";

// load projects
function projectLoader(snapshot: StoredType): PageData {
  return {
    tag: "aside",
    class: "mainNav",
    content: [
      {
        tag: "header",
        class: "mainNav__toolbar",
        content: [
          {
            tag: "h2",
            class: "mainNav__title",
            content: "Projects",
          },
          button("mainNav__createBtn", "Add new project", "open-modal", "edit"),
        ],
      },
      {
        tag: "ul",
        class: "mainNav__list",
        content: [generateList(snapshot)],
      },
    ],
  };
}

function generateList(snapshot: StoredType): PageData {
  return [...snapshot.projects].flatMap(([k, v]) => ({
    tag: "li",
    content: [
      {
        tag: "button",
        ["data-action"]: "select-project",
        ["data-id"]: k,
        content: [{ tag: "h3", content: v.title }],
      },
    ],
  }));
}

export { projectLoader, generateList };
