let data = {
  projects: [
    {
      id: "proj-1",
      title: "Final Year Project",
      overview: "A web based student result management system",
      flag: null,
      createdAt: 1700000000000,
      lastModified: 0,
      tasks: ["task-1"],
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Research",
      overview: "Gather all background information needed",
      flag: null,
      items: ["item-1", "item-2"],
    },
  ],

  items: [
    {
      id: "item-1",
      content: "Check Wikipedia",
      flag: null,
      note: "",
    },

    {
      id: "item-2",
      content: "Read similar projects on GitHub",
      flag: null,
      note: "",
    },
  ],
};

let badData = {
  projects: [
    {
      id: "proj-1",
      title: "Final Year Project",
      overview: "A web based student result management system",
      flag: null,
      createdAt: 1700000000000,
      lastModified: 0,
      tasks: ["task-2"],
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Research",
      overview: "Gather all background information needed",
      flag: null,
      items: ["item-1", "item-1"],
    },
  ],

  items: [
    {
      id: "item-1",
      content: "Check Wikipedia",
      flag: null,
      note: "",
    },

    {
      id: "item-2",
      content: "Read similar projects on GitHub",
      flag: null,
      note: "",
    },
  ],
};
export { data as TestData, badData };
