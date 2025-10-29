"use client";

import LeadCard from "@/components/LeadCard";
import { leads } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-brand-blue">
        Handyman CSR Dashboard (Demo)
      </h1>

      <p className="text-gray-400 mb-8">
        Prototype version — displaying mock leads for testing.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
