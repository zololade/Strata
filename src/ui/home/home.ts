import type { PageData } from "../../lib/Page";
import { renderElement } from "../../lib/renderUtilities";
import type { StoredType } from "../../lib/Types";
import { detailComponent, viewProject } from "./component/detail";
import { projectLoader } from "./component/projectList";

type Incoming = {
  id: string | undefined;
  host: Element | null;
};
// load projects
function initialLoad(snapshot: StoredType): PageData {
  return [projectLoader(snapshot), detailComponent()];
}

function updateView(data: unknown, store: StoredType) {
  let parsedData = data as Incoming;
  if (parsedData.id === undefined || !parsedData.host) return;
  if (data)
    renderElement(
      parsedData.host as HTMLElement,
      viewProject(parsedData.id, store),
    );
}

export { initialLoad, updateView };
