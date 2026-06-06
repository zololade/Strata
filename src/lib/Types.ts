interface ProjectInput {
  id?: string;
  title: string;
  overview: string;
  flag: null | string[];
  tasks: string[];
  createdAt?: number;
  lastModified?: number;
}

interface TaskInput {
  id?: string;
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
}

interface ItemInput {
  id?: string;
  content: string;
  note: string;
  flag: null | string[];
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
};

type ItemInstance = {
  id: string;
  content: string;
  note: string;
  flag: string[] | null;
};

type StoredType = {
  projects: Map<string, ProjectInstance>;
  tasks: Map<string, TaskInstance>;
  items: Map<string, ItemInstance>;
};

export type {
  StoredType,
  ProjectInput,
  TaskInput,
  ItemInput,
  Snapshot,
  ProjectInstance,
  TaskInstance,
  ItemInstance,
};
