"use client";

import React from "react";
import Image from "next/image";
import ban from "@/banner.png";

const Hero = () => {
  return (
    <section className="max-w-8=9xl pt-12 pb-6 px-5 md:px-9">

<div className="relative overflow-hidden bg-[#13151c] border border-gray-800/80 rounded-2xl p-5 sm:p-8 lg:p-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-6">

        <div className="flex-1 max-w-5xl text-left">

          <p className="text-[#ccff00] font-bold tracking-widest text-xs uppercase mb-4">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-oswald text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.05] mb-4">
             TRAIN WITH INTENT. LOG <br />
             EVERY SET.
            </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href=""
            className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs tracking-wider uppercase px-5 py-4 rounded-lg"
          >
            <span>BROWSE WORKOUTS</span>
          
          </a>

        </div>
        <div className="relative w-full aspect-square max-w-xs sm:max-w-sm">

          <Image src={ban} alt="" className="w-full h-full object-contain" 
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;