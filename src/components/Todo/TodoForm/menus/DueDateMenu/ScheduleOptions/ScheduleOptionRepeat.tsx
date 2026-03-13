import { format } from "date-fns";

interface ScheduleOptionRepeatProps {
  selectedDate: Date | undefined;
}

type RepeatOption = {
  id: string;
  label: string;
  getSecondaryLabel?: (date: Date | undefined) => string;
};

export default function ScheduleOptionRepeat({
  selectedDate,
}: ScheduleOptionRepeatProps) {
  const repeatOptions: RepeatOption[] = [
    {
      id: "daily",
      label: "Every day",
    },
    {
      id: "weekly",
      label: "Every week",
      getSecondaryLabel: (selectedDate) =>
        selectedDate
          ? `on ${format(selectedDate, "EEEE")}`
          : `on ${format(new Date(), "EEEE")}`,
    },
    {
      id: "workdaily",
      label: "Every weekday",
      getSecondaryLabel: () => "(Mon-Fri)",
    },
    {
      id: "monthly",
      label: "Every month",
      getSecondaryLabel: (selectedDate) =>
        selectedDate
          ? `on the ${format(selectedDate, "do")}`
          : `on the ${format(new Date(), "do")}`,
    },
    {
      id: "yearly",
      label: "Every year",
      getSecondaryLabel: (selectedDate) =>
        selectedDate
          ? `on ${format(selectedDate, "MMMM do")}`
          : `on ${format(new Date(), "MMMM do")}`,
    },
    {
      id: "custom",
      label: "Custom...",
    },
  ];

  return (
    <ul className="w-70 p-1.75 bg-white border border-gray-200 rounded-md shadow-md absolute z-20 bottom-10 left-3 text-sm">
      {repeatOptions.map((option) => {
        return (
          <li
            key={option.id}
            className="px-6 py-1.75 rounded-md hover:bg-gray-100"
          >
            {option.label}{" "}
            {option.getSecondaryLabel && (
              <span className="text-gray-500">
                {option.getSecondaryLabel(selectedDate)}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
