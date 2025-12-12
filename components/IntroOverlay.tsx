"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, type MotionStyle } from "framer-motion";

interface IntroOverlayProps {
  visible: boolean;
}

const floatingBadges = [
  { label: "Licensed & Insured", position: "left-8 top-10" },
  { label: "Same-Day Support", position: "right-8 top-16" },
  { label: "Craftsman Verified", position: "left-14 bottom-14" },
];

export function IntroOverlay({ visible }: IntroOverlayProps) {
  const [canUnmount, setCanUnmount] = useState(false);

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => setCanUnmount(true), 600);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [visible]);

  if (!visible && canUnmount) return null;

  const animateState: MotionStyle = visible
    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
    : { opacity: 0, scale: 0.98, filter: "blur(6px)", pointerEvents: "none" as const };

  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950 text-white"
      initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
      animate={animateState}
      transition={{ duration: 0.7, ease: "ease-out" }}
      aria-label="Cinematic intro"
      aria-hidden={!visible}
    >
      <div className="absolute inset-0">
        <Image
          src="/picture of handyman and houses for a background.svg"
          alt="Handyman and houses background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/85" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(246,195,67,0.16),transparent_40%),radial-gradient(circle_at_82%_28%,rgba(255,209,102,0.14),transparent_38%)]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "ease-out" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
        <motion.div
          className="mb-8 flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-3 shadow-lg shadow-amber-400/20 backdrop-blur"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-white/90 p-1">
            <Image
              src="/handyman logo no background.png"
              alt="Handyman logo"
              fill
              sizes="48px"
              className="object-contain"
              priority
            />
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-100">
            Welcome to your #1 trusted team
          </p>
        </motion.div>

        <motion.h1
          className="max-w-4xl text-4xl font-extrabold leading-tight text-amber-50 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          WELCOME TO YOUR #1 TRUSTED HANDYMAN SERVICES IN SOUTHLAKE.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg text-slate-100/90 sm:text-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          Expert repairs, polished finishes, and prompt communication—every visit starts with a warm hello and ends with a home
          you are proud of.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <span className="rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-amber-300/40 transition">
            Entering experience...
          </span>
          <span className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-slate-100/90">
            Southlake proud · 5 second intro
          </span>
        </motion.div>

        <motion.div
          className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
        >
          {["Same-day scheduling", "Polished craftsmanship", "Respectful, on-time crews"].map((item) => (
            <motion.div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left shadow-lg shadow-black/20 backdrop-blur"
              whileHover={{ transform: "translateY(-6px)", backgroundColor: "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-semibold text-amber-100">{item}</p>
              <p className="mt-2 text-sm text-slate-100/90">
                Every detail is handled with care so your home feels refreshed from the first knock.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none">
        {floatingBadges.map((badge, index) => (
          <motion.div
            key={badge.label}
            className={`absolute z-10 rounded-full border border-amber-200/60 bg-white/10 px-4 py-2 text-xs font-semibold text-amber-50 shadow-lg shadow-amber-300/20 backdrop-blur ${badge.position}`}
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          >
            {badge.label}
          </motion.div>
        ))}
        <motion.div
          className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
        />
        <motion.div
          className="absolute -right-12 bottom-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
        />
      </div>
    </motion.section>
  );
}
