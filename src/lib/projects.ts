import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";

import { getProjectDeliveryUrl } from "@/lib/app-url";
import { createSupabaseServerClient } from "@/lib/supabase";
import { getStripeServerClient } from "@/lib/stripe";
import type { ProjectRecord } from "@/types/project";

const generatePublicSlug = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  10,
);

function normaliseOptionalText(value: FormDataEntryValue | null) {
  const text = value?.toString().trim();
  return text ? text : null;
}

function parseInvoiceAmount(value: FormDataEntryValue | null) {
  const dollars = Number(value?.toString() ?? "");

  if (!Number.isFinite(dollars) || dollars <= 0) {
    throw new Error("Invoice amount must be greater than zero.");
  }

  return Math.round(dollars * 100);
}

function assertRequiredText(value: FormDataEntryValue | null, fieldName: string) {
  const text = value?.toString().trim();

  if (!text) {
    throw new Error(`${fieldName} is required.`);
  }

  return text;
}

export async function listProjects() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ProjectRecord[];
}

export async function getProjectById(id: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProjectRecord | null;
}

export async function getProjectBySlug(publicSlug: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("public_slug", publicSlug)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as ProjectRecord | null;
}

export async function createProject(formData: FormData) {
  "use server";

  const supabase = createSupabaseServerClient();
  const project = {
    client_name: assertRequiredText(formData.get("client_name"), "Client name"),
    client_email: normaliseOptionalText(formData.get("client_email")),
    project_title: assertRequiredText(formData.get("project_title"), "Project title"),
    property_address: normaliseOptionalText(formData.get("property_address")),
    preview_link: assertRequiredText(formData.get("preview_link"), "Preview link"),
    final_delivery_link: assertRequiredText(
      formData.get("final_delivery_link"),
      "Final delivery link",
    ),
    invoice_amount_cents: parseInvoiceAmount(formData.get("invoice_amount")),
    payment_due_date: normaliseOptionalText(formData.get("payment_due_date")),
    notes: normaliseOptionalText(formData.get("notes")),
    public_slug: generatePublicSlug(),
    status: "unpaid" as const,
    currency: "usd",
  };

  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  redirect(`/dashboard/projects/${data.id}`);
}

export async function markProjectAsPaid(projectId: string) {
  "use server";

  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("projects")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
    })
    .eq("id", projectId);

  if (error) {
    throw new Error(error.message);
  }

  const project = await getProjectById(projectId);

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${projectId}`);

  if (project) {
    revalidatePath(`/deliver/${project.public_slug}`);
  }
}

export async function syncProjectPaymentStatus(project: ProjectRecord) {
  if (
    project.status === "paid" ||
    !project.stripe_checkout_session_id ||
    !process.env.STRIPE_SECRET_KEY
  ) {
    return project;
  }

  const stripe = getStripeServerClient();
  const session = await stripe.checkout.sessions.retrieve(
    project.stripe_checkout_session_id,
  );

  if (session.payment_status !== "paid") {
    return project;
  }

  const supabase = createSupabaseServerClient();
  const paidAt = new Date(session.created * 1000).toISOString();
  const { data, error } = await supabase
    .from("projects")
    .update({
      status: "paid",
      paid_at: paidAt,
    })
    .eq("id", project.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${project.id}`);
  revalidatePath(`/deliver/${project.public_slug}`);

  return data as ProjectRecord;
}

export function buildDeliveryEmail(project: ProjectRecord) {
  return `Subject: ${project.project_title} Media Delivery\n\nHi ${project.client_name},\n\nThe media for ${project.project_title} is ready.\n\nYou can preview the files and unlock the final delivery folder here:\n\n${getProjectDeliveryUrl(project.public_slug)}\n\nOnce payment is complete, the final downloadable files will be available automatically.\n\nThanks.`;
}

export function buildReminderEmail(project: ProjectRecord) {
  return `Subject: Final files pending for ${project.project_title}\n\nHi ${project.client_name},\n\nJust a quick reminder that the final files for ${project.project_title} are ready.\n\nYou can complete payment and unlock the download folder here:\n\n${getProjectDeliveryUrl(project.public_slug)}\n\nThanks.`;
}
