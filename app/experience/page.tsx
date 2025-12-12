"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

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
  phone?: string;
  scheduleWindow?: string;
  notificationEmail?: string;
  contactPreference?: ContactPreference;
  photos?: string[];
};

type ContactPreference = "Text" | "Phone";

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

const scheduleWindows = [
  "Morning · 8:00a - 10:00a",
  "Midday · 11:00a - 1:00p",
  "Afternoon · 2:00p - 4:00p",
  "Evening · 5:00p - 7:00p",
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

const LazyMap = ({ src, note, onVisible }: { src: string; note: string; onVisible?: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  const mapRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          obs.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(node);
  }, [onVisible]);

  return (
    <div ref={mapRef} className="overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/30">
      {isVisible ? (
        <iframe title="Southlake map" src={src} className="h-[360px] w-full" loading="lazy" />
      ) : (
        <div className="flex h-[360px] items-center justify-center bg-slate-900/60 text-sm text-slate-200">
          Map loads when the section enters view
        </div>
      )}
      <div className="bg-slate-900/80 p-4 text-sm text-slate-200">{note}</div>
    </div>
  );
};

export default function Experience() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceOption, setServiceOption] = useState<string>("");
  const [tracking, setTracking] = useState<TrackingState>({ photos: [] });
  const [activity, setActivity] = useState<string[]>([]);
  const [addressInput, setAddressInput] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState(addressSuggestions);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [contactPreference, setContactPreference] = useState<ContactPreference | null>(null);
  const [scheduleSynced, setScheduleSynced] = useState(false);
  const deferredAddressInput = useDeferredValue(addressInput);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const appendActivity = useCallback((entry: string) => {
    setActivity((prev) => [...prev, entry]);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedService(null);
    setServiceOption("");
  }, []);

  const handleServiceConfirm = useCallback(() => {
    if (!selectedService) return;
    const detail = serviceOption || selectedService.options[0];
    setTracking((prev) => ({ ...prev, service: selectedService.name, serviceDetail: detail }));
    appendActivity(`Service added: ${selectedService.name} (${detail}).`);
    closeModal();
  }, [appendActivity, closeModal, selectedService, serviceOption]);

  const handleCrewSelect = useCallback(
    (crewFocus: string) => {
      setTracking((prev) => ({ ...prev, crewFocus }));
      appendActivity(`Crew preference saved: ${crewFocus}.`);
    },
    [appendActivity]
  );

  const handleAddressInput = useCallback((value: string) => {
    setAddressInput(value);
  }, []);

  const handleAddressCommit = useCallback(
    (value: string) => {
      setTracking((prev) => ({ ...prev, address: value }));
      setAddressInput(value);
      appendActivity(`Address matched: ${value}.`);
    },
    [appendActivity]
  );

  const handleMapVisible = useCallback(() => {
    appendActivity("Map loaded after section scroll.");
  }, [appendActivity]);

  const handleNameUpdate = useCallback(
    (value: string) => {
      setTracking((prev) => ({ ...prev, name: value }));
      if (value) {
        appendActivity(`Contact name captured: ${value}.`);
      }
    },
    [appendActivity]
  );

  const handleContactSave = useCallback(
    (email: string, phone: string) => {
      setTracking((prev) => ({ ...prev, email, phone }));
      setScheduleSynced(false);
      appendActivity("Contact details saved for scheduling.");
    },
    [appendActivity]
  );

  const handleEmailInput = useCallback((value: string) => {
    setTracking((prev) => ({ ...prev, email: value }));
    setScheduleSynced(false);
  }, []);

  const handlePhoneInput = useCallback((value: string) => {
    setTracking((prev) => ({ ...prev, phone: value }));
    setScheduleSynced(false);
  }, []);

  const handleNotificationUpdate = useCallback(
    (value: string) => {
      setTracking((prev) => ({ ...prev, notificationEmail: value }));
      if (value) {
        appendActivity("Notification email captured for estimate + invoice updates.");
      }
    },
    [appendActivity]
  );

  const handleScheduleWindow = useCallback(
    (value: string) => {
      setTracking((prev) => ({ ...prev, scheduleWindow: value }));
      setScheduleSynced(false);
      appendActivity(`Preferred schedule window saved: ${value}.`);
    },
    [appendActivity]
  );

  const handlePreferenceSelect = useCallback((value: ContactPreference) => {
    setContactPreference(value);
    setTracking((prev) => ({ ...prev, contactPreference: value }));
    setScheduleSynced(false);
  }, []);

  const handlePhotoUpload = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const names = Array.from(files).map((file) => file.name);
      setTracking((prev) => ({ ...prev, photos: [...(prev.photos ?? []), ...names] }));
      setScheduleSynced(false);
      appendActivity(`Uploaded ${names.length} photo(s) for review.`);
    },
    [appendActivity]
  );

  const syncScheduling = useCallback(() => {
    if (!tracking.phone || !contactPreference || !(tracking.photos?.length)) {
      return;
    }

    appendActivity(
      `Scheduling synced for ${tracking.service ?? "your request"} with ${contactPreference.toLowerCase()} updates, ${tracking.photos?.length ?? 0} photo(s), and window ${tracking.scheduleWindow ?? "pending"}.`
    );
    setScheduleSynced(true);
  }, [appendActivity, contactPreference, tracking.phone, tracking.photos, tracking.scheduleWindow, tracking.service]);

  const makeSectionRef = useCallback(
    (key: string) => (node: HTMLDivElement | null) => {
      if (node) {
        sectionRefs.current[key] = node;
      }
    },
    []
  );

  const scrollToSection = useCallback((key: string) => {
    const target = sectionRefs.current[key];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const matches = addressSuggestions.filter((address) =>
      address.toLowerCase().includes(deferredAddressInput.toLowerCase())
    );
    setFilteredAddresses(matches.length ? matches : addressSuggestions);
  }, [deferredAddressInput]);

  const revealObserverCallback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    []
  );

  const revealOptions = useMemo(() => ({ threshold: 0.25 }), []);

  useEffect(() => {
    const observer = new IntersectionObserver(revealObserverCallback, revealOptions);

    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [revealObserverCallback, revealOptions]);

  const selectionSummary = useMemo(
    () => [
      { label: "Service", value: tracking.service ? `${tracking.service} · ${tracking.serviceDetail}` : "Choose from the menu" },
      { label: "Crew", value: tracking.crewFocus || "Select a crew focus" },
      { label: "Address", value: tracking.address || "Add your Southlake address" },
      { label: "Name", value: tracking.name || "Who should we greet?" },
      { label: "Contact", value: (tracking.email || tracking.phone) ? `${tracking.email ?? ""} ${tracking.phone ?? ""}`.trim() : "Email + phone" },
      { label: "Notification", value: tracking.notificationEmail || "Add estimate updates" },
      { label: "Schedule", value: tracking.scheduleWindow || "Pick a window" },
      { label: "Preference", value: tracking.contactPreference || "Text or phone?" },
      { label: "Photos", value: tracking.photos?.length ? `${tracking.photos.length} uploaded` : "Upload project photos" },
    ],
    [tracking]
  );

  const canSyncScheduling = useMemo(
    () => Boolean(tracking.phone && contactPreference && tracking.photos?.length),
    [contactPreference, tracking.phone, tracking.photos]
  );

  const completionLocked = !scheduleSynced;

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,191,36,0.16),transparent_38%),radial-gradient(circle_at_80%_30%,rgba(248,204,21,0.14),transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 lg:py-14">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_288px]">
          <div className="space-y-9 lg:scale-[0.92] lg:origin-top">
            <section
              ref={makeSectionRef("hero")}
              className="reveal rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl shadow-black/30 backdrop-blur"
            >
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
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-amber-300/40 transition hover:-translate-y-0.5"
                    href="/dashboard"
                  >
                    Open draft dashboard
                  </Link>
                  <button
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                    onClick={() => scrollToSection("final-contact")}
                  >
                    Jump to final step
                  </button>
                </div>
              </div>
            </section>

            <section
              ref={makeSectionRef("service-menu")}
              className="reveal space-y-5 rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl shadow-black/25 backdrop-blur"
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

              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
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
                        className="rounded-full bg-brand-blue px-6 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-amber-300/40 transition hover:-translate-y-0.5"
                        onClick={handleServiceConfirm}
                      >
                        Save selection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section
              ref={makeSectionRef("crew")}
              className="reveal rounded-3xl border border-white/10 bg-slate-950/70 p-7 shadow-xl shadow-black/30"
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
                      className="mt-4 w-full rounded-full bg-brand-blue px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-amber-300/40 transition hover:-translate-y-0.5"
                      onClick={() => handleCrewSelect(profile.focus)}
                    >
                      Add crew focus
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section
              ref={makeSectionRef("address")}
              className="reveal grid gap-5 rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl shadow-black/30 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
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

              <LazyMap
                src={mapSrc}
                note="Mapped to Southlake, TX · Adjusting the address recenters the crew route and updates your dashboard."
                onVisible={handleMapVisible}
              />
            </section>

            <section
              ref={makeSectionRef("about")}
              className="reveal rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-xl shadow-black/30"
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

            <section
              ref={makeSectionRef("timeline")}
              className="reveal space-y-5 rounded-3xl border border-white/10 bg-white/10 p-7 shadow-xl shadow-black/30"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">5 · Service milestones</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Follow the project horizontally</h2>
                  <p className="text-lg text-slate-200">
                    A simplified diagram shows how we move from first contact to cleanup. Each step locks into your tracker so you
                    always know what is next.
                  </p>
                </div>
                <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100">
                  Timeline ready
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
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

                <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-slate-100">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200">Service timeline capture</p>
                  <label className="text-xs uppercase tracking-[0.18em] text-sky-200">Notification email</label>
                  <input
                    type="email"
                    value={tracking.notificationEmail ?? tracking.email ?? ""}
                    onChange={(e) => handleNotificationUpdate(e.target.value)}
                    placeholder="estimates@yourdomain.com"
                    className="w-full rounded-xl border border-white/20 bg-slate-950/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                  />
                  <p className="text-slate-300">Estimate and invoice notifications will route here and into your dashboard timeline.</p>

                  <label className="text-xs uppercase tracking-[0.18em] text-sky-200">Schedule window</label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {scheduleWindows.map((window) => (
                      <button
                        key={window}
                        className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                          tracking.scheduleWindow === window
                            ? "border-brand-blue bg-white/10 text-white"
                            : "border-white/10 bg-white/5 text-slate-200"
                        }`}
                        onClick={() => handleScheduleWindow(window)}
                      >
                        {window}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              ref={makeSectionRef("final-contact")}
              className="reveal rounded-3xl border border-white/10 bg-slate-900/70 p-7 shadow-xl shadow-black/30"
            >
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">6 · Final contact</p>
                  <h2 className="text-3xl font-bold text-white sm:text-4xl">Share how to reach you and open live chat</h2>
                  <p className="text-lg text-slate-300">
                    Add an email and phone number for scheduling. The live widget connects you directly with the crew to lock your
                    estimate time.
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-slate-100 ring-1 ring-white/10">
                  Live support
                </div>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100">
                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Email</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={tracking.email ?? ""}
                      onChange={(e) => handleEmailInput(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Phone</label>
                    <input
                      type="tel"
                      placeholder="(817) 555-0199"
                      value={tracking.phone ?? ""}
                      onChange={(e) => handlePhoneInput(e.target.value)}
                      className="w-full rounded-xl border border-white/20 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-black/30 focus:border-brand-blue focus:outline-none"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Text or phone updates?</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Text", "Phone"] as ContactPreference[]).map((option) => (
                        <button
                          key={option}
                          className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                            tracking.contactPreference === option
                              ? "border-brand-blue bg-white/10 text-white"
                              : "border-white/20 bg-slate-900/60 text-slate-100"
                          }`}
                          onClick={() => handlePreferenceSelect(option)}
                        >
                          {option} me updates
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-sky-200">Upload project photos</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handlePhotoUpload(e.target.files)}
                      className="w-full rounded-xl border border-dashed border-white/25 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 focus:border-brand-blue focus:outline-none"
                    />
                    {tracking.photos?.length ? (
                      <ul className="space-y-1 text-xs text-slate-200">
                        {tracking.photos.map((photo) => (
                          <li key={photo} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
                            {photo}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-300">Add at least one photo to prep the crew.</p>
                    )}
                  </div>

                  <button
                    className="w-full rounded-full bg-brand-blue px-6 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-amber-300/40 transition hover:-translate-y-0.5"
                    onClick={() => handleContactSave(tracking.email ?? "", tracking.phone ?? "")}
                  >
                    Save contact + sync to tracker
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
                    The final widget uses your phone, preference, and photos to pass a complete record into scheduling before you finish the flow.
                  </p>
                  <button
                    className="w-full rounded-full border border-emerald-400/60 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                    onClick={() => {
                      setChatOpen(true);
                      appendActivity("Live widget opened to schedule an estimate.");
                    }}
                  >
                    Launch live chat
                  </button>
                  <button
                    className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                      canSyncScheduling
                        ? "bg-brand-blue text-slate-950 hover:-translate-y-0.5"
                        : "bg-slate-800 text-slate-300"
                    }`}
                    onClick={syncScheduling}
                    disabled={!canSyncScheduling}
                  >
                    Sync tracking into scheduling
                  </button>
                  {!canSyncScheduling && (
                    <p className="text-xs text-emerald-100">
                      Add a phone number, choose text or phone preference, and upload a photo to unlock scheduling.
                    </p>
                  )}
                  {scheduleSynced && (
                    <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-slate-100">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Ready for completion</p>
                      <p className="mt-2 text-sm">
                        Scheduling workflow received your saved details. Finish the widget to continue to your dashboard.
                      </p>
                    </div>
                  )}
                  {chatOpen && (
                    <div className="rounded-xl border border-white/20 bg-slate-950/60 p-4 text-slate-100">
                      <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">Session active</p>
                      <p className="mt-2 text-sm">Crew chat is live. After the conversation, you will head to your dashboard with your saved plan.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section
              ref={makeSectionRef("completion")}
              className="reveal rounded-3xl border border-white/10 bg-slate-900/80 p-7 text-center shadow-xl shadow-black/30"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">Ready when you are</p>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Finish the form and move to your dashboard</h2>
              <p className="mx-auto max-w-3xl text-lg text-slate-200">
                The summary on the right captures each section. Sync your phone, preference, and photos into scheduling to
                unlock completion and move to the dashboard.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  className={`rounded-full px-7 py-3 text-sm font-semibold shadow-lg transition ${
                    completionLocked
                      ? "cursor-not-allowed bg-slate-800 text-slate-300 shadow-none"
                      : "bg-brand-blue text-slate-950 shadow-amber-300/25 hover:-translate-y-0.5 hover:shadow-amber-200/60"
                  }`}
                  href={completionLocked ? "#" : "/dashboard"}
                  aria-disabled={completionLocked}
                  onClick={(e) => {
                    if (completionLocked) {
                      e.preventDefault();
                      scrollToSection("final-contact");
                    }
                  }}
                >
                  {completionLocked ? "Sync scheduling to continue" : "Continue to dashboard"}
                </Link>
                <Link
                  className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
                  href="/"
                >
                  Back to instructions
                </Link>
              </div>
            </section>
          </div>

          <aside className="fixed right-6 top-8 hidden h-fit w-[288px] space-y-3 rounded-3xl border border-white/15 bg-slate-950/80 p-5 shadow-xl shadow-black/30 backdrop-blur lg:block lg:scale-[0.92] lg:origin-top">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              <span>Tracking</span>
              <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-[11px] text-emerald-100">Live</span>
            </div>
            <div className="space-y-3">
              {selectionSummary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <p className="text-xs uppercase tracking-[0.18em] text-sky-200">{item.label}</p>
                  <p className="mt-1 text-sm text-white">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3.5 text-sm text-slate-100">
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
