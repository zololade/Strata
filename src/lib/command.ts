import type {
  ItemInput,
  NewItemInput,
  NewProjectInput,
  NewTaskInput,
  ProjectInput,
  TaskInput,
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
      data: Partial<Pick<ProjectInput, keyof ProjectInput>>;
    }
  | {
      type: "updateTask";
      taskId: string;
      data: Partial<Pick<TaskInput, keyof TaskInput>>;
    }
  | {
      type: "updateItem";
      itemId: string;
      data: Partial<Pick<ItemInput, keyof ItemInput>>;
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
