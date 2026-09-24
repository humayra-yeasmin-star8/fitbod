"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/logo.png";
import { usePlan } from "../context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = usePlan();

  const planCount = plan.length;
  const savedCount = saved.length;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#060608] border-b border-gray-800/60">
      <nav className="max-w-8xl mx-auto px-4 sm:px-3 lg:px-8 h-18 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-2 font-black text-base sm:text-xl tracking-wider text-white"
        >
          <Image
            src={logo}
            alt="FitLog Logo"
            width={20}
            height={20}
            className="w-6 h-5 sm:w-7 sm:h-7"
          />

          <span>FITLOG</span>
        </Link>

        <div className="flex items-center">
          <Link
            href="/"
            className={`px-2 sm:px-4 lg:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              pathname === "/"
                ? "bg-[#202517] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-2 sm:px-4 lg:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              pathname === "/my-plan"
                ? "bg-[#202517] text-[#ccff00]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-gray-300 hover:text-white"
          >
            <span>Plan</span>

            <span className="bg-[#ccff00] text-black font-bold px-1.5 sm:px-2 py-0.5 rounded-full  min-width: 18px min-width: 20px text-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-semibold text-gray-300 hover:text-white"
          >
            <span>Saved</span>

            <span className="border border-gray-600 text-gray-200 font-bold px-1.5 sm:px-2 py-0.5 rounded-full min-width: 18px min-width: 20px  text-center">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;