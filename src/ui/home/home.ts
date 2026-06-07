import type { PageData } from "../../lib/Page";
import type { StoredType } from "../../lib/Types";
import { detailComponent } from "./component/detail";
import { projectLoader } from "./component/projectList";

// load projects
function initialLoad(snapshot: StoredType): PageData {
  return [projectLoader(snapshot), detailComponent()];
}

export { initialLoad };
