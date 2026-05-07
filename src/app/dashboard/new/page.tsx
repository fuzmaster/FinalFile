import Link from "next/link";

import { SubmitButton } from "@/components/submit-button";
import { createProject } from "@/lib/projects";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            New delivery page
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Create a gated client delivery page
          </h1>
          <p className="mt-2 text-zinc-600">
            Add the client details, preview link, final delivery link, and invoice amount in one form.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
        >
          Back to dashboard
        </Link>
      </div>

      <form action={createProject} className="mt-8 space-y-8 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800">Client name</span>
            <input
              required
              name="client_name"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800">Client email optional</span>
            <input
              name="client_email"
              type="email"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-800">Project title</span>
            <input
              required
              name="project_title"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-800">Property address optional</span>
            <input
              name="property_address"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-800">Preview link</span>
            <input
              required
              name="preview_link"
              type="url"
              placeholder="https://"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-800">Final delivery link</span>
            <input
              required
              name="final_delivery_link"
              type="url"
              placeholder="https://"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800">Invoice amount in dollars</span>
            <input
              required
              min="1"
              step="0.01"
              name="invoice_amount"
              type="number"
              placeholder="325"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-zinc-800">Due date optional</span>
            <input
              name="payment_due_date"
              type="date"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-zinc-800">Notes optional</span>
            <textarea
              name="notes"
              rows={4}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-emerald-500"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <SubmitButton label="Create delivery page" pendingLabel="Creating..." />
        </div>
      </form>
    </main>
  );
}
