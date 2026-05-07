import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckoutButton } from "@/components/checkout-button";
import { formatCurrency } from "@/lib/formatters";
import { getProjectBySlug, syncProjectPaymentStatus } from "@/lib/projects";

type DeliveryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ payment?: string }>;
};

export const dynamic = "force-dynamic";

export default async function DeliveryPage({
  params,
  searchParams,
}: DeliveryPageProps) {
  const { slug } = await params;
  const { payment } = await searchParams;

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hydratedProject =
    payment === "success"
      ? await syncProjectPaymentStatus(project)
      : project;

  const showSuccessBanner = payment === "success" && hydratedProject.status === "paid";
  const showCancelledBanner = payment === "cancelled";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="space-y-4 border-b border-zinc-200 pb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
            FinalFile delivery page
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            {hydratedProject.project_title}
          </h1>
          <div className="space-y-1 text-zinc-600">
            <p>Prepared for {hydratedProject.client_name}</p>
            {hydratedProject.property_address ? (
              <p>{hydratedProject.property_address}</p>
            ) : null}
          </div>
        </div>

        {showSuccessBanner ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            Payment received. Your final delivery link is now unlocked.
          </div>
        ) : null}
        {showCancelledBanner ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
            Checkout was cancelled. You can come back anytime to complete payment.
          </div>
        ) : null}

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Preview link</p>
            <a
              href={hydratedProject.preview_link}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-600"
            >
              Open preview
            </a>
          </div>

          {hydratedProject.notes ? (
            <div className="rounded-2xl bg-zinc-50 p-5">
              <p className="text-sm font-medium text-zinc-500">Notes</p>
              <p className="mt-3 whitespace-pre-wrap leading-7 text-zinc-700">
                {hydratedProject.notes}
              </p>
            </div>
          ) : null}

          {hydratedProject.status === "paid" ? (
            <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-2xl font-semibold text-zinc-950">Payment received</h2>
              <p className="leading-7 text-zinc-700">
                Thanks for your payment. Your final delivery folder is now available below.
              </p>
              <a
                href={hydratedProject.final_delivery_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Final Delivery Folder
              </a>
              <p className="text-sm text-zinc-600">Thank you for working with FinalFile.</p>
            </div>
          ) : (
            <div className="space-y-5 rounded-2xl border border-zinc-200 p-6">
              <div>
                <p className="text-sm font-medium text-zinc-500">Invoice amount</p>
                <p className="mt-2 text-3xl font-semibold text-zinc-950">
                  {formatCurrency(
                    hydratedProject.invoice_amount_cents,
                    hydratedProject.currency,
                  )}
                </p>
              </div>
              <p className="leading-7 text-zinc-600">
                Complete payment to unlock the final delivery folder automatically.
              </p>
              <CheckoutButton projectId={hydratedProject.id} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-zinc-500">
        Powered by <Link href="/" className="text-emerald-600 hover:text-emerald-700">FinalFile</Link>
      </div>
    </main>
  );
}
