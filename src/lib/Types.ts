interface Project {
  id: string;
  title: string;
  overview: string;
  flag: null | string[];
  tasks: Task[];
  createdAt: number;
  lastModified: number;
}

interface Task {
  id: string;
  title: string;
  overview: string;
  items: Item[];
}

interface Item {
  content: string;
  note?: string;
  flag: null | string[];
}

export type { Project, Task, Item };
