import { differenceInCalendarDays, isToday, isTomorrow } from "date-fns";
import { format } from "date-fns";

export function dueDateHelper(dueDate: Date | undefined): {
  label: string;
  category: "today" | "tomorrow" | "weekday" | "future";
} {
  const today = new Date();

  if (dueDate === undefined) return { label: "", category: "future" };
  else if (isToday(dueDate)) return { label: "Today", category: "today" };
  else if (isTomorrow(dueDate))
    return { label: "Tomorrow", category: "tomorrow" };
  else {
    const daysDiff = differenceInCalendarDays(dueDate, today);
    if (daysDiff >= 2 && daysDiff <= 7) {
      const dayName = format(dueDate, "EEEE");
      return { label: dayName, category: "weekday" };
    }
  }
  return { label: format(dueDate, "d LLL"), category: "future" };
}
