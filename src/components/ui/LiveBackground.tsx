"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PriceData {
  [key: string]: {
    price: number;
    status: "up" | "down" | "neutral";
    timestamp: number;
  };
}

export function LiveBackground() {
  const [prices, setPrices] = useState<PriceData>({
    bitcoin: { price: 68420.5, status: "neutral", timestamp: Date.now() },
    ethereum: { price: 3512.8, status: "neutral", timestamp: Date.now() },
    solana: { price: 184.2, status: "neutral", timestamp: Date.now() },
    cardano: { price: 0.54, status: "neutral", timestamp: Date.now() },
  });

  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 500);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 300);

  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // WebSocket Live Stream
  useEffect(() => {
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(
        "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana,cardano"
      );

      ws.onmessage = (msg) => {
        try {
          const data = JSON.parse(msg.data);
          setPrices((prev) => {
            const updated = { ...prev };
            for (const [asset, priceStr] of Object.entries(data)) {
              const newPrice = parseFloat(priceStr as string);
              if (!isNaN(newPrice)) {
                const prevPrice = prev[asset]?.price || newPrice;
                const status = newPrice > prevPrice ? "up" : newPrice < prevPrice ? "down" : "neutral";
                updated[asset] = {
                  price: newPrice,
                  status,
                  timestamp: Date.now(),
                };
              }
            }
            return updated;
          });
        } catch (e) {
          // Ignore parse errors
        }
      };

      ws.onerror = () => {
        // Fallback simulation if WebSocket is restricted by network
      };
    } catch (e) {
      // Ignore connection errors
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Track mouse coordinates on window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate an array of repeated data cells for the command center grid
  const assetKeys = ["bitcoin", "ethereum", "solana", "cardano"];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden bg-[#050811] z-0">
      {/* 1. Underlying Raw Telemetry Grid */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-3 p-4 opacity-35 font-mono text-[11px] select-none">
        {Array.from({ length: 96 }).map((_, i) => {
          const assetName = assetKeys[i % assetKeys.length];
          const data = prices[assetName] || { price: 0, status: "neutral" };
          const formattedPrice = data.price > 10 ? data.price.toFixed(2) : data.price.toFixed(4);

          return (
            <div
              key={i}
              className={`p-2 rounded border border-white/5 bg-white/[0.02] flex flex-col justify-between transition-colors duration-500 ${
                data.status === "up"
                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                  : data.status === "down"
                  ? "text-rose-400 bg-rose-500/10 border-rose-500/30"
                  : "text-gray-500"
              }`}
            >
              <div className="flex justify-between text-[9px] uppercase tracking-wider text-gray-500">
                <span>{assetName.slice(0, 3)}</span>
                <span>#{i + 1}</span>
              </div>
              <div className="text-xs font-bold font-mono tracking-tight mt-1">
                {formattedPrice}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Frosted Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-[#050811]/75" />

      {/* 3. Mouse Reactive Radial Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(650px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.08) 40%, transparent 75%)`,
        }}
      />

      {/* Dynamic Cursor Light Orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-60"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(147,51,234,0.2) 50%, transparent 70%)",
        }}
      />

      {/* Subtle Vignette & Top Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050811_80%)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </div>
  );
}
