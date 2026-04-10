interface AddSectionButtonProps {
  onAddSectionButtonClick: () => void;
}

export default function AddSectionButton({
  onAddSectionButtonClick,
}: AddSectionButtonProps) {
  return (
    <button
      onClick={onAddSectionButtonClick}
      className="w-full mt-2 flex items-center gap-3 cursor-pointer group"
    >
      <hr className="flex-1 border-slate-500 add_section_button_effect" />
      <div className="whitespace-nowrap text-sm font-medium text-slate-600 add_section_button_effect">
        Add section
      </div>
      <hr className="flex-1 border-slate-500 add_section_button_effect" />
    </button>
  );
}
