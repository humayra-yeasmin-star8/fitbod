import React from "react";
import WorkOutCard from "./WorkOutCard";
import { Workout } from "@/types";

async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch library data");
  }

  const data = await res.json();

  return data;
}

const Library = async () => {
  const workouts = await getWorkouts();

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      <div className="mb-12">

        <h2 className="font-oswald text-4xl font-extrabold text-white uppercase">
          THE LIBRARY
        </h2>

        <p className="text-gray-400 text-lg">
          Twelve lifts covering every major muscle group.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {workouts.map((workout: Workout) => (
          <WorkOutCard
            key={workout.id}
            workout={workout}
          />
        ))}

      </div>

    </section>
  );
};

export default Library;