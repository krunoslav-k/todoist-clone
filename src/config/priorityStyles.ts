import type { Priority } from "../types/todo";

export type PriorityStyle = {
  color: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  border: string;
  strokeWidth: number;
};

export const priorityStyles: Record<Priority, PriorityStyle> = {
  1: {
    color: "text-[#d1453c]",
    backgroundColor: "bg-[#fcecec]",
    hoverBackgroundColor: "hover:bg-[#f8dbd8]",
    border: "border-2 border-[#d1453c]",
    strokeWidth: 3,
  },
  2: {
    color: "text-[#eb890b]",
    backgroundColor: "bg-[#fef4ea]",
    hoverBackgroundColor: "hover:bg-[#fbe7d5]",
    border: "border-2 border-[#eb890b]",
    strokeWidth: 3,
  },
  3: {
    color: "text-[#2570e0]",
    backgroundColor: "bg-[#eaf0fc]",
    hoverBackgroundColor: "hover:bg-[#d6e2f9]",
    border: "border-2 border-[#2570e0]",
    strokeWidth: 3,
  },
  4: {
    color: "text-gray-500",
    backgroundColor: "bg-white",
    hoverBackgroundColor: "hover:bg-white",
    border: "border border-gray-500",
    strokeWidth: 2.5,
  },
};
