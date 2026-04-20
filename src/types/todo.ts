export default interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: Date;
  priority: Priority;
  hasReminder: boolean;
  labels?: string[];
  comments?: string[];

  projectId?: string | null;
  sectionId?: string | null;
}

export type Priority = 1 | 2 | 3 | 4;
