"use client";

import React from "react";

export function SubtleMotionBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#0A0F1C] select-none">
      {/* 1. Subtle Geometric Grid Pattern (opacity-10) */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

      {/* 2. Slow-Floating Deep Blue Orb (Top Right) */}
      <div className="absolute -top-24 -right-24 w-[650px] h-[650px] rounded-full bg-blue-600/15 blur-[140px] animate-float-slow" />

      {/* 3. Slow-Floating Deep Purple Orb (Bottom Left) */}
      <div className="absolute -bottom-32 -left-32 w-[700px] h-[700px] rounded-full bg-purple-700/15 blur-[150px] animate-float-slow-reverse" />

      {/* 4. Soft Cyan Ambient Pulse (Center Left) */}
      <div className="absolute top-[35%] -left-20 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[130px] animate-float-slow" />

      {/* 5. Vignette Overlay for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0F1C_85%)] opacity-80" />
    </div>
  );
}
