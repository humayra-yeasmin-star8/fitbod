"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/app/context/PlanContext";
import { Workout } from "@/types";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    toggleSaved,
    toggleComplete,
  } = usePlan();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  const [sortBy, setSortBy] = useState<
    "duration" | "calories" | "name"
  >("duration");

  const getCalories = (workout: Workout): number => {
  if (!workout) return 0;

  const data = workout as Workout & {
    calories?: number | string;
    caloriesBurned?: number | string;
    calories_burned?: number | string;
    kcal?: number | string;
    calories_per_min?: number | string;
  };

  const rawVal =
    data.calories ??
    data.caloriesBurned ??
    data.calories_burned ??
    data.kcal ??
    data.calories_per_min;

  const calories = Number(rawVal);

  if (!isNaN(calories) && calories > 0) {
    return calories;
  }

  const duration = Number(workout.duration) || 15;

  return duration * 8;
};

const stats = useMemo(() => {
  const currentItems =
    activeTab === "plan"
      ? plan.map((item) => item.workout)
      : saved;

  const totalExercises = currentItems.length;

  const totalMinutes = currentItems.reduce(
    (acc, workout) =>
      acc + (Number(workout.duration) || 15),
    0
  );

  const totalCalories = currentItems.reduce(
    (acc, workout) =>
      acc + getCalories(workout),
    0
  );

  return {
    totalExercises,
    totalMinutes,
    totalCalories,
  };
}, [plan, saved, activeTab]);

  const activeItems =
    activeTab === "plan"
      ? plan.map((item) => item.workout)
      : saved;

  const sortedItems = useMemo(() => {
    return [...activeItems].sort((a, b) => {
      if (sortBy === "duration") {
        return (
          (Number(b.duration) || 0) -
          (Number(a.duration) || 0)
        );
      }

      if (sortBy === "calories") {
        return getCalories(b) - getCalories(a);
      }

      return (a.name || "").localeCompare(
        b.name || ""
      );
    });
  }, [activeItems, sortBy]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            MY PLAN
          </h1>

          <p className="text-gray-400 text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

         <div className="bg-[#13151c] border border-gray-800/80 rounded-2xl p-6 md:p-8 grid grid-cols-3 gap-4">

          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Exercises
            </p>

            <p className="text-4xl md:text-5xl font-black text-[#ccff00] mt-1">
              {stats.totalExercises}
            </p>
          </div>

          <div className="border-l border-gray-800/80 pl-4 md:pl-8">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Minutes
            </p>

            <p className="text-4xl md:text-5xl font-black text-white mt-1">
              {stats.totalMinutes}
            </p>
          </div>

          <div className="border-l border-gray-800/80 pl-4 md:pl-8">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Calories
            </p>

            <p className="text-4xl md:text-5xl font-black text-white mt-1">
              {stats.totalCalories}
            </p>
          </div>

        </div>

  
        <div className="flex justify-between items-center pt-2">

          <div className="bg-[#13151c] p-1 rounded-xl border border-gray-800 flex gap-1">

            <button
              onClick={() => setActiveTab("plan")}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "plan"
                  ? "bg-[#1f242d] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === "saved"
                  ? "bg-[#1f242d] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex items-center gap-2 text-xs">

            <span className="text-gray-400 font-semibold">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as
                    | "duration"
                    | "calories"
                    | "name"
                )
              }
              className="bg-[#13151c] border border-gray-800 text-white font-bold text-xs rounded-xl px-3 py-2 outline-none focus:border-[#ccff00] cursor-pointer"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="name">
                Name
              </option>
            </select>

          </div>
        </div>

        {sortedItems.length === 0 ? (

          <div className="border border-dashed border-gray-800/90 rounded-2xl p-16 text-center space-y-4 bg-[#0d0e13]/50">

            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
              NOTHING HERE YET
            </h2>

            <p className="text-gray-400 text-xs md:text-sm max-w-sm mx-auto">
              Browse the library and add a lift to get today moving.
            </p>

            <div>
              <Link
                href="/"
                className="inline-block bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#bde800] transition-colors"
              >
                Go to workouts
              </Link>
            </div>

          </div>

        ) : (

          <div className="flex flex-col gap-4">

            {sortedItems.map((workout) => {

              const workoutId = String(workout.id);

              const calories = getCalories(workout);

              const planItem = plan.find(
                (item) =>
                  String(item.workout.id) === workoutId
              );

              const isCompleted =
                activeTab === "plan"
                  ? planItem?.completed || false
                  : false;

              return (
                <div
                  key={workout.id}
                  className={`bg-[#13151c] border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                    isCompleted
                      ? "opacity-50"
                      : ""
                  }`}
                >


                  <div className="flex items-center gap-4 w-full sm:w-auto">

                    {workout.image && (
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-800">

                        <Image
                          src={workout.image}
                          alt={workout.name || "Workout"}
                          fill
                          className="object-cover"
                        />

                      </div>
                    )}

                    <div className="space-y-1">

                      <h3 className="font-extrabold text-base md:text-lg text-white uppercase tracking-tight">
                        {workout.name}
                      </h3>

                      <p className="text-gray-400 text-xs">
                        {workout.equipment || "Bodyweight"}
                      </p>

                      <div className="flex items-center gap-3 text-xs font-semibold text-gray-300 pt-1">

                        <span>
                          ⏱ {workout.duration || 15} min
                        </span>

                        <span>
                          🔥 {calories} kcal
                        </span>

                        {workout.rating && (
                          <span className="text-yellow-400">
                            ⭐{" "}
                            {Number(workout.rating).toFixed(1)}
                          </span>
                        )}

                      </div>

                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-gray-800/80 pt-3 sm:pt-0">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="px-4 py-2 rounded-full border border-gray-700/80 text-gray-300 hover:text-white hover:border-gray-500 font-bold text-xs transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() =>
                          toggleComplete(workout.id)
                        }
                        className={`px-5 py-2 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                          isCompleted
                            ? "bg-gray-800 text-gray-400"
                            : "bg-[#ccff00] text-black hover:bg-[#bde800]"
                        }`}
                      >
                        <span>✓</span>

                        <span>
                          {isCompleted
                            ? "Done"
                            : "Mark as Done"}
                        </span>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(workout.id)
                          : toggleSaved(workout)
                      }
                      className="p-2 text-gray-500 hover:text-red-400 text-lg font-bold transition-colors"
                      title={
                        activeTab === "plan"
                          ? "Remove from plan"
                          : "Remove from saved"
                      }
                    >
                      ✕
                    </button>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}