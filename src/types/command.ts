import type {
  ItemUpdate,
  NewItemInput,
  NewProjectInput,
  NewTaskInput,
  ProjectUpdate,
  TaskUpdate,
} from "./Types";

type Command =
  | {
      type: "createProject";
      data: NewProjectInput;
    }
  | {
      type: "createTask";
      projectId: string;
      data: NewTaskInput;
    }
  | {
      type: "createItem";
      taskId: string;
      data: NewItemInput;
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
      type: "updateProject";
      projectId: string;
      data: ProjectUpdate;
    }
  | {
      type: "updateTask";
      taskId: string;
      data: TaskUpdate;
    }
  | {
      type: "updateItem";
      itemId: string;
      data: ItemUpdate;
    };

type Result =
  | { type: "removedProject"; id: string }
  | { type: "removedTask"; id: string }
  | { type: "removedItem"; id: string }
  | { type: "createdProject"; id: string }
  | { type: "createdTask"; id: string }
  | { type: "createdItem"; id: string }
  | { type: "updatedProject"; id: string }
  | { type: "updatedTask"; id: string }
  | { type: "updatedItem"; id: string }
  | { type: "notFound"; entity: "project" | "task" | "item" };

export type { Command, Result };
