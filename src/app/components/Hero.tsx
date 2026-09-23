"use client";

import React from "react";
import Image from "next/image";
import ban from "@/banner.png";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">

      <div className="relative overflow-hidden bg-[#13151c] border border-gray-800/80 rounded-2xl p-8 sm:p-12 lg:p-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">

        {/* Left Side */}
        <div className="flex-1 max-w-2xl text-left">

          <p className="text-[#ccff00] font-bold tracking-widest text-xs uppercase mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-family: var(--font-oswald) text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05] mb-6">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider uppercase px-6 py-3.5 rounded-lg"
          >
            <span>BROWSE WORKOUTS</span>
            <span>↓</span>
          </a>

        </div>

        {/* Right Side */}
        <div className="flex-1 w-full flex justify-center">

          <Image
            src={ban}
            alt="FitLog workout"
            className="w-full max-w-lg h-auto object-contain"
            priority
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;