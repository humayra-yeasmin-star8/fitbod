"use client";

import { PlanProvider } from "../context/PlanContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <PlanProvider>{children}</PlanProvider>;
};

export default Providers;