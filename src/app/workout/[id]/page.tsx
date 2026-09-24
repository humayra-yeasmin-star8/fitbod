import React from "react";
import Image from "next/image";
import { Workout } from "@/types";
import PlanButtons from "@/app/components/PlanButtons";


async function getWorkoutDetail(id: string): Promise<Workout> {
  const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workout details");
  }

  const json = await res.json();
  return json.data || json;
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutDetail(id);

  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-white pt-32 px-8">
        <p>Workout not found.</p>
      </div>
    );
  }


  const specs = [
    { label: "EQUIPMENT", value: workout.equipment || "Barbell, Bench" },
    { label: "DIFFICULTY", value: "Intermediate" },
    { label: "SETS", value: "4" },
    { label: "REPS", value: "6-8" },
    { label: "DURATION", value: `${workout.duration || 25} min` },
    { label: "CALORIES", value: `${workout.calories || 180} kcal` },
    { label: "RATING", value: workout.rating ? workout.rating.toFixed(1) : "4.8" },
  ];


  const instructions = [
    "Lie on the bench with eyes under the bar and feet planted.",
    "Unrack with locked elbows and lower the bar to mid-chest.",
    "Press up in a slight arc until elbows lock without bouncing.",
    "Keep shoulder blades pinched and a natural arch in the back.",
  ];

  return (
    <section className="bg-[#0b0c10] text-white min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          
          <div className="lg:col-span-6 relative aspect-square w-full rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
            {workout.image && (
              <Image
                src={workout.image}
                alt={workout.name || "Workout Image"} fill className="object-cover" priority
              />
            )}
          </div>

  
          <div className="lg:col-span-6 space-y-8">
            
          
            <div className="space-y-3">
              <h1 className="text-white text-4xl sm:text-5xl font-extrabold font-oswald uppercase tracking-tight leading-none">
                {workout.name}
              </h1>
              
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                A compound press that builds chest thickness, triceps, and pressing power from a stable bench.
              </p>

            
              <div className="flex flex-wrap gap-2 pt-2">
                {workout.category && workout.category.length > 0 ? (
                  workout.category.map((cat, index) => (
                    <span
                      key={index}
                      className="bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase px-3.5 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase px-3.5 py-1 rounded-full">
                      CHEST
                    </span>
                    <span className="bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase px-3.5 py-1 rounded-full">
                      ARMS
                    </span>
                  </>
                )}
              </div>
            </div>


            <div className="bg-[#13151c] rounded-2xl border border-gray-800/80 divide-y divide-gray-800/60 overflow-hidden">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center px-6 py-3.5 hover:bg-[#181b24] transition-colors"
                >
                  <span className="text-gray-400 font-bold text-xs tracking-wider uppercase">
                    {spec.label}
                  </span>
                  <span className="text-gray-100 font-semibold text-sm">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

      
            <div className="space-y-4">
              <h3 className="text-white font-bold text-xs tracking-widest uppercase">
                INSTRUCTIONS
              </h3>
              
              <ol className="list-decimal list-outside space-y-3 text-gray-300 text-sm pl-5 leading-relaxed marker:font-semibold marker:text-gray-400">
                {instructions.map((step, index) => (
                  <li key={index} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

           <PlanButtons workout={workout} />

          </div>

        </div>
      </div>
    </section>
  );
}