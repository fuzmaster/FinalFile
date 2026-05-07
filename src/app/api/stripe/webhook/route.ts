import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET environment variable." },
      { status: 500 },
    );
  }

  try {
    const body = await request.text();
    const stripe = getStripeServerClient();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const projectId = session.metadata?.projectId;

      if (projectId) {
        const supabase = createSupabaseServerClient();
        const { error } = await supabase
          .from("projects")
          .update({
            status: "paid",
            paid_at: new Date().toISOString(),
            stripe_checkout_session_id: session.id,
          })
          .eq("id", projectId);

        if (error) {
          throw new Error(error.message);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Stripe webhook handling failed.",
      },
      { status: 400 },
    );
  }
}
