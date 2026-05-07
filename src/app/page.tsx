import Link from "next/link";

const steps = [
  {
    title: "Create a delivery page",
    description:
      "Add the project details, invoice amount, preview link, and the final delivery folder you want to protect.",
  },
  {
    title: "Share the public link",
    description:
      "Send one clean delivery page instead of juggling invoices, email threads, and manual payment follow-up.",
  },
  {
    title: "Unlock final files after payment",
    description:
      "Clients preview the work, pay with Stripe Checkout, and automatically see the final delivery link once payment clears.",
  },
];

const audiences = [
  "Real estate photographers",
  "Drone operators",
  "Videographers",
  "Media freelancers",
];

const platforms = [
  "Google Drive",
  "Dropbox",
  "Pixieset",
  "Frame.io",
  "Vimeo",
  "YouTube",
  "WeTransfer",
  "and more",
];

const faqs = [
  {
    question: "Does FinalFile host my media?",
    answer:
      "No. FinalFile only gates access to the final delivery link you paste into the project form.",
  },
  {
    question: "Can clients preview the work before payment?",
    answer:
      "Yes. You can share any preview link you want while keeping the final delivery folder hidden until the invoice is paid.",
  },
  {
    question: "Is this ready for Vercel?",
    answer:
      "Yes. The MVP is designed for a straightforward Next.js + Supabase + Stripe deployment on Vercel.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-1 text-sm font-medium text-emerald-700">
              Payment-gated delivery pages for media pros
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Stop sending final files before you get paid.
              </h1>
              <p className="text-lg leading-8 text-zinc-600">
                Create a payment-gated delivery page for real estate photos, drone videos, and client media.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard/new"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Create Your First Delivery Page
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
              >
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Example delivery page</p>
                  <h2 className="mt-2 text-2xl font-semibold text-zinc-950">
                    123 Main Street Twilight Shoot
                  </h2>
                  <p className="mt-1 text-sm text-zinc-600">Client: Oakridge Realty</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                  Unpaid
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 p-4">
                  <p className="text-sm text-zinc-500">Preview</p>
                  <p className="mt-2 font-medium text-zinc-900">Share proofs or a teaser gallery</p>
                </div>
                <div className="rounded-2xl border border-zinc-200 p-4">
                  <p className="text-sm text-zinc-500">Invoice</p>
                  <p className="mt-2 font-medium text-zinc-900">$325.00 due before final release</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-700">
                  Final delivery link stays hidden until the Stripe payment succeeds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">
            One simple workflow from preview to paid delivery.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-zinc-950">{step.title}</h3>
              <p className="mt-3 leading-7 text-zinc-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Who it is for
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              Built for solo operators who need a cleaner final delivery process.
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {audiences.map((audience) => (
                <div key={audience} className="rounded-2xl border border-zinc-200 bg-white p-5">
                  <p className="font-medium text-zinc-900">{audience}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Works with your existing tools
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Pricing teaser
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
              A simple micro-SaaS for faster payment collection.
            </h2>
            <p className="mt-4 leading-7 text-zinc-600">
              Start with a clean MVP workflow today, then evolve into a lightweight paid tool for your media business.
            </p>
            <div className="mt-8 rounded-2xl bg-zinc-50 p-6">
              <p className="text-sm text-zinc-500">Early pricing idea</p>
              <p className="mt-2 text-4xl font-semibold text-zinc-950">$19/mo</p>
              <p className="mt-2 text-sm text-zinc-600">
                Unlimited delivery pages, Stripe-powered checkout, and faster client handoff.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
              FAQ
            </p>
            <div className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="text-lg font-semibold text-zinc-950">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-zinc-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
