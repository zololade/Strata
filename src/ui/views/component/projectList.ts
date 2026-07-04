import type { PageData } from "../../../lib/Page";
import type { ProjectInstance } from "../../../types/Types";
import { button } from "./btn";

// load projects
function projectLoader(projects: ProjectInstance[]): PageData {
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
            action: "menu-close open-modal",
            type: "Edit",
          }),
        ],
      },
      {
        tag: "ul",
        class: "mainNav__list",
        content: [generateList(projects)],
      },
    ],
  };
}

function generateList(projects: ProjectInstance[]): PageData {
  return projects.flatMap((v) => ({
    tag: "li",
    content: [
      {
        tag: "button",
        ["data-action"]: "select-project",
        ["data-id"]: v.id,
        content: [{ tag: "h3", content: v.title }],
      },
    ],
  }));
}

export { projectLoader, generateList };
