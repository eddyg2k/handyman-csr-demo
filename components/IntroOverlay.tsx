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

const overlayBrandMark = { position: "right-10 bottom-12", size: "h-20 w-20" };

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
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(246,195,67,0.18),transparent_40%),radial-gradient(circle_at_82%_30%,rgba(56,189,248,0.12),transparent_40%),radial-gradient(circle_at_18%_78%,rgba(255,231,163,0.12),transparent_42%)]"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "ease-out" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-14 text-center">
        <motion.div
          className="mb-8 flex items-center gap-4 rounded-full border border-brand-gold/40 bg-white/10 px-6 py-3 shadow-lg shadow-amber-400/25 backdrop-blur"
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
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Welcome to your #1 trusted team
          </p>
        </motion.div>

        <motion.h1
          className="max-w-4xl text-4xl font-extrabold leading-tight text-amber-50 sm:text-5xl lg:text-6xl drop-shadow-[0_10px_25px_rgba(246,195,67,0.3)]"
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
          <span className="rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-amber-400/30 transition">
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
              className="rounded-2xl border border-brand-gold/20 bg-white/10 p-4 text-left shadow-lg shadow-amber-500/10 backdrop-blur"
              whileHover={{ transform: "translateY(-6px)", backgroundColor: "rgba(255,255,255,0.14)" }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-sm font-semibold text-brand-gold">{item}</p>
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
            className={`absolute z-10 rounded-full border border-brand-gold/30 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-amber-500/20 backdrop-blur ${badge.position}`}
            initial={{ opacity: 0, y: -12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
          >
            {badge.label}
          </motion.div>
        ))}
        <motion.div
          className="absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
        />
        <motion.div
          className="absolute -right-12 bottom-10 h-64 w-64 rounded-full bg-amber-200/10 blur-3xl"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
        />
        <motion.div
          className={`pointer-events-none absolute ${overlayBrandMark.position} rounded-2xl border border-brand-gold/40 bg-brand-night/70 p-3 shadow-lg shadow-amber-500/10 backdrop-blur`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          <div className={`relative ${overlayBrandMark.size} overflow-hidden`}>
            <Image
              src="/Official Logo of HOSL.svg"
              alt="Handyman of Southlake master logo"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
