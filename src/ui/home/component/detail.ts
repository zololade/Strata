import type { PageData } from "../../../lib/Page";

// load projects
function detailComponent(): PageData {
  return {
    tag: "section",
    class: "projectsView",
    content: [{ tag: "h2", content: "welcome" }],
  };
}

export { detailComponent };
