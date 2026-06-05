import { hasKeys } from "../../lib/utils";
import type {
  Snapshot,
  ItemInput,
  ProjectInput,
  TaskInput,
} from "../../lib/Types";

function isItem(v: unknown): v is ItemInput {
  return (
    hasKeys(v, ["id", "content", "flag", "note"]) &&
    typeof v.id === "string" &&
    typeof v.content === "string" &&
    (v.note === null || typeof v.note === "string")
  );
}

function isTask(v: unknown): v is TaskInput {
  return (
    hasKeys(v, ["id", "title", "overview", "flag", "items"]) &&
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.overview === "string" &&
    Array.isArray(v.items) &&
    v.items.every((id) => typeof id === "string")
  );
}

function isProject(v: unknown): v is ProjectInput {
  return (
    hasKeys(v, [
      "id",
      "title",
      "overview",
      "flag",
      "tasks",
      "createdAt",
      "lastModified",
    ]) &&
    typeof v.id === "string" &&
    typeof v.title === "string" &&
    typeof v.overview === "string" &&
    typeof v.createdAt === "number" &&
    typeof v.lastModified === "number" &&
    Array.isArray(v.tasks) &&
    v.tasks.every((id) => typeof id === "string")
  );
}
function isSnapshot(value: unknown): value is Snapshot {
  if (!hasKeys(value, ["projects", "tasks", "items"])) return false;
  const v = value;
  return (
    Array.isArray(v.projects) &&
    Array.isArray(v.tasks) &&
    Array.isArray(v.items) &&
    v.projects.every(isProject) &&
    v.tasks.every(isTask) &&
    v.items.every(isItem)
  );
}

export { isSnapshot };
