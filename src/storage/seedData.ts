const seedData = {
  projects: [
    {
      id: "proj-1",
      title: "Welcome to Strata",
      overview: "A simple yet powerful project management tool",
      flag: null,
      createdAt: Date.now() - 86400000, // yesterday
      lastModified: Date.now(),
      tasks: ["task-1"],
    },
  ],
  tasks: [
    {
      id: "task-1",
      title: "Get Started",
      overview: "Explore the features of Strata",
      flag: null,
      items: ["item-1", "item-2"],
      createdAt: Date.now() - 86400000,
      lastModified: Date.now(),
    },
  ],
  items: [
    {
      id: "item-1",
      content: "Create a new project using the form",
      flag: null,
      note: "",
      createdAt: Date.now() - 86400000,
      lastModified: Date.now(),
    },
    {
      id: "item-2",
      content: "Add tasks and items to organize your work",
      flag: null,
      note: "Click on a project in the sidebar",
      createdAt: Date.now() - 86400000,
      lastModified: Date.now(),
    },
  ],
};

export { seedData };
