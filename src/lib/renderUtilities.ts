import Page, { type PageData } from "./Page";

// a utility function that render processed data in the supplied host
export function renderElement(
  host: HTMLElement,
  data: PageData,
  skipDiff?: boolean,
  afterRender?: () => void,
) {
  //check if host is available
  if (!host) return;
  const render = () => {
    if (skipDiff) {
      const fragment = Page.build(data);
      Page.pureRender(host, fragment);
    } else {
      Page.snapshotRender(host, data);
    }
  };

  if (document.startViewTransition) {
    const transition = document.startViewTransition(render);
    if (afterRender) {
      transition.finished.then(() => {
        afterRender();
      });
    }
  } else {
    render();
  }
}
