"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { WobbleCard } from "../ui/wobble-card";

export function Features() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          className="p-8 relative"
        >
          <div className="max-w-xs z-10 relative">
            <h2 className="text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-4">
              Boost Your Productivity
            </h2>
            <p className="text-left text-base/6 text-neutral-200">
              Supercharge your workflows with intelligent automation, allowing you to focus on more critical tasks.
            </p>
          </div>
          <Image
            src="/linear.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </WobbleCard>
        <WobbleCard 
          containerClassName="col-span-1 min-h-[300px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          className="p-8"
        >
          <h2 className="max-w-80 text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-4">
            Effortless Task Automation
          </h2>
          <p className="max-w-[26rem] text-left text-base/6 text-neutral-200">
            Automate repetitive web tasks seamlessly, saving time and enhancing efficiency with AI-driven processes.
          </p>
        </WobbleCard>
        <WobbleCard 
          containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
          className="p-8 relative"
        >
          <div className="max-w-sm z-10 relative">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-xl md:text-2xl lg:text-3xl font-semibold tracking-[-0.015em] text-white mb-4">
              Intelligent Workflow Integration
            </h2>
            <p className="max-w-[26rem] text-left text-base/6 text-neutral-200">
              Integrate seamlessly with your existing workflows, optimizing and streamlining complex processes effortlessly.
            </p>
          </div>
          <Image
            src="/linear.webp"
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </WobbleCard>
      </div>
    </div>
  );
}