import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { StatusBadge } from "@/components/status-badge";
import { getProjectDeliveryUrl } from "@/lib/app-url";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { listProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const projects = await listProjects();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Delivery projects
          </h1>
          <p className="mt-2 text-zinc-600">
            Manage every project, copy the public page, and track whether the final files are unlocked.
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          New Delivery Page
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        {projects.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-xl font-semibold text-zinc-950">No delivery pages yet</h2>
            <p className="mt-2 text-zinc-600">
              Create your first project to start gating final files behind Stripe payment.
            </p>
            <Link
              href="/dashboard/new"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Create Your First Delivery Page
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Project title</th>
                  <th className="px-6 py-4 font-medium">Client name</th>
                  <th className="px-6 py-4 font-medium">Invoice amount</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {projects.map((project) => {
                  const publicUrl = getProjectDeliveryUrl(project.public_slug);

                  return (
                    <tr key={project.id} className="align-top">
                      <td className="px-6 py-5 font-medium text-zinc-950">
                        {project.project_title}
                      </td>
                      <td className="px-6 py-5 text-zinc-700">{project.client_name}</td>
                      <td className="px-6 py-5 text-zinc-700">
                        {formatCurrency(project.invoice_amount_cents, project.currency)}
                      </td>
                      <td className="px-6 py-5">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-5 text-zinc-700">
                        {formatDate(project.created_at)}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-2">
                          <CopyButton text={publicUrl} label="Copy public link" />
                          <Link
                            href={`/deliver/${project.public_slug}`}
                            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
                          >
                            View public page
                          </Link>
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
                          >
                            Project detail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
