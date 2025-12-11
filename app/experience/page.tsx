"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Service = {
  name: string;
  description: string;
  options: string[];
};

type TrackingState = {
  service?: string;
  serviceDetail?: string;
  crewFocus?: string;
  address?: string;
  name?: string;
  email?: string;
  notificationEmail?: string;
  phone?: string;
  contactPreference?: "text" | "phone";
};

const serviceMenu: Service[] = [
  {
    name: "General Repairs",
    description: "Quick fixes, touch-ups, and punch list support for busy households.",
    options: ["Door & hinge tune-ups", "Drywall and paint blending", "Fixture refresh"],
  },
  {
    name: "Carpentry",
    description: "Trim, shelves, and built-ins crafted to match your home.",
    options: ["Floating shelves", "Trim + casing repair", "Closet build-outs"],
  },
  {
    name: "Outdoor Upkeep",
    description: "Exterior touch-ups that keep curb appeal high and water out.",
    options: ["Deck and fence fixes", "Pressure wash + seal", "Gutter refresh"],
  },
];

const crewProfiles = [
  {
    name: "Jacqueline · Lead Tech",
    focus: "Electrical-safe repairs and clean finishes",
    badge: "10+ years",
  },
  { name: "Marco · Carpenter", focus: "Custom trim and tidy installs", badge: "Detail-first" },
  { name: "Sam · Project Ops", focus: "Scheduling and client updates", badge: "On-time" },
];

const addressSuggestions = [
  "1500 Main St, Southlake, TX",
  "2105 Kimball Ave, Southlake, TX",
  "275 Commerce St, Southlake, TX",
  "400 Miron Dr, Southlake, TX",
];

const milestoneSteps = [
  { title: "First hello", detail: "Share photos + notes; we log them instantly.", status: "Start" },
  { title: "Site visit", detail: "Crew arrives with the tools listed in your plan.", status: "Book" },
  { title: "Estimate", detail: "Transparent pricing and material needs in your inbox.", status: "Review" },
  { title: "Timeline", detail: "We schedule, stage parts, and confirm arrival windows.", status: "Prep" },
  { title: "Completion", detail: "Walkthrough, cleanup, and proof-of-work photos.", status: "Finish" },
];

const workShowcase = [
  {
    src: "/handyman-toolkit.svg",
    alt: "Handyman prepping tools for a visit",
    caption: "Entryway trim refresh and fixture install",
  },
];

export default function Experience() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceOption, setServiceOption] = useState<string>("");
  const [tracking, setTracking] = useState<TrackingState>({});
  const [activity, setActivity] = useState<string[]>([]);
  const [addressInput, setAddressInput] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState(addressSuggestions);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState(1);
  const sectionRefs = useMemo(() => Array.from({ length: 7 }, () => ({ current: null as HTMLDivElement | null })), []);

  const appendActivity = (entry: string) => {
    setActivity((prev) => [...prev, entry]);
  };

  const scrollToSection = (index: number) => {
    const target = sectionRefs[index]?.current;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const unlockNextSection = (nextVisibleCount: number) => {
    setVisibleSections((prev) => {
      const updated = Math.max(prev, nextVisibleCount);
      if (updated !== prev) {
        setTimeout(() => scrollToSection(updated - 1), 200);
      }
      return updated;
    });
  };

  const closeModal = () => {
    setSelectedService(null);
    setServiceOption("");
  };

  const handleServiceConfirm = () => {
    if (!selectedService) return;
    const detail = serviceOption || selectedService.options[0];
    setTracking((prev) => ({ ...prev, service: selectedService.name, serviceDetail: detail }));
    appendActivity(`Service added: ${selectedService.name} (${detail}).`);
    unlockNextSection(2);
    closeModal();
  };

  const handleCrewSelect = (crewFocus: string) => {
    setTracking((prev) => ({ ...prev, crewFocus }));
    appendActivity(`Crew preference saved: ${crewFocus}.`);
    unlockNextSection(3);
  };

  const handleAddressInput = (value: string) => {
    setAddressInput(value);
    const matches = addressSuggestions.filter((address) =>
      address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAddresses(matches.length ? matches : addressSuggestions);
  };

  const handleAddressCommit = (value: string) => {
    setTracking((prev) => ({ ...prev, address: value }));
    setAddressInput(value);
    appendActivity(`Address matched: ${value}.`);
    unlockNextSection(4);
  };

  const handleNameUpdate = (value: string) => {
    setTracking((prev) => ({ ...prev, name: value }));
    if (value) {
      appendActivity(`Contact name captured: ${value}.`);
      unlockNextSection(5);
    }
  };

  const handleContactSave = (email: string, phone: string) => {
    setTracking((prev) => ({ ...prev, email, phone }));
    appendActivity("Contact details saved for scheduling.");
  };

  const handleNotificationEmail = (email: string) => {
    setTracking((prev) => ({ ...prev, notificationEmail: email, email: prev.email ?? email }));
    appendActivity("Notification email added for estimates and invoices.");
    unlockNextSection(6);
  };

  const handleWidgetLaunch = () => {
    if (!tracking.phone || !tracking.contactPreference) return;
    setChatOpen(true);
    appendActivity(
      `Scheduling widget triggered via ${tracking.contactPreference === "text" ? "text" : "phone"} with ${tracking.phone}.`
    );
    unlockNextSection(7);
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

  const selectionSummary = useMemo(
    () => [
      { label: "Service", value: tracking.service ? `${tracking.service} · ${tracking.serviceDetail}` : "Choose from the menu" },
      { label: "Crew", value: tracking.crewFocus || "Select a crew focus" },
      { label: "Address", value: tracking.address || "Add your Southlake address" },
      { label: "Name", value: tracking.name || "Who should we greet?" },
      {
        label: "Notifications",
        value: tracking.notificationEmail
          ? `Tracking emails to ${tracking.notificationEmail}`
          : "Add email for estimates + invoices",
      },
      {
        label: "Contact",
        value:
          tracking.email || tracking.phone
            ? `${tracking.email ?? tracking.notificationEmail ?? ""} ${tracking.phone ?? ""}`.trim()
            : "Email + phone",
      },
      {
        label: "Widget",
        value: tracking.contactPreference ? `Reach out via ${tracking.contactPreference}` : "Choose chat or call",
      },
    ],
    [tracking]
  );

  const mapSrc =
    "https://www.openstreetmap.org/export/embed.html?bbox=-97.2000%2C32.8800%2C-97.0600%2C33.0100&layer=mapnik&marker=32.9412%2C-97.1342";

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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <section className="reveal rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Start here</p>
                  <h1 className="text-4xl font-extrabold leading-tight text-sky-50 sm:text-5xl">
                    Build your handyman visit in seven guided steps
                  </h1>
                  <p className="mt-3 max-w-3xl text-lg text-slate-100/90">
                    Move through each section like a form: pick your service, meet the crew, add your address, and share contact
                    details. We will track everything live so your dashboard is ready when you finish.
                  </p>
                </div>
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-sky-500/30 transition hover:-translate-y-0.5"
                  href="/dashboard"
                >
                  Open draft dashboard
                </Link>
              </div>
            </section>

            <section
              ref={(el) => (sectionRefs[0].current = el)}
              className="reveal space-y-6 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/25 backdrop-blur"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">1 · Service menu</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose what we will tackle</h2>
                  <p className="text-lg text-slate-200">
                    Tap a service to open quick options. We will save the one you pick to your plan so the crew arrives with the
                    right tools.
                  </p>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                  Add to plan
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {serviceMenu.map((service) => (
                  <button
                    key={service.name}
                    className="rounded-2xl border border-white/15 bg-slate-900/70 p-5 text-left shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/15"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                      <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                      Trackable
                    </div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <p className="mt-2 text-sm text-slate-200">{service.description}</p>
                  </button>
                ))}
              </div>

              {selectedService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <div className="w-full max-w-xl space-y-5 rounded-2xl border border-white/10 bg-white/95 p-6 text-slate-900 shadow-2xl shadow-black/30">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Add to your plan</p>
                        <h2 className="text-xl font-semibold text-slate-900">{selectedService.name}</h2>
                        <p className="text-sm text-slate-600">{selectedService.description}</p>
                      </div>
                      <button onClick={closeModal} className="text-sm font-semibold text-slate-500 transition hover:text-slate-800">
                        Close
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {selectedService.options.map((option) => (
                        <label
                          key={option}
                          className={`cursor-pointer rounded-xl border p-4 text-sm font-semibold shadow-sm transition ${
                            serviceOption === option ? "border-brand-blue bg-sky-50 text-slate-900" : "border-slate-200 bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service-option"
                            value={option}
                            className="sr-only"
                            onChange={(e) => setServiceOption(e.target.value)}
                            checked={serviceOption === option}
                          />
                          {option}
                        </label>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3">
                      <button
                        className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="rounded-full bg-brand-blue px-6 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:-translate-y-0.5"
                        onClick={handleServiceConfirm}
                      >
                        Save selection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {visibleSections >= 2 && (
              <section
                ref={(el) => (sectionRefs[1].current = el)}
                className="reveal rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-black/30"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">2 · Meet the crew</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Certified, local, and ready</h2>
                  <p className="text-lg text-slate-300">
                    Preview who is coming to your home. Choose the focus that fits your request and we will pin that crew to your
                    project plan.
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
                  Trustworthy professionals
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {crewProfiles.map((profile) => (
                  <div key={profile.name} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100">
                      <span className="size-2 rounded-full bg-emerald-400" aria-hidden />
                      {profile.badge}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{profile.name}</h3>
                    <p className="mt-2 text-sm text-slate-200">{profile.focus}</p>
                    <button
                      className="mt-4 w-full rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:-translate-y-0.5"
                      onClick={() => handleCrewSelect(profile.focus)}
                    >
                      Add crew focus
                    </button>
                  </div>
                ))}
              </div>
            </section>
            )}

            {visibleSections >= 3 && (
              <section
                ref={(el) => (sectionRefs[2].current = el)}
                className="reveal grid gap-6 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/30 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
              >
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">3 · Service address</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Center on Southlake and confirm your address</h2>
                <p className="text-lg text-slate-200">
                  Use our quick matcher to keep the map aligned. As soon as you select an address, it is logged to your tracker
                  and shared with the crew.
                </p>

                <label className="block text-sm font-semibold text-slate-100">Search address</label>
                <input
                  value={addressInput}
                  onChange={(e) => handleAddressInput(e.target.value)}
                  list="address-list"
                  placeholder="Start typing Southlake..."
                  className="mt-2 w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                />
                <datalist id="address-list">
                  {filteredAddresses.map((address) => (
                    <option key={address} value={address} />
                  ))}
                </datalist>
                <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                  {filteredAddresses.map((address) => (
                    <button
                      key={address}
                      onClick={() => handleAddressCommit(address)}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:-translate-y-0.5 hover:border-white/40"
                    >
                      {address}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/30">
                <iframe title="Southlake map" src={mapSrc} className="h-[360px] w-full" loading="lazy" />
                <div className="bg-slate-900/80 p-4 text-sm text-slate-200">
                  Mapped to Southlake, TX · Adjusting the address recenters the crew route and updates your dashboard.
                </div>
              </div>
            </section>
            )}

            {visibleSections >= 4 && (
              <section
                ref={(el) => (sectionRefs[3].current = el)}
                className="reveal rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/30"
              >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">4 · About us</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Meet the team behind the tools</h2>
                  <p className="text-lg text-slate-300">
                    Local, insured professionals with a track record for tidy workmanship and responsive updates. Preview our
                    work and tell us who we are meeting.
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
                  Portfolio preview
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80">
                  <Image
                    src={workShowcase[carouselIndex].src}
                    alt={workShowcase[carouselIndex].alt}
                    width={1024}
                    height={768}
                    className="h-80 w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-slate-900/80 px-4 py-3 text-sm text-slate-100 shadow-lg shadow-black/30">
                    <span>{workShowcase[carouselIndex].caption}</span>
                    <div className="flex items-center gap-2">
                      <button
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold transition hover:-translate-y-0.5"
                        onClick={() => setCarouselIndex((prev) => (prev - 1 + workShowcase.length) % workShowcase.length)}
                      >
                        Prev
                      </button>
                      <button
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold transition hover:-translate-y-0.5"
                        onClick={() => setCarouselIndex((prev) => (prev + 1) % workShowcase.length)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100">
                  <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Who should we greet?</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={tracking.name ?? ""}
                    onChange={(e) => handleNameUpdate(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                  />
                  <p className="text-slate-200">We add this to your visible tracker and share it with the crew lead.</p>
                </div>
              </div>
            </section>
            )}

            {visibleSections >= 5 && (
              <section
                ref={(el) => (sectionRefs[4].current = el)}
                className="reveal space-y-6 rounded-3xl border border-white/10 bg-white/10 p-8 shadow-xl shadow-black/30"
              >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">5 · Service milestones</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Follow the project horizontally</h2>
                  <p className="text-lg text-slate-200">
                    A simplified diagram shows how we move from first contact to cleanup. Each step locks into your tracker so you
                    always know what is next. Drop an email here and we will send tracking notifications, estimates, and invoices
                    as soon as they are ready.
                  </p>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                  Timeline ready
                </div>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-[720px] gap-4">
                  {milestoneSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex-1 rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20"
                    >
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                        <span>0{index + 1}</span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-slate-100">{step.status}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-300">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 rounded-2xl border border-white/15 bg-slate-900/70 p-5 text-sm text-slate-100 sm:grid-cols-[1fr_260px]">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Email for updates</label>
                  <p className="mt-1 text-slate-200">Add where we should send live tracking, invoices, and estimates.</p>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      value={tracking.notificationEmail ?? ""}
                      onChange={(e) => setTracking((prev) => ({ ...prev, notificationEmail: e.target.value }))}
                      placeholder="updates@example.com"
                      className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                    />
                    <button
                      className="w-full rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:-translate-y-0.5 sm:w-auto"
                      onClick={() => tracking.notificationEmail && handleNotificationEmail(tracking.notificationEmail)}
                      disabled={!tracking.notificationEmail}
                    >
                      Save + keep me posted
                    </button>
                  </div>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-xs text-slate-200">
                  <p className="font-semibold text-white">Why email?</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Delivery of tracking notifications.</li>
                    <li>• Estimate + invoice PDFs as they publish.</li>
                    <li>• Appointment confirmations and reschedules.</li>
                  </ul>
                </div>
              </div>
            </section>
            )}

            {visibleSections >= 6 && (
              <section
                ref={(el) => (sectionRefs[5].current = el)}
                className="reveal rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-xl shadow-black/30"
              >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">6 · Final contact</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Chat or call to lock the estimate time</h2>
                  <p className="text-lg text-slate-300">
                    Choose whether we reach out by text or by phone. As soon as you pick, we send everything in your tracker to
                    our scheduling widget (hooked to GHL CRM) so the team can respond live or route you to our voice AI if the
                    line is busy.
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
                  Live support
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100">
                  <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Phone</label>
                  <input
                    type="tel"
                    placeholder="(817) 555-0199"
                    value={tracking.phone ?? ""}
                    onChange={(e) => setTracking((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                  />

                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-200">How should we connect?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["text", "phone"].map((method) => (
                        <button
                          key={method}
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${
                            tracking.contactPreference === method
                              ? "border-brand-blue bg-sky-50 text-slate-900"
                              : "border-white/20 bg-slate-900/60 text-white"
                          }`}
                          onClick={() => setTracking((prev) => ({ ...prev, contactPreference: method as "text" | "phone" }))}
                        >
                          {method === "text" ? "Text me" : "Call me"}
                        </button>
                      ))}
                    </div>
                    <p className="text-slate-200">
                      We will send your saved service, crew, and address details to the widget so the responder is fully briefed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Upload site photos</label>
                    <input
                      type="file"
                      multiple
                      className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-blue file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                    />
                    <p className="text-slate-300">Drop images while we chat so the tech sees the space instantly.</p>
                  </div>

                  <button
                    className="mt-3 w-full rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => {
                      handleContactSave(tracking.email ?? tracking.notificationEmail ?? "", tracking.phone ?? "");
                      handleWidgetLaunch();
                    }}
                    disabled={!tracking.phone || !tracking.contactPreference}
                  >
                    Send details to scheduling widget
                  </button>
                </div>

                <div className="space-y-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-sm text-emerald-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Live widget</p>
                      <h3 className="text-lg font-semibold text-white">Chat with our crew</h3>
                    </div>
                    <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold text-emerald-50">Online</span>
                  </div>
                  <p className="text-emerald-50">
                    The widget shares your tracker with our CRM, triggers a workflow to create your profile, and books the first
                    available estimate slot. Someone will pick up live or our voice AI will route your call; the chat can also
                    capture notes while you upload photos.
                  </p>
                  <button
                    className="w-full rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                    onClick={handleWidgetLaunch}
                    disabled={!tracking.phone || !tracking.contactPreference}
                  >
                    Launch live chat
                  </button>
                  {chatOpen && (
                    <div className="rounded-xl border border-white/20 bg-slate-950/60 p-4 text-slate-100">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Session active</p>
                      <p className="mt-2 text-sm">
                        Crew chat is live. After the conversation, you will head to your dashboard with your saved plan and
                        payment + invoice links.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            )}

            {visibleSections >= 7 && (
              <section
                ref={(el) => (sectionRefs[6].current = el)}
                className="reveal rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-xl shadow-black/30"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ready when you are</p>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">Finish the form and move to your dashboard</h2>
                <p className="mx-auto max-w-3xl text-lg text-slate-200">
                  The summary on the right captures each section. Once you connect with the crew, you will be redirected to the
                  dashboard to follow the service.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link
                    className="rounded-full bg-brand-blue px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/40"
                    href="/dashboard"
                  >
                    Continue to dashboard
                  </Link>
                  <Link
                    className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
                    href="/"
                  >
                    Back to instructions
                  </Link>
                </div>
              </section>
            )}
          </div>

          <aside className="sticky top-4 h-fit max-h-[calc(100vh-2rem)] space-y-4 overflow-y-auto rounded-3xl border border-white/15 bg-slate-950/80 p-6 shadow-xl shadow-black/30 backdrop-blur">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
              <span>Tracking</span>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] text-emerald-100">Live</span>
            </div>
            <div className="space-y-4">
              {selectionSummary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-sky-200">{item.label}</p>
                  <p className="mt-1 text-sm text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-100">
              <p className="text-xs uppercase tracking-[0.18em] text-sky-200">Activity log</p>
              {activity.length === 0 ? (
                <p className="mt-2 text-slate-300">Your choices will appear here as you move through the sections.</p>
              ) : (
                <ul className="mt-2 space-y-2 text-slate-200">
                  {activity.map((entry, index) => (
                    <li key={`${entry}-${index}`} className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-emerald-400" aria-hidden />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
