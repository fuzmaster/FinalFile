import { NextResponse } from "next/server";

import { getAppUrl } from "@/lib/app-url";
import { getProjectById } from "@/lib/projects";
import { createSupabaseServerClient } from "@/lib/supabase";
import { getStripeServerClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { projectId?: string };

    if (!payload.projectId) {
      return NextResponse.json({ error: "Missing projectId." }, { status: 400 });
    }

    const project = await getProjectById(payload.projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const stripe = getStripeServerClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: project.currency,
            product_data: {
              name: `Final media delivery for ${project.project_title}`,
            },
            unit_amount: project.invoice_amount_cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        projectId: project.id,
      },
      success_url: `${getAppUrl()}/deliver/${project.public_slug}?payment=success`,
      cancel_url: `${getAppUrl()}/deliver/${project.public_slug}?payment=cancelled`,
    });

    const supabase = createSupabaseServerClient();
    const { error } = await supabase
      .from("projects")
      .update({ stripe_checkout_session_id: session.id })
      .eq("id", project.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create Stripe checkout session.",
      },
      { status: 500 },
    );
  }
}
