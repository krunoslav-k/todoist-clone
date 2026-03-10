export default interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
}

export type Priority = 1 | 2 | 3 | 4;
