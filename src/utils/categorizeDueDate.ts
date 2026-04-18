import { differenceInCalendarDays, isToday, isTomorrow } from "date-fns";
import { format } from "date-fns";

export function categorizeDueDate(dueDate: Date | undefined): {
  label: string;
  category: "today" | "tomorrow" | "weekday" | "future";
} {
  const today = new Date();

  if (!dueDate) return { label: "", category: "future" };

  const hasTime = dueDate.getHours() !== 0 || dueDate.getMinutes() !== 0;

  const timeLabel = hasTime ? ` ${format(dueDate, "H:mm")}` : "";

  if (isToday(dueDate)) {
    return { label: `Today${timeLabel}`, category: "today" };
  }

  if (isTomorrow(dueDate)) {
    return { label: `Tomorrow${timeLabel}`, category: "tomorrow" };
  }

  const daysDiff = differenceInCalendarDays(dueDate, today);

  if (daysDiff >= 2 && daysDiff <= 7) {
    const dayName = format(dueDate, "EEEE");
    return { label: `${dayName}${timeLabel}`, category: "weekday" };
  }

  return {
    label: `${format(dueDate, "d LLL")}${timeLabel}`,
    category: "future",
  };
}
