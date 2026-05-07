create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  client_name text not null,
  client_email text,
  project_title text not null,
  property_address text,
  preview_link text not null,
  final_delivery_link text not null,
  invoice_amount_cents integer not null,
  currency text not null default 'usd',
  status text not null default 'unpaid',
  public_slug text unique not null,
  notes text,
  payment_due_date date,
  stripe_checkout_session_id text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.projects enable row level security;

create policy "Allow all for MVP"
on public.projects
for all
using (true)
with check (true);
