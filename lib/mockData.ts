import type { Lead } from "@/lib/types";

export const leads: Lead[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "+1 (817) 555-0123",
    status: "New",
    city: "Southlake",
    description: "Leaky faucet in kitchen",
  },
  {
    id: "2",
    name: "Mary Johnson",
    phone: "+1 (817) 555-0456",
    status: "In Progress",
    city: "Keller",
    description: "Door frame repair and painting",
  },
  {
    id: "3",
    name: "Carlos Ramirez",
    phone: "+1 (682) 555-0789",
    status: "Completed",
    city: "Plano",
    description: "Outdoor light fixture replacement",
  },
];
