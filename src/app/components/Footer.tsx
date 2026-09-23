"use client";

import React from "react";
import Image from "next/image";
import logo from "@/logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-[#13151c] mt-auto">

      <div className="max-w-7xl mx-auto px-2 md:px-2 py-5 ">

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-gray-500">
          <div className="flex items-center gap-2">

            <Image
              src={logo}
              alt=""
              width={25}
              height={25}
              className="w-5 h-5 -rotate-45 cursor-pointer"
            />

            <span className="text-white font-bold text-lg uppercase tracking-wider">
              FITLOG
            </span>

          </div>
          <p className="text-sm md:text-right cursor-pointer">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;