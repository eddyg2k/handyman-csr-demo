"use client";

import LeadCard from "@/components/LeadCard";
import { leads } from "@/lib/mockData";

export default function Dashboard() {
  const primaryLead = leads[0];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <header className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Client service interface</p>
          <h1 className="text-3xl font-bold text-brand-blue">Handyman of Southlake · Service Hub</h1>
          <p className="text-gray-200 mt-2 max-w-3xl">
            This dashboard is dynamically populated after your call or chat finishes. It stitches together everything captured in
            the tracking form: services requested, contact preferences, scheduling outcomes, invoices, and uploads.
          </p>
        </div>
        <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
          Live profile draft
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Job snapshot</p>
              <h2 className="text-2xl font-semibold">{primaryLead?.name ?? "Client name pending"}</h2>
              <p className="text-sm text-slate-200">
                Estimate window: {primaryLead?.scheduledAt ?? "To be scheduled"} · Communication: text + email alerts · CRM sync
                ready
              </p>
            </div>
            <div className="rounded-full bg-emerald-400/20 px-4 py-2 text-xs font-semibold text-emerald-100">Tracking live</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Service</p>
              <p className="mt-1 text-lg font-semibold text-white">{primaryLead?.service ?? "Selected during intake"}</p>
              <p className="text-sm text-slate-200">Crew focus, address, and uploaded photos are pinned for the field team.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Documents</p>
              <p className="mt-1 text-lg font-semibold text-white">Estimates + invoices</p>
              <p className="text-sm text-slate-200">We send every update via email and keep the files here for quick download.</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Communications</p>
            <p className="mt-1 text-sm text-slate-200">
              Chat transcripts, call outcomes, and scheduling confirmations flow into this log so you have instant access to the
              full conversation history.
            </p>
            <div className="mt-3 space-y-2 text-sm text-slate-100">
              <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2">
                <span>Notification email</span>
                <span className="text-sky-200">updates@yourdomain.com</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-900/70 px-3 py-2">
                <span>Phone preference</span>
                <span className="text-sky-200">Text + call backup</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Active requests</p>
          <div className="grid gap-3">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
          <p className="text-xs text-slate-300">
            Each card updates automatically from the tracking form and GHL workflow once a call or chat session completes.
          </p>
        </section>
      </div>
    </div>
  );
}
