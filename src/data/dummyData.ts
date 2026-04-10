import type Todo from "../types/todo";

export const dummyData: Todo[] = [
  {
    id: 1,
    title: "Naučiti react",
    description: "Pogledati nekoliko tutoriala na Youtube-u",
    completed: false,
    priority: 4,
    hasReminder: false,
  },
  {
    id: 2,
    title: "Proučiti typescript",
    description: "Pregledati stare projekte i dodati im tipove",
    completed: false,
    dueDate: new Date("04.28.2026"),
    priority: 2,
    hasReminder: true,
  },
  {
    id: 3,
    title: "Gledati seriju",
    description: "Pogledati sve epizode do kraja sezone",
    completed: true,
    priority: 4,
    hasReminder: false,
    labels: ["chill", "fun"],
  },
  {
    id: 4,
    title: "Izmisli nešto",
    description: "",
    completed: false,
    priority: 4,
    hasReminder: false,
    projectId: "errands",
  },
  {
    id: 5,
    title: "Moram testirati sekcije",
    description: "samo da vidim radi li",
    completed: false,
    priority: 3,
    hasReminder: false,
    sectionId: "once",
  },
];
