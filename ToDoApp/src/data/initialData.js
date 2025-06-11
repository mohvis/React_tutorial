// src/data/initialData.js
export const initialData = {
  columns: {
    backlog: {
      title: "Backlog",
      tasks: [
        { id: "0", title: "Gather Requirements" },
      ],
    },
    todo: {
      title: "To Do",
      tasks: [
        { id: "1", title: "Design wireframes" },
      ],
    },
    inprogress: {
      title: "In Progress",
      tasks: [],
    },
    inreview: {
      title: "In Review",
      tasks: [],
    },
    done: {
      title: "Done",
      tasks: [],
    },
  },
};
