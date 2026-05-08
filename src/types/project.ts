export type ProjectStatus = "unpaid" | "paid";

export type ProjectRecord = {
  id: string;
  user_id: string | null;
  client_name: string;
  client_email: string | null;
  project_title: string;
  property_address: string | null;
  preview_link: string;
  final_delivery_link: string;
  invoice_amount_cents: number;
  currency: string;
  status: ProjectStatus;
  public_slug: string;
  notes: string | null;
  payment_due_date: string | null;
  stripe_checkout_session_id: string | null;
  created_at: string;
  paid_at: string | null;
};
