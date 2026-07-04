const data = {
  projects: [
    {
      id: "proj-1",
      title: "Final Year Project",
      overview: "A web based student result management system",
      flag: null,
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Research",
      overview: "Gather all background information needed",
      flag: null,
      projectId: "proj-1",
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],

  items: [
    {
      id: "item-1",
      content: "Check Wikipedia",
      flag: null,
      note: "",
      taskId: "task-1",
      createdAt: 1700000000000,
      lastModified: 0,
    },

    {
      id: "item-2",
      content: "Read similar projects on GitHub",
      flag: null,
      note: "",
      taskId: "task-1",
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],
};

export { data as TestData };
