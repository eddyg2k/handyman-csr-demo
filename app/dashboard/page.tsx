"use client";

import LeadCard from "@/components/LeadCard";
import { leads } from "@/lib/mockData";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Dashboard() {
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id ?? "");

  const activeLead = useMemo(
    () => leads.find((lead) => lead.id === selectedLeadId) ?? leads[0],
    [selectedLeadId]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Handyman of Southlake</p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Service hub</h1>
            <p className="text-gray-400">
              Job snapshot, documents, communications, and active requests populated from guided intake.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-amber-200/40 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-100 shadow-lg shadow-amber-300/15">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-white/90 p-1">
                <Image src="/Official Logo of HOSL.svg" alt="HOSL crest" fill className="object-contain" sizes="36px" />
              </div>
              Brand
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">Live</span>
              <span>Mock data synced</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-black/25">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Job snapshot</p>
                  <h2 className="text-2xl font-semibold text-white">{activeLead?.service ?? "Service intake"}</h2>
                </div>
                <select
                  value={selectedLeadId}
                  onChange={(e) => setSelectedLeadId(e.target.value)}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white"
                >
                  {leads.map((lead) => (
                    <option key={lead.id} value={lead.id} className="bg-slate-900 text-white">
                      {lead.name} · {lead.city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Client</p>
                  <p className="text-lg font-semibold">{activeLead?.name}</p>
                  <p className="text-sm text-slate-300">{activeLead?.phone}</p>
                  <p className="text-sm text-slate-300">{activeLead?.city}</p>
                  <p className="text-xs text-slate-400">Notifications: {activeLead?.notificationEmail}</p>
                </div>
                <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Visit details</p>
                  <p className="text-sm text-slate-100">{activeLead?.description}</p>
                  <p className="text-sm text-slate-100">
                    {activeLead?.service} {activeLead?.serviceDetail ? `· ${activeLead.serviceDetail}` : ""}
                  </p>
                  <p className="text-sm text-slate-100">{activeLead?.scheduleWindow}</p>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                    Status: {activeLead?.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Documents</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-100">Synced</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-100">
                  {activeLead?.documents?.map((doc) => (
                    <li key={doc} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="size-2 rounded-full bg-brand-blue" aria-hidden />
                      {doc}
                    </li>
                  ))}
                  {!activeLead?.documents?.length && <li className="text-slate-400">No documents shared yet.</li>}
                </ul>
              </div>

              <div className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Communications</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-100">Timeline</span>
                </div>
                <ul className="space-y-2 text-sm text-slate-100">
                  {activeLead?.communications?.map((update) => (
                    <li key={update} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="mt-1 size-2 rounded-full bg-emerald-400" aria-hidden />
                      {update}
                    </li>
                  ))}
                  {!activeLead?.communications?.length && <li className="text-slate-400">No updates yet.</li>}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Active requests</p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-100">From intake</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-100">
                {activeLead?.activeRequests?.map((request) => (
                  <li key={request} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="mt-1 size-2 rounded-full bg-amber-400" aria-hidden />
                    {request}
                  </li>
                ))}
                {!activeLead?.activeRequests?.length && <li className="text-slate-400">No active requests.</li>}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-200">Intake feed</p>
              <p className="mt-1 text-sm text-slate-200">Preview of captured leads</p>
              <div className="mt-3 grid gap-3">
                {leads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`text-left transition hover:-translate-y-0.5 ${
                      lead.id === activeLead?.id ? "ring-2 ring-brand-blue" : ""
                    }`}
                  >
                    <LeadCard lead={lead} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
