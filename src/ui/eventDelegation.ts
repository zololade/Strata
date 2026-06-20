type HandlerFn = (match: HTMLElement, e: Event) => void;

type HandlersByEvent = {
  click?: Record<string, HandlerFn>;
  focusout?: Record<string, HandlerFn>;
  beforeinput?: Record<string, HandlerFn>;
  paste?: Record<string, HandlerFn>;
};

function initializeEvents(handlers: HandlersByEvent) {
  const main = document.querySelector("#app") as HTMLElement;
  const actionHandlers = new Map(
    Object.entries(handlers) as [string, Record<string, HandlerFn>][],
  );

  actionHandlers.forEach((_v, k) =>
    main.addEventListener(k, (e) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const el = target.closest("[data-action]") as HTMLElement | null;

      if (!el) return;
      const action = el.dataset["action"];
      const actions = action?.split(" ") ?? [];
      const eventType = actionHandlers.get(k);
      if (eventType) {
        actions.forEach((a) => {
          const handler = eventType[a];
          if (handler) handler(el, e);
        });
      }
    }),
  );
}

export { initializeEvents, type HandlersByEvent };
