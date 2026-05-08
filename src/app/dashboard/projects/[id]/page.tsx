import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyButton } from "@/components/copy-button";
import { StatusBadge } from "@/components/status-badge";
import { SubmitButton } from "@/components/submit-button";
import { getProjectDeliveryUrl } from "@/lib/app-url";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  buildDeliveryEmail,
  buildReminderEmail,
  getProjectById,
  markProjectAsPaid,
} from "@/lib/projects";

export const dynamic = "force-dynamic";

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const projectId = project.id;
  const publicUrl = getProjectDeliveryUrl(project.public_slug);
  const deliveryEmail = buildDeliveryEmail(project);
  const reminderEmail = buildReminderEmail(project);

  async function markPaidAction() {
    "use server";

    await markProjectAsPaid(projectId);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/dashboard" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            ← Back to dashboard
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            {project.project_title}
          </h1>
          <p className="mt-2 text-zinc-600">Client: {project.client_name}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">Project info</h2>
          <dl className="mt-6 space-y-4 text-sm text-zinc-700">
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-zinc-500">Invoice amount</dt>
              <dd>{formatCurrency(project.invoice_amount_cents, project.currency)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-zinc-500">Preview link</dt>
              <dd>
                <a href={project.preview_link} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-700">
                  Open preview link
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-zinc-500">Final delivery link</dt>
              <dd className="break-all text-zinc-700">{project.final_delivery_link}</dd>
            </div>
            {project.property_address ? (
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-zinc-500">Property address</dt>
                <dd>{project.property_address}</dd>
              </div>
            ) : null}
            {project.client_email ? (
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-zinc-500">Client email</dt>
                <dd>{project.client_email}</dd>
              </div>
            ) : null}
            {project.payment_due_date ? (
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-zinc-500">Due date</dt>
                <dd>{formatDate(project.payment_due_date)}</dd>
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-zinc-500">Created</dt>
              <dd>{formatDate(project.created_at)}</dd>
            </div>
            {project.paid_at ? (
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-zinc-500">Paid at</dt>
                <dd>{formatDate(project.paid_at)}</dd>
              </div>
            ) : null}
            {project.notes ? (
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-zinc-500">Notes</dt>
                <dd className="whitespace-pre-wrap">{project.notes}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-8 space-y-3 rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Public delivery page URL</p>
            <p className="break-all text-sm text-zinc-700">{publicUrl}</p>
            <div className="flex flex-wrap gap-3">
              <CopyButton text={publicUrl} label="Copy link" />
              <Link
                href={`/deliver/${project.public_slug}`}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
              >
                View public page
              </Link>
            </div>
          </div>

          {project.status === "unpaid" ? (
            <form action={markPaidAction} className="mt-6">
              <SubmitButton label="Manual mark as paid" pendingLabel="Updating..." />
            </form>
          ) : null}
        </section>

        <section className="space-y-8">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">Delivery email copy</h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Send this when the preview is ready and payment should unlock the final folder.
                </p>
              </div>
              <CopyButton text={deliveryEmail} />
            </div>
            <textarea
              readOnly
              value={deliveryEmail}
              className="mt-6 min-h-56 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 outline-none"
            />
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-950">Payment reminder email copy</h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Use this follow-up if the client has previewed the work but has not paid yet.
                </p>
              </div>
              <CopyButton text={reminderEmail} />
            </div>
            <textarea
              readOnly
              value={reminderEmail}
              className="mt-6 min-h-56 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700 outline-none"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
