"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface MouseSpotlightProps {
  children?: React.ReactNode;
  className?: string;
}

export function MouseSpotlight({ children, className = "" }: MouseSpotlightProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Dynamic Radial Spotlight Gradient
  const spotlightBackground = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.18), rgba(147, 51, 234, 0.08) 45%, transparent 80%)`;

  // Grid mask to reveal sharp grid overlay only where the spotlight illuminates
  const gridMask = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, black 15%, transparent 75%)`;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* 1. Interactive Mouse Spotlight Glow Layer */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: spotlightBackground,
        }}
      />

      {/* 2. Interactive Revealed Grid Overlay (Visible exclusively under the cursor spotlight) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-70"
        style={{
          maskImage: gridMask,
          WebkitMaskImage: gridMask,
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "3rem 3rem",
        }}
      />

      {/* 3. Children Content Layer */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
