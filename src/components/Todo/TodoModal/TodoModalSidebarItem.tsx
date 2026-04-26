import { Star, type LucideIcon } from "lucide-react";
import Divider from "../../Divider";

interface TodoModalSidebarItemProps {
  label: string | null;
  buttonText: string | React.ReactNode;
  hasStar: boolean;
  Icon: LucideIcon;
  iconClasses: string;
}

export default function TodoModalSidebarItem({
  label,
  buttonText,
  hasStar,
  Icon,
  iconClasses,
  ...props
}: TodoModalSidebarItemProps) {
  return (
    <>
      {label && <p className="mb-2 font-medium text-gray-600">{label}</p>}

      <button
        {...props}
        className={`flex justify-between items-center w-full px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 group ${label ? "font-light" : "font-medium text-gray-600"}`}
      >
        <div className="flex justify-start items-center gap-1.5 w-full">
          {buttonText}
          {hasStar && <Star size={12} strokeWidth="4" color="#ee8100" />}
        </div>
        <Icon strokeWidth={1} size={18} className={iconClasses} />
      </button>

      <Divider />
    </>
  );
}
