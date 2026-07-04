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
      data: NewTaskInput;
    }
  | {
      type: "createItem";
      data: NewItemInput;
    }
  | {
      type: "removeProject";
      data: {
        projectId: string;
        onPersistSuccess?: () => void;
      };
    }
  | {
      type: "removeTask";
      data: {
        taskId: string;
        onPersistSuccess?: () => void;
      };
    }
  | {
      type: "removeItem";
      data: {
        itemId: string;
        onPersistSuccess?: () => void;
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
