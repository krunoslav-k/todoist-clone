export function formatDueTime(dueDate?: Date) {
  if (!dueDate || (dueDate.getHours() === 0 && dueDate.getMinutes() === 0))
    return "";
  return dueDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
