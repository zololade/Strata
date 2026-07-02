// src/ui/reactions/flagReaction.ts
function createFlagReaction(getCurrProjId: () => string | null) {
  // oxlint-disable-next-line unicorn/consistent-function-scoping -- factory runs once at composition root
  function handleFlagToggled(payload: unknown) {
    if (
      isPlainObject(payload) &&
      Object.hasOwn(payload, "element") &&
      Object.hasOwn(payload, "projectId")
    ) {
      const currentId = getCurrProjId();
      const { projectId, element } = payload;

      if (currentId !== projectId) return;
      const el = element as HTMLElement | null;
      if (el) {
        el.classList.toggle("active");
        void el.offsetHeight;
      }
    }
  }

  return { handleFlagToggled };
}

//helper
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export { createFlagReaction };
