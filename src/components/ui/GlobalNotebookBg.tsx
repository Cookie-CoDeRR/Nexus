"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Configuration: Each orb has its own position, size, color, timing, and drift path ---
const orbs = [
  {
    id: "orb-blue-tr",
    className: "bg-blue-600/18",
    size: "w-[720px] h-[720px]",
    position: "-top-28 -right-28",
    blur: "blur-[160px]",
    yRange: [0, -18, 0],
    xRange: [0, 8, 0],
    rotateDeg: [0, 6, 0],
    duration: 14,
    delay: 0,
  },
  {
    id: "orb-purple-bl",
    className: "bg-purple-700/16",
    size: "w-[760px] h-[760px]",
    position: "-bottom-36 -left-36",
    blur: "blur-[170px]",
    yRange: [0, 16, 0],
    xRange: [0, -10, 0],
    rotateDeg: [0, -8, 0],
    duration: 18,
    delay: 2,
  },
  {
    id: "orb-cyan-ml",
    className: "bg-cyan-500/12",
    size: "w-[500px] h-[500px]",
    position: "top-[30%] -left-16",
    blur: "blur-[140px]",
    yRange: [0, -12, 4, 0],
    xRange: [0, 6, 0],
    rotateDeg: [0, 4, 0],
    duration: 16,
    delay: 4,
  },
  {
    id: "orb-indigo-tc",
    className: "bg-indigo-500/10",
    size: "w-[440px] h-[440px]",
    position: "-top-20 left-[40%]",
    blur: "blur-[130px]",
    yRange: [0, -10, 2, 0],
    xRange: [0, -4, 0],
    rotateDeg: [0, -3, 0],
    duration: 20,
    delay: 6,
  },
  {
    id: "orb-rose-br",
    className: "bg-rose-600/8",
    size: "w-[380px] h-[380px]",
    position: "bottom-[20%] -right-10",
    blur: "blur-[120px]",
    yRange: [0, 10, -4, 0],
    xRange: [0, -6, 0],
    rotateDeg: [0, 5, 0],
    duration: 22,
    delay: 3,
  },
];

// --- Floating Card Silhouettes: Faint translucent "data card" shapes that slowly drift ---
const cardSilhouettes = [
  {
    id: "card-1",
    style: { top: "12%", left: "6%", width: 180, height: 100 },
    yRange: [0, -14, 0],
    rotateDeg: [-2, 2, -2],
    duration: 17,
    delay: 0,
    opacity: 0.035,
  },
  {
    id: "card-2",
    style: { top: "22%", right: "8%", width: 220, height: 120 },
    yRange: [0, 12, 0],
    rotateDeg: [1, -3, 1],
    duration: 21,
    delay: 5,
    opacity: 0.03,
  },
  {
    id: "card-3",
    style: { top: "55%", left: "12%", width: 160, height: 90 },
    yRange: [0, -10, 4, 0],
    rotateDeg: [2, -1, 2],
    duration: 19,
    delay: 2,
    opacity: 0.025,
  },
  {
    id: "card-4",
    style: { bottom: "20%", right: "14%", width: 200, height: 110 },
    yRange: [0, 8, -4, 0],
    rotateDeg: [-1, 3, -1],
    duration: 23,
    delay: 8,
    opacity: 0.03,
  },
  {
    id: "card-5",
    style: { top: "42%", right: "3%", width: 140, height: 80 },
    yRange: [0, -8, 0],
    rotateDeg: [0, -2, 0],
    duration: 15,
    delay: 10,
    opacity: 0.025,
  },
  {
    id: "card-6",
    style: { bottom: "12%", left: "4%", width: 190, height: 105 },
    yRange: [0, 10, -2, 0],
    rotateDeg: [1, -2, 1],
    duration: 20,
    delay: 7,
    opacity: 0.02,
  },
];

// Tiny floating metric dots — subtle data-point particles
const particles = Array.from({ length: 20 }, (_, i) => ({
  id: `particle-${i}`,
  top: `${Math.round(5 + ((i * 37 + 11) % 88))}%`,
  left: `${Math.round(3 + ((i * 53 + 7) % 93))}%`,
  size: 1 + (i % 3),
  duration: 12 + (i % 10),
  delay: (i * 1.3) % 8,
  yRange: [0, -(8 + (i % 10)), 0] as number[],
  color:
    i % 3 === 0
      ? "bg-blue-400/30"
      : i % 3 === 1
      ? "bg-indigo-400/25"
      : "bg-cyan-400/20",
}));

export function GlobalNotebookBg() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* Base Background Fill */}
      <div className="absolute inset-0 bg-[#0A0F1C]" />

      {/* Geometric Grid Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.032) 1px,transparent 1px), linear-gradient(to bottom,rgba(255,255,255,0.032) 1px,transparent 1px)",
          backgroundSize: "3.5rem 3.5rem",
        }}
      />

      {/* Diagonal Accent Lines */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(99,102,241,0.6) 0, rgba(99,102,241,0.6) 1px, transparent 0, transparent 50%)",
          backgroundSize: "3.5rem 3.5rem",
        }}
      />

      {/* Breathing Glow Orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full ${orb.size} ${orb.position} ${orb.className} ${orb.blur}`}
          animate={{
            y: orb.yRange,
            x: orb.xRange,
            rotate: orb.rotateDeg,
            scale: [1, 1.04, 0.97, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: orb.delay,
            times:
              orb.yRange.length === 4
                ? [0, 0.35, 0.65, 1]
                : [0, 0.5, 1],
          }}
        />
      ))}

      {/* Floating Card Silhouettes */}
      {cardSilhouettes.map((card) => (
        <motion.div
          key={card.id}
          className="absolute rounded-xl border border-white/[0.05] bg-white/[0.02]"
          style={{
            ...card.style,
            opacity: card.opacity,
          }}
          animate={{
            y: card.yRange,
            rotate: card.rotateDeg,
          }}
          transition={{
            duration: card.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: card.delay,
            times:
              card.yRange.length === 4 ? [0, 0.3, 0.7, 1] : [0, 0.5, 1],
          }}
        >
          {/* Card inner data bar accent lines */}
          <div className="absolute top-3 left-4 right-4 h-[2px] rounded-full bg-blue-400/20" />
          <div className="absolute top-7 left-4 w-16 h-[2px] rounded-full bg-white/10" />
          <div className="absolute bottom-4 left-4 right-6 h-[2px] rounded-full bg-indigo-400/15" />
        </motion.div>
      ))}

      {/* Micro Data Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          animate={{ y: p.yRange, opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Center Radial Depth Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(10,15,28,0.5) 80%, rgba(10,15,28,0.95) 100%)",
        }}
      />

      {/* Edge Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 0%, rgba(10,15,28,0.6) 70%, rgba(10,15,28,0.9) 100%)",
        }}
      />
    </div>
  );
}
