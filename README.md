# FinalFile

FinalFile is a payment-gated delivery page MVP for real estate photographers, drone operators, videographers, and media freelancers. Users paste a preview link and a protected final delivery link, then FinalFile unlocks the final folder after Stripe payment succeeds.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Stripe Checkout
- Vercel-ready deployment

## Install steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and fill in your values:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Supabase setup

1. Create a Supabase project.
2. Run the SQL in `/supabase/schema.sql` inside the Supabase SQL editor.
3. Copy the project URL into `NEXT_PUBLIC_SUPABASE_URL`.
4. Copy the anon key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. For this MVP, the included row-level security policy allows all reads and writes.

## Stripe setup

1. Create a Stripe account and switch to test mode.
2. Copy your secret key into `STRIPE_SECRET_KEY`.
3. Create a webhook endpoint that points to `/api/stripe/webhook`.
4. Subscribe the webhook to `checkout.session.completed`.
5. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Use Stripe test cards during local development.

### Local webhook forwarding

You can forward Stripe webhooks to local development with the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Local dev commands

```bash
npm run dev
npm run lint
npm run build
```

## Vercel deployment notes

- Deploy the project as a standard Next.js app on Vercel.
- Add the same environment variables from `.env.example` to the Vercel project.
- Set `NEXT_PUBLIC_APP_URL` to your production domain.
- Point the Stripe webhook endpoint at your deployed `/api/stripe/webhook` URL.
- Keep Supabase row-level security aligned with your production auth model when you move beyond the MVP.

## MVP limitations

- No file uploads.
- No CRM.
- No scheduling.
- No team accounts.
- No AI chat.
- No authentication yet; the dashboard shows all projects.
- Final files are external links only.
