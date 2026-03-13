import { Check, X } from "lucide-react";

interface PremiumFeatureModalProps {
  handleCloseButtonClick: () => void;
}

export default function PremiumFeatureModal({
  handleCloseButtonClick,
}: PremiumFeatureModalProps) {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.4)]">
      <div className="w-lg p-8 bg-white rounded-xl relative">
        <div className="h-20 w-ful -mx-8 -mt-8 bg-linear-to-b from-[#fffaf3] to-white rounded-xl"></div>
        <button
          onClick={handleCloseButtonClick}
          className="p-1 absolute top-5 right-5 rounded-md cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition ease-in-out"
        >
          <X strokeWidth={1} className="text-gray-500" />
        </button>
        <h2 className="text-xl font-bold mb-1.5">Unlock task durations</h2>
        <p className="text-gray-500 text-sm mb-3.5">
          With Pro, you can add a duration to your tasks so you can plan your
          day better.
        </p>
        <h3 className="text-gray-600 font-semibold mb-3.5">
          Get more with the Pro plan
        </h3>
        <ul className="mb-5 text-sm text-gray-400 flex flex-wrap ">
          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> 300 projects
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> Unlimited
            Ramble sessions
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> Custom
            reminders & task deadlines
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> Calendar
            layouts & time-blocking
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> 150 filter
            views
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> Unlimited
            activity history
          </li>

          <li className="w-1/2 p-1 flex items-center gap-1">
            <Check strokeWidth={1.25} size={16} color="#369309" /> Todoist
            Assist tools
          </li>
        </ul>
        <button className="add_button w-full">Upgrade to Pro</button>
      </div>
    </div>
  );
}
