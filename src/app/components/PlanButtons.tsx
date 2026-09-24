"use client";

import { Workout } from "@/types";
import { usePlan } from "@/app/context/PlanContext";

const PlanButtons = ({ workout }: { workout: Workout }) => {
  const { addToPlan, toggleSaved } = usePlan();

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-4">
      <button
        onClick={() => addToPlan(workout)}
        className="flex-1 flex items-center justify-center gap-2.5 bg-[#ccff00] text-black px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#bde800] transition-colors cursor-pointer"
      >
       
        Add to today&apos;s plan
      </button>

      <button
        onClick={() => toggleSaved(workout)}
        className="flex-1 flex items-center justify-center gap-2.5 bg-[#13151c] border border-gray-800 text-gray-300 px-7 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-[#202517] hover:border-[#ccff00]/50 transition-colors cursor-pointer"
      >
       
        Save for later
      </button>
    </div>
  );
};

export default PlanButtons;