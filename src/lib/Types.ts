type StoredType<P, T, I> = {
  projects: Map<string, P>;
  tasks: Map<string, T>;
  items: Map<string, I>;
};

interface ProjectInput {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  tasks: string[];
  createdAt: number;
  lastModified: number;
}

interface TaskInput {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
}

interface ItemInput {
  id: string;
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

export type { StoredType, ProjectInput, TaskInput, ItemInput, Snapshot };
