"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const floatingBadges = [
  { label: "Licensed & Insured", position: "left-6 top-10" },
  { label: "Same-Day Support", position: "right-6 top-16" },
  { label: "Craftsman Verified", position: "left-12 bottom-12" },
];

export default function Intro() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src="/picture of handyman and houses for a background.svg"
          alt="Handyman and houses background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/80" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(246,195,67,0.18),transparent_40%),radial-gradient(circle_at_78%_30%,rgba(255,209,102,0.14),transparent_44%)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "ease-out" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          className="mb-10 flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-3 shadow-lg shadow-amber-400/20 backdrop-blur"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
        >
          WELCOME TO YOUR #1 TRUSTED HANDYMAN SERVICES IN SOUTHLAKE.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg text-slate-100/90 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          Expert repairs, polished finishes, and prompt communication—every visit starts with a warm hello and ends with a home
          you are proud of.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          <Link
            href="/experience"
            className="rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl shadow-amber-300/40 transition hover:-translate-y-0.5 hover:shadow-amber-200/50"
          >
            Enter the experience
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/50"
          >
            View dashboard
          </Link>
        </motion.div>

        <motion.div
          className="mt-14 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
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

      {floatingBadges.map((badge, index) => (
        <motion.div
          key={badge.label}
          className={`absolute z-10 rounded-full border border-amber-200/60 bg-white/10 px-4 py-2 text-xs font-semibold text-amber-50 shadow-lg shadow-amber-300/20 backdrop-blur ${badge.position}`}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        >
          {badge.label}
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.55 }}
      />

      <motion.div
        className="absolute right-6 top-12 z-10 flex flex-col items-center gap-2 rounded-2xl border border-amber-200/50 bg-slate-900/80 px-3 py-2 shadow-xl shadow-amber-300/15 backdrop-blur"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white/90 p-2">
          <Image src="/Official Logo of HOSL.svg" alt="Handyman of Southlake crest" fill className="object-contain" sizes="64px" />
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-100">Brand standard</p>
      </motion.div>
    </main>
  );
}
