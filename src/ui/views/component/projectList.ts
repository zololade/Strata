import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../types/Types";
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
          button({
            cls: "mainNav__createBtn",
            label: "Add new project",
            action: "open-modal",
            type: "edit",
          }),
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
