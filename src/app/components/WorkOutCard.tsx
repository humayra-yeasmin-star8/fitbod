import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types";

const WorkOutCard = ({ workout }: { workout: Workout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="block group"
    >

      <div className="bg-[#13151c] border border-gray-800 rounded-2xl overflow-hidden group-hover:border-[#ccff00]/50 transition-all">

        <div className="relative aspect-video w-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-5 space-y-4">

          <div className="flex flex-wrap gap-2">
            {workout.category?.map((cat, index) => (
              <span
                key={index}
                className="bg-[#202517] text-[#ccff00] font-bold text-[10px] px-2.5 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          <h3 className="text-white font-bold text-lg uppercase group-hover:text-[#ccff00]">
            {workout.name}
          </h3>

          <p className="text-gray-400 text-sm">
            {workout.equipment}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-300">

            <span>🕒 {workout.duration} min</span>

            <span>🔥 {workout.calories} kcal</span>

            <span>⭐ {workout.rating}</span>

          </div>

        </div>

      </div>

    </Link>
  );
};

export default WorkOutCard;