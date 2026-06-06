import type { ItemInput, ProjectInput, TaskInput } from "./Types";

type Command =
  | {
      type: "createProject";
      data: ProjectInput;
    }
  | {
      type: "createTask";
      projectId: string;
      data: TaskInput;
    }
  | {
      type: "createItem";
      taskId: string;
      data: ItemInput;
    }
  | {
      type: "removeProject";
      data: {
        projectId: string;
      };
    }
  | {
      type: "removeTask";
      data: {
        taskId: string;
        projectId: string;
      };
    }
  | {
      type: "removeItem";
      data: {
        itemId: string;
        taskId: string;
      };
    }
  | {
      type: "update";
    };

type Result =
  | { type: "removedProject"; id: string }
  | { type: "removedTask"; id: string }
  | { type: "removedItem"; id: string }
  | { type: "createdProject"; id: string }
  | { type: "createdTask"; id: string }
  | { type: "createdItem"; id: string }
  | { type: "notFound"; entity: "project" | "task" | "item" };

export type { Command, Result };
