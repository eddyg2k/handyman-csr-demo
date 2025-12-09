"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const highlights = [
  {
    title: "Real-time lead radar",
    description:
      "Keep every homeowner request visible with a live stream of prioritized leads, notes, and quick actions.",
    pill: "Live dashboard",
  },
  {
    title: "One-scroll storytelling",
    description:
      "Drift through the narrative instead of paging around. Content slides into view as you move down the hero.",
    pill: "Scrolling reveals",
  },
  {
    title: "Field-to-office clarity",
    description:
      "Stay aligned with techs in the field using tidy summaries, checklists, and tidy next steps.",
    pill: "Operations ready",
  },
];

const storyMoments = [
  {
    label: "01",
    title: "See today at a glance",
    text: "A fixed hero keeps your anchors close while cards glide upward as you scroll.",
    metric: "12 new leads",
  },
  {
    label: "02",
    title: "Tap a lead, open the story",
    text: "Notes, photos, and schedules pop into focus so you can respond without hunting for context.",
    metric: "3 urgent callbacks",
  },
  {
    label: "03",
    title: "Hand off with confidence",
    text: "Send technicians crystal-clear work orders with timelines and customer expectations baked in.",
    metric: "7 jobs routed",
  },
];

const craftsmanshipShots = [
  {
    src: "/handyman-toolkit.svg",
    alt: "Handyman assembling a tool kit",
    badge: "Tool prep",
    title: "Arrive ready",
    description: "Fresh blades, charged batteries, and tidy totes keep CSRs confident when dispatching calls.",
  },
  {
    src: "/handyman-crew.svg",
    alt: "Handyman crew reviewing a work order",
    badge: "On-site clarity",
    title: "Align the crew",
    description: "Photo-rich briefs make it obvious who’s doing what, reducing back-and-forth while on the job.",
  },
];

export default function Home() {
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_35%),radial-gradient(circle_at_30%_40%,_rgba(239,68,68,0.12),_transparent_35%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 sm:px-8 lg:px-10">
        <header className="grid min-h-[70vh] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-sky-200 ring-1 ring-white/10">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
              Fixed hero, scroll-triggered reveals
            </p>
            <h1 className="text-4xl font-bold leading-tight text-sky-100 sm:text-5xl lg:text-6xl">
              The most effortless handyman landing story
            </h1>
            <p className="max-w-2xl text-lg text-slate-300">
              A single, grounded hero that stays put while new context fades in as you scroll. Perfect for CSR teams that want
              clarity without clicky navigation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
                href="/dashboard"
              >
                Jump into the dashboard
              </Link>
              <a
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
                href="#scroll-story"
              >
                See how it flows
              </a>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 blur-3xl" aria-hidden>
              <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-sky-500/30" />
              <div className="absolute bottom-5 right-8 h-32 w-32 rounded-full bg-rose-500/20" />
            </div>
            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-sm text-slate-200">
                <span className="font-semibold">Today</span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-200">
                  Live updates
                </span>
              </div>
              <div className="space-y-4">
                {highlights.map((item) => (
                  <article
                    key={item.title}
                    className="reveal rounded-xl border border-white/10 bg-slate-900/80 p-4 shadow-sm shadow-black/20"
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
                  <p className="text-xs uppercase tracking-wide text-sky-200">Momentum</p>
                  <p className="text-lg font-semibold text-white">Stay anchored while the story unfolds</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white">Scroll ↓</div>
              </div>
            </div>
          </div>
        </header>

        <section id="scroll-story" className="space-y-12">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Scroll to reveal</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Content that arrives as you move</h2>
            <p className="text-lg text-slate-300">
              New sections glide upward as you drift down the page—no jarring jumps or page reloads. It keeps prospects focused
              on the narrative while showing CSR teams exactly what matters.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {storyMoments.map((moment, index) => (
              <div
                key={moment.title}
                className="reveal rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
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
        </section>

        <section className="reveal space-y-8 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Handyman visuals</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Ground the story with real craft</h2>
              <p className="mt-3 max-w-3xl text-lg text-slate-300">
                Add visual proof that your team is organized, prepared, and communicating clearly. These shots pair with the
                scrolling copy to show homeowners the calm, capable crew behind the phone call.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
              <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
              Updated with fresh handyman scenes
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">For CSRs and dispatch</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Landing page vibes, dashboard focus</h2>
              <p className="text-lg text-slate-200">
                Give visitors a cinematic first impression while keeping your operations view close by. The hero acts like a
                command center; the scrolled content fills in the story without stealing attention.
              </p>
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-emerald-400" aria-hidden />
                  Smooth fade-and-rise motion tied to scroll position.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-sky-400" aria-hidden />
                  Fixed hero card that keeps CTAs visible.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-amber-400" aria-hidden />
                  Clean Tailwind styling—no extra libraries needed.
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-rose-500/10" aria-hidden />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Scroll reveal timeline</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">Live</span>
                </div>
                <div className="space-y-3">
                  {["Hero anchor", "Reveal cards", "CTA steady"].map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-900/80">
                        <span className="absolute inset-0 bg-white/5" aria-hidden />
                        <span className="text-base font-semibold text-sky-100">0{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{item}</p>
                        <p className="text-xs text-slate-300">Synced to your scrolling rhythm.</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  Keep the hero fixed visually while narrative blocks animate into place. Visitors stay oriented; the story keeps
                  flowing.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-10 text-center shadow-lg shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ready to go</p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Launch the dashboard-powered landing story</h2>
          <p className="mx-auto max-w-3xl text-lg text-slate-300">
            Keep your hero anchored, let the details appear as prospects explore, and give CSRs instant access to the dashboard
            when they are ready to act.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              className="rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
              href="/dashboard"
            >
              Open the CSR dashboard
            </Link>
            <a
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
              href="#"
            >
              Share with your team
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
