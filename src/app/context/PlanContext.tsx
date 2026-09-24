"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Workout } from "@/types";

export interface PlanItem {
  workout: Workout;
  completed: boolean;
}

interface PlanContextType {
  plan: PlanItem[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: string | number) => void;
  toggleComplete: (id: string | number) => void;
  toggleSaved: (workout: Workout) => void;
  toastMessage: string | null;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [plan, setPlan] = useState<PlanItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedPlan = localStorage.getItem("fitlog_plan");

    return savedPlan ? JSON.parse(savedPlan) : [];
  });

  const [saved, setSaved] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const savedWorkouts = localStorage.getItem("fitlog_saved");

    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved]);

  const showToast = (msg: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToastMessage(msg);

    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToPlan = (workout: Workout) => {
    if (plan.length >= 5) {
      showToast("Cap of 5 lifts reached! Finish them before adding more.");
      return;
    }

    if (
      plan.some(
        (item) => String(item.workout.id) === String(workout.id)
      )
    ) {
      showToast(`${workout.name} is already in today's plan!`);
      return;
    }

    setPlan((prev) => [
      ...prev,
      {
        workout,
        completed: false,
      },
    ]);

    showToast(`Added ${workout.name} to today's plan!`);
  };

  const removeFromPlan = (id: string | number) => {
    const item = plan.find(
      (p) => String(p.workout.id) === String(id)
    );

    setPlan((prev) =>
      prev.filter(
        (p) => String(p.workout.id) !== String(id)
      )
    );

    if (item) {
      showToast(`Removed ${item.workout.name} from plan.`);
    }
  };

  const toggleComplete = (id: string | number) => {
    setPlan((prev) =>
      prev.map((item) => {
        if (String(item.workout.id) === String(id)) {
          const nextState = !item.completed;

          showToast(
            nextState
              ? `Marked ${item.workout.name} as Done!`
              : `Unmarked ${item.workout.name}.`
          );

          return {
            ...item,
            completed: nextState,
          };
        }

        return item;
      })
    );
  };

  const toggleSaved = (workout: Workout) => {
    const exists = saved.some(
      (s) => String(s.id) === String(workout.id)
    );

    if (exists) {
      setSaved((prev) =>
        prev.filter(
          (s) => String(s.id) !== String(workout.id)
        )
      );

      showToast(`Removed ${workout.name} from saved.`);
    } else {
      setSaved((prev) => [...prev, workout]);

      showToast(`Saved ${workout.name} for later!`);
    }
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        removeFromPlan,
        toggleComplete,
        toggleSaved,
        toastMessage,
      }}
    >
      {children}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#ccff00] text-black font-extrabold text-sm px-5 py-3 rounded-xl shadow-2xl transition-all duration-300 pointer-events-none">
          {toastMessage}
        </div>
      )}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error(
      "usePlan must be used within a PlanProvider"
    );
  }

  return context;
};