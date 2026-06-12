import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../lib/Types";

// load projects
function projectLoader(snapshot: StoredType): PageData {
  return {
    tag: "aside",
    class: "projListContainer",
    content: [
      {
        tag: "div",
        class: "projectsHeader",
        content: [
          { tag: "h2", content: "Projects" },
          {
            tag: "button",
            id: "openNewProjBtn",
            class: "add-project-btn",
            ["data-action"]: "open-modal",
            content: "＋",
          },
        ],
      },
      {
        tag: "ul",
        class: "projectsList",
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
        ["data-id"]: k,
        content: [
          { tag: "h3", content: v.title },
          { tag: "p", content: v.overview },
        ],
      },
    ],
  }));
}

export { projectLoader, generateList };
