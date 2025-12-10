"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const highlights = [
  {
    title: "Instant job alerts",
    description:
      "See new repair requests the moment they come in so we can schedule your visit without delay.",
    pill: "Live updates",
  },
  {
    title: "Project notes that travel",
    description:
      "Photos, room measurements, and materials stay attached to your request from call to cleanup.",
    pill: "Detailed briefs",
  },
  {
    title: "Neighbors-first scheduling",
    description:
      "We prioritize nearby jobs to arrive on time and finish when we promised.",
    pill: "On-time routes",
  },
];

const storyMoments = [
  {
    label: "01",
    title: "Start with a quick call",
    text: "Tell us what needs fixing and share a couple of photos; we map out the visit right away.",
    metric: "15 min response",
  },
  {
    label: "02",
    title: "See your plan before we arrive",
    text: "We send the checklist, materials, and estimated time so you know exactly what will happen.",
    metric: "Plan confirmed",
  },
  {
    label: "03",
    title: "Leave it cleaner than we found it",
    text: "From drywall dust to yard debris, we tidy up and walk through the finished work with you.",
    metric: "5-star follow-ups",
  },
];

const craftsmanshipShots = [
  {
    src: "/handyman-toolkit.svg",
    alt: "Handyman assembling a tool kit",
    badge: "Tool prep",
    title: "Arrive ready",
    description: "Fresh blades, charged batteries, and tidy totes mean we start repairs the moment we step inside.",
  },
  {
    src: "/handyman-crew.svg",
    alt: "Handyman crew reviewing a work order",
    badge: "On-site clarity",
    title: "Align the crew",
    description: "Photo-rich briefs keep every tech on the same page so your project moves smoothly from start to finish.",
  },
];

export default function Experience() {
  const services = [
    "General Repairs",
    "Carpentry",
    "Drywall",
    "Electrical",
    "Plumbing",
    "Exterior Repairs",
  ];

  const [selectedService, setSelectedService] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image src="/PICTURE 1.svg" alt="Handyman tools collage" fill className="object-cover" priority sizes="100vw" />
        <Image
          src="/PICTURE 2 CLEANING.svg"
          alt="Handyman cleaning scene"
          fill
          sizes="100vw"
          className="object-cover opacity-50 mix-blend-overlay"
        />
        <Image
          src="/PICTURE 3 HANDYMAN.svg"
          alt="Handyman crew illustration"
          fill
          sizes="100vw"
          className="object-cover opacity-45 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-900/80 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(248,113,113,0.14),transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 sm:px-8 lg:px-10">
        <section className="min-h-[60vh] rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur">
          <div className="mb-8 flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/10 px-5 py-3 shadow-lg shadow-sky-500/20 backdrop-blur">
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
                Southlake home repairs
              </p>
            </div>
            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
              Same-day and scheduled visits
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-sky-200 ring-1 ring-white/10">
                <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                Licensed · Insured · Local
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-sky-50 sm:text-5xl lg:text-6xl">
                FULL-SERVICE HANDYMAN CARE FROM FIRST CALL TO FINAL WALKTHROUGH
              </h1>
              <p className="max-w-2xl text-lg text-slate-100/90">
                Friendly faces, tidy workmanship, and clear updates at every step. We handle repairs, touch-ups, and upgrades with the same pride we take in our own homes.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  className="rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5 hover:shadow-sky-400/40"
                  href="/dashboard"
                >
                  View your project dashboard
                </Link>
                <a
                  className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/50"
                  href="#scroll-story"
                >
                  Explore our process
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 -z-10 blur-3xl" aria-hidden>
                <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-sky-500/30" />
                <div className="absolute bottom-5 right-8 h-32 w-32 rounded-full bg-rose-500/20" />
              </div>
              <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/20 backdrop-blur">
                <div className="mb-4 flex items-center justify-between text-sm text-slate-200">
                  <span className="font-semibold">Today</span>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Service timeline
                  </span>
                </div>
                <div className="space-y-4">
                  {highlights.map((item) => (
                    <article
                      key={item.title}
                      className="reveal rounded-xl border border-white/10 bg-slate-900/70 p-4 shadow-sm shadow-black/20"
                    >
                      <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-sky-200">
                        <span className="size-2 rounded-full bg-sky-400" aria-hidden />
                        {item.pill}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-4 py-3 text-sm text-slate-200">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-sky-200">From booking to cleanup</p>
                    <p className="text-lg font-semibold text-white">Track every step while we handle the tools</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white">Scroll ↓</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Home repair menu</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose the work, we’ll handle the rest</h2>
              <p className="mt-3 max-w-3xl text-lg text-slate-200">
                Select the repairs you need and we’ll prepare materials, schedule a visit, and keep you updated until it is done.
              </p>
            </div>
            <div className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
              Quick add · Friendly follow-up
            </div>
          </div>

          <div className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map((service) => (
              <button
                key={service}
                className="rounded-xl border border-white/15 bg-slate-900/70 p-4 text-left text-sm font-semibold text-slate-100 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            ))}
          </div>

          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <div className="w-full max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/95 p-6 text-center text-slate-900 shadow-2xl shadow-black/30">
                <h2 className="text-xl font-semibold">Add details for {selectedService}</h2>
                <p className="text-sm text-slate-600">Share the room, timeframe, or photo so we can bring the right tools and parts.</p>
                <button
                  className="w-full rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:-translate-y-0.5"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </section>

        <header
          id="scroll-story"
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">How we work</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Clear steps from first hello to finished job</h2>
            <p className="text-lg text-slate-300">
              We keep communication open and expectations clear, sharing updates as the visit moves from inspection to repair to final cleanup.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg shadow-black/25 backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                Service steps
              </div>
              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">Live</div>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-3">
              {storyMoments.map((moment, index) => (
                <div
                  key={moment.title}
                  className="reveal rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/20"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <p className="text-sm font-semibold text-sky-200">{moment.label}</p>
                  <h3 className="mt-2 text-xl font-bold text-white">{moment.title}</h3>
                  <p className="mt-3 text-slate-300">{moment.text}</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
                    <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                    {moment.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="reveal space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Handyman visuals</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">See the crew that treats your home like their own</h2>
              <p className="mt-3 max-w-3xl text-lg text-slate-300">
                From prepping tools to reviewing your work order, every step is handled with care so you can relax knowing the right fixes are on the way.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
              Updated with recent projects
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {craftsmanshipShots.map((shot, index) => (
              <div
                key={shot.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/80"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" aria-hidden />
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1024}
                  height={768}
                  className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                  priority={index === 0}
                />
                <div className="absolute bottom-4 left-4 right-4 space-y-2 rounded-xl bg-slate-900/70 p-4 shadow-lg shadow-black/30 backdrop-blur">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                    <span className="size-2 rounded-full bg-sky-400" aria-hidden />
                    {shot.badge}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{shot.title}</h3>
                  <p className="text-sm text-slate-200">{shot.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-slate-900/80 p-10 shadow-2xl shadow-black/30">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">For homeowners and property managers</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Trusted handyman crew, transparent timelines</h2>
              <p className="text-lg text-slate-200">
                Get a warm welcome, clear pricing, and progress you can follow. We keep checklists close so nothing is missed and every visit ends with a walkthrough.
              </p>
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-400" aria-hidden />
                  Consistent crew communication from booking to checkout.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-sky-400" aria-hidden />
                  Service reminders and ETAs sent before we arrive.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-amber-400" aria-hidden />
                  Respectful pros who clean up and double-check the work.
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-rose-500/10" aria-hidden />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Service milestones</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">Live</span>
                </div>
                <div className="space-y-3">
                  {["Confirm appointment", "Arrive prepared", "Review and wrap up"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/80">
                        <span className="absolute inset-0 bg-white/5" aria-hidden />
                        <span className="text-base font-semibold text-sky-100">0{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item}</p>
                        <p className="text-xs text-slate-300">Exactly what to expect at each phase.</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  Follow each milestone from greeting to goodbye. We keep you oriented while the team gets the work done.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center shadow-lg shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ready to go</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Book your handyman visit today</h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            Tell us what you need fixed, see your timeline, and enjoy a clean, finished result with updates along the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
              href="/dashboard"
            >
              Open your project dashboard
            </Link>
            <a
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
              href="#"
            >
              Share with your household
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
