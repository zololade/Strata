type StoredType<P, T, I> = {
  projects: Map<string, P>;
  tasks: Map<string, T>;
  items: Map<string, I>;
};

interface ProjectData {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  tasks: TaskData[];
  createdAt: number;
  lastModified: number;
}

interface TaskData {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  items: ItemData[];
}

interface ItemData {
  id: string;
  content: string;
  note: string;
  flag: null | string[];
}
//constructor inputs
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
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  items: string[];
}

interface ItemInput {
  id: string;
  content: string;
  note?: string;
  flag: null | string[];
}

export type {
  ProjectData,
  TaskData,
  ItemData,
  StoredType,
  ProjectInput,
  TaskInput,
  ItemInput,
};
