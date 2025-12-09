"use client";

import { useState } from "react";

const services = [
  "General Repairs",
  "Carpentry",
  "Drywall",
  "Electrical",
  "Plumbing",
  "Exterior Repairs",
];

export default function ServiceMenuPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl">Service Menu</h1>
      <div className="grid grid-cols-1 gap-4 w-full max-w-2xl sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <button
            key={service}
            className="border p-4"
            onClick={() => setSelectedService(service)}
          >
            {service}
          </button>
        ))}
      </div>

      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20">
          <div className="bg-white p-6 w-full max-w-md space-y-4 text-center">
            <h2 className="text-xl">Add Details for {selectedService}</h2>
            <button className="border px-4 py-2" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
