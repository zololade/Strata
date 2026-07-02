const now = Date.now();
const day = 86_400_000;

const seedData = {
  projects: [
    {
      id: "proj-1",
      title: "Welcome to Strata",
      overview:
        "Strata organizes your work into Projects → Tasks → Items. Complete the tasks below to learn the workflow, then delete this project and start building your own.",
      flag: null,
      createdAt: now - day,
      lastModified: now,
      tasks: new Set(["task-1", "task-2", "task-3", "task-4"]),
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "1. Understand the Workspace",
      overview: "Let's get familiar with the interface before creating anything.",
      flag: null,
      items: new Set(["item-1", "item-2", "item-3"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-2",
      title: "2. Create Your First Project",
      overview: "Projects are the highest level of organization in Strata.",
      flag: null,
      items: new Set(["item-4", "item-5", "item-6"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-3",
      title: "3. Organize Your Work",
      overview: "Tasks and items help break large goals into manageable pieces.",
      flag: null,
      items: new Set(["item-7", "item-8", "item-9"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-4",
      title: "4. You're Ready!",
      overview: "You've seen the basics. The rest is up to you.",
      flag: null,
      items: new Set(["item-10", "item-11"]),
      createdAt: now - day,
      lastModified: now,
    },
  ],

  items: [
    {
      id: "item-1",
      content: "Read the overview of this project.",
      flag: null,
      note: "Everything in Strata lives inside a Project. Each project contains Tasks, and each Task contains Items.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-2",
      content: "Select different tasks from the sidebar.",
      flag: null,
      note: "Notice how the content updates as you move through the application.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-3",
      content: "Try opening this item's note.",
      flag: null,
      note: "Items can contain additional notes for ideas, reminders, or extra context.",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-4",
      content: "Create a new project.",
      flag: null,
      note: "Think of a project as something you want to accomplish, like 'Portfolio', 'School', or 'Job Search'.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-5",
      content: "Give your project a meaningful title.",
      flag: null,
      note: "Clear names make it much easier to stay organized later.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-6",
      content: "Add a short overview describing your project.",
      flag: null,
      note: "A sentence or two explaining the goal is usually enough.",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-7",
      content: "Create a task inside your new project.",
      flag: null,
      note: "Tasks represent larger pieces of work that move your project forward.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-8",
      content: "Add a few checklist items.",
      flag: null,
      note: "Items are the smallest unit of work. Keep them specific and actionable.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-9",
      content: "Edit one of the items after creating it.",
      flag: null,
      note: "Most things in Strata are designed to be edited as your work evolves.",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-10",
      content: "Delete this 'Welcome to Strata' project whenever you're ready.",
      flag: null,
      note: "The seed project exists only to help you learn. Your own projects are what matter.",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-11",
      content: "Start building something awesome.",
      flag: null,
      note: "Thanks for trying Strata. Now turn your ideas into organized, actionable work.",
      createdAt: now - day,
      lastModified: now,
    },
  ],
};

export { seedData };
