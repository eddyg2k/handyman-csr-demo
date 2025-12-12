import type { Lead } from "@/lib/types";

interface LeadCardProps {
  lead: Lead;
}

export default function LeadCard({ lead }: LeadCardProps) {
  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-brand-gold transition">
      <div className="flex justify-between items-center mb-1">
        <p className="text-xl font-semibold">{lead.name}</p>
        <span
          className={`text-xs px-2 py-1 rounded ${
            lead.status === "Completed"
              ? "bg-green-500/20 text-green-400"
              : lead.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {lead.status}
        </span>
      </div>
      <p className="text-gray-400">{lead.phone}</p>
      <p className="text-sm text-gray-500">{lead.city}</p>
      <p className="mt-2 text-gray-300">{lead.description}</p>
      <div className="mt-3 space-y-1 text-sm text-gray-200">
        {lead.service && (
          <p>
            <span className="font-semibold text-brand-gold">Service:</span> {lead.service}
            {lead.serviceDetail ? ` · ${lead.serviceDetail}` : ""}
          </p>
        )}
        {lead.scheduleWindow && (
          <p>
            <span className="font-semibold text-brand-gold">Schedule:</span> {lead.scheduleWindow}
          </p>
        )}
        {lead.notificationEmail && (
          <p className="text-xs text-slate-300">Notifications: {lead.notificationEmail}</p>
        )}
      </div>
    </div>
  );
}
