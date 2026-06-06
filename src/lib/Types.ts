interface NewProjectInput {
  title: string;
  overview: string;
  flag: null | string[];
  tasks: string[];
}

interface NewTaskInput {
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
}

interface NewItemInput {
  content: string;
  note: string;
  flag: null | string[];
}

interface ProjectInput extends NewProjectInput {
  id: string;
  createdAt?: number;
  lastModified?: number;
}

interface TaskInput extends NewTaskInput {
  id: string;
  createdAt?: number;
  lastModified?: number;
}

interface ItemInput extends NewItemInput {
  id: string;
  createdAt?: number;
  lastModified?: number;
}

interface Snapshot {
  // version: number;
  projects: ProjectInput[];
  tasks: TaskInput[];
  items: ItemInput[];
}

//app instance
type ProjectInstance = {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  tasks: Set<string>;
  createdAt: number;
  lastModified: number;
};

type TaskInstance = {
  id: string;
  title: string;
  overview: string;
  flag: string[] | null;
  items: Set<string>;
  createdAt: number;
  lastModified: number;
};

type ItemInstance = {
  id: string;
  content: string;
  note: string;
  flag: string[] | null;
  createdAt: number;
  lastModified: number;
};

type StoredType = {
  projects: Map<string, ProjectInstance>;
  tasks: Map<string, TaskInstance>;
  items: Map<string, ItemInstance>;
};

export type {
  NewProjectInput,
  NewTaskInput,
  NewItemInput,
  StoredType,
  ProjectInput,
  TaskInput,
  ItemInput,
  Snapshot,
  ProjectInstance,
  TaskInstance,
  ItemInstance,
};
