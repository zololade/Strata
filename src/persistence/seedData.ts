// src/persistence/seedData.ts
const now = Date.now();
const day = 86_400_000;

const seedData = {
  projects: [
    {
      id: "proj-1",
      title: "🌟 Welcome to Strata",
      overview:
        "Strata organizes your work into **Projects → Tasks → Items**. Follow the guided tasks below to learn the workflow. When you're ready, delete this project and start building your own.",
      flag: null,
      createdAt: now - day,
      lastModified: now,
    },
  ],

  tasks: [
    {
      id: "task-1",
      title: "1️⃣ Understand the Workspace",
      overview: "Get familiar with the interface before creating anything.",
      flag: null,
      projectId: "proj-1",
      items: new Set(["item-1", "item-2", "item-3"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-2",
      title: "2️⃣ Create Your First Project",
      overview: "Projects are the highest level of organization in Strata.",
      flag: null,
      projectId: "proj-1",
      items: new Set(["item-4", "item-5", "item-6"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-3",
      title: "3️⃣ Organize Your Work",
      overview: "Break down big goals into manageable tasks and items.",
      flag: null,
      projectId: "proj-1",
      items: new Set(["item-7", "item-8", "item-9"]),
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "task-4",
      title: "4️⃣ You're Ready!",
      overview: "You've seen the basics. The rest is up to you.",
      flag: null,
      projectId: "proj-1",
      items: new Set(["item-10", "item-11"]),
      createdAt: now - day,
      lastModified: now,
    },
  ],

  items: [
    {
      id: "item-1",
      content: "📖 Read the project overview above",
      flag: null,
      note: "Every project starts with a title and a short description. Use this space to set the vision.",
      taskId: "task-1",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-2",
      content: "🔄 Select different tasks from the sidebar",
      flag: null,
      note: "Notice how the content updates as you click between tasks. The sidebar shows all tasks in the current project.",
      taskId: "task-1",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-3",
      content: "💡 Try opening this item's note",
      flag: null,
      note: "Items can have extra notes for ideas, reminders, or context – just click the note icon to expand.",
      taskId: "task-1",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-4",
      content: "➕ Create a new project",
      flag: null,
      note: "Think of a project as a container for a goal – e.g., 'Portfolio', 'School', or 'Job Search'.",
      taskId: "task-2",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-5",
      content: "✏️ Give it a meaningful title",
      flag: null,
      note: "A clear, descriptive title makes it easy to find and organize your projects later.",
      taskId: "task-2",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-6",
      content: "📝 Add a short overview",
      flag: null,
      note: "A sentence or two explaining the purpose of the project is usually enough to keep you focused.",
      taskId: "task-2",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-7",
      content: "➕ Create a task inside your new project",
      flag: null,
      note: "Tasks are the main steps you need to take to complete your project.",
      taskId: "task-3",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-8",
      content: "☑️ Add a few checklist items",
      flag: null,
      note: "Items are the smallest unit of work – keep them specific and actionable (e.g., 'Draft introduction', 'Review final draft').",
      taskId: "task-3",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-9",
      content: "✏️ Edit an item after creating it",
      flag: null,
      note: "Strata is designed for iterative work – you can always refine your items as your project evolves.",
      taskId: "task-3",
      createdAt: now - day,
      lastModified: now,
    },

    {
      id: "item-10",
      content: "🗑️ Delete this 'Welcome to Strata' project when ready",
      flag: null,
      note: "The seed project exists only to help you learn. Your own projects are what truly matter.",
      taskId: "task-4",
      createdAt: now - day,
      lastModified: now,
    },
    {
      id: "item-11",
      content: "🚀 Start building something awesome",
      flag: null,
      note: "Thank you for trying Strata. Now turn your ideas into organized, actionable work.",
      taskId: "task-4",
      createdAt: now - day,
      lastModified: now,
    },
  ],
};

export { seedData };
