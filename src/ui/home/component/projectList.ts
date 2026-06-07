import type { PageData } from "../../../lib/Page";
import type { StoredType } from "../../../lib/Types";

// load projects
function projectLoader(snapshot: StoredType): PageData {
  return {
    tag: "aside",
    content: [
      { tag: "h2", content: "Projects" },
      {
        tag: "ul",
        class: "projectsList",
        content: [
          [...snapshot.projects].flatMap(([k, v]) => ({
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
          })),
        ],
      },
    ],
  };
}

export { projectLoader };
