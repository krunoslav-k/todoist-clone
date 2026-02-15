import type Todo from "../types/todo";

export const dummyData: Todo[] = [
  {
    id: 1,
    title: "Naučiti react",
    description: "Pogledati nekoliko tutoriala na Youtube-u",
    completed: false,
  },
  {
    id: 2,
    title: "Proučiti typescript",
    description: "Pregledati stare projekte i dodati im tipove",
    completed: false,
  },
  {
    id: 3,
    title: "Gledati seriju",
    description: "Pogledati sve epizode do kraja sezone",
    completed: true,
  },
];
