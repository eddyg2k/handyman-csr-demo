import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-white">
      <div className="text-center space-y-4 p-8">
        <h1 className="text-4xl font-bold text-brand-blue">
          Handyman CSR Dashboard Demo
        </h1>
        <p className="text-lg text-gray-400">
          Navigate to the dashboard to review the latest leads.
        </p>
        <Link
          className="inline-flex items-center rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-red"
          href="/dashboard"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
