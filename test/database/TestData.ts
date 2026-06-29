const data = {
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
      createdAt: 1700000000000,
      lastModified: 0,
    },

    {
      id: "item-2",
      content: "Read similar projects on GitHub",
      flag: null,
      note: "",
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],
};

const duplicateItemData = {
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
      createdAt: 1700000000000,
      lastModified: 0,
    },
    {
      // duplicate id — same as above, triggers checkDuplicate in the items loop
      id: "item-1",
      content: "Read similar projects on GitHub",
      flag: null,
      note: "",
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],
};

const missingItemRefData = {
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
      // "item-ghost" doesn't exist in items below — triggers assertExists in the tasks loop
      items: ["item-1", "item-ghost"],
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
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],
};

const missingTaskRefData = {
  projects: [
    {
      id: "proj-1",
      title: "Final Year Project",
      overview: "A web based student result management system",
      flag: null,
      createdAt: 1700000000000,
      lastModified: 0,
      // "task-ghost" doesn't exist in tasks below — triggers assertExists in the projects loop
      tasks: ["task-ghost"],
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "Research",
      overview: "Gather all background information needed",
      flag: null,
      items: ["item-1"],
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
      createdAt: 1700000000000,
      lastModified: 0,
    },
  ],
};

export { data as TestData, duplicateItemData, missingItemRefData, missingTaskRefData };
