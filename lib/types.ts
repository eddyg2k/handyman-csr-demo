export type LeadStatus = "New" | "In Progress" | "Completed";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: LeadStatus;
  city: string;
  description: string;
}
