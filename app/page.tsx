"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const floatingBadges = [
  { label: "Licensed & Insured", position: "left-6 top-10" },
  { label: "Same-Day Support", position: "right-6 top-16" },
  { label: "Craftsman Verified", position: "left-12 bottom-12" },
];

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <motion.div
        className="absolute left-6 top-6 z-30 sm:left-8 sm:top-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{ scale: 1.03, filter: "drop-shadow(0px 14px 32px rgba(56,189,248,0.35))" }}
      >
        <Image
          src="/LOGO SVG NO BACKGROUND TRANSPARENT.svg"
          alt="Handyman logo"
          width={180}
          height={64}
          priority
          className="h-auto w-[165px] max-w-xs drop-shadow-[0_10px_28px_rgba(56,189,248,0.32)] saturate-125 contrast-110 brightness-110 transition-transform duration-300"
        />
      </motion.div>

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
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(248,113,113,0.16),transparent_42%)]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "ease-out" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          className="mb-10 flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-6 py-3 shadow-lg shadow-sky-500/20 backdrop-blur"
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
          className="max-w-4xl text-4xl font-extrabold leading-tight text-sky-50 sm:text-5xl lg:text-6xl"
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
            className="rounded-full bg-brand-blue px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:shadow-sky-400/40"
          >
            Continue to the site
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/50"
          >
            Jump to the dashboard
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
              <p className="text-sm font-semibold text-sky-100">{item}</p>
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
          className={`absolute z-10 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-50 shadow-lg shadow-black/30 backdrop-blur ${badge.position}`}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
        >
          {badge.label}
        </motion.div>
      ))}

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.5 }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-rose-400/10 blur-3xl"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.55 }}
      />
    </main>
  );
}
