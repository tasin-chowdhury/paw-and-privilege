"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [0, 1], [10, -10]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), spring);
  const scale = useSpring(1, spring);
  const shadowOpacity = useSpring(0.12, spring);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    scale.set(1.03);
    shadowOpacity.set(0.28);
  }

  function handleMouseLeave() {
    px.set(0.5);
    py.set(0.5);
    scale.set(1);
    shadowOpacity.set(0.12);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className={cn("h-full", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          boxShadow: useTransform(
            shadowOpacity,
            (v) => `0 ${20 + v * 40}px ${40 + v * 60}px -20px rgba(11,11,12,${v})`
          ),
        }}
        className="h-full rounded-2xl will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
