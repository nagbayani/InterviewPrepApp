import type { NextApiRequest, NextApiResponse } from "next";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

import Stripe from "stripe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });

  // This object will contain the user's data if the user is signed in
  const user = await currentUser();

  // Error handling
  if (!user.session?.user) {
    return res.status(401).json({
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }

  const userStripe = await prisma.user.findUnique({
    where: { id: user.session.user.id },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: userStripe?.stripeCustomerId, // Ensure this is a valid Stripe customer ID
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: "http://localhost:3000/?cancelledPayment=true",
    subscription_data: {
      metadata: {
        payingUserId: String(user.session?.user.id), // Casts the user ID to a string
      },
    },
  } as Stripe.Checkout.SessionCreateParams);

  if (!checkoutSession.url) {
    return res.status(500).json({
      cpde: "stripe-error",
      error: "Could not create checkout session",
    });
  }

  // Return the newly-created checkoutSession URL and let the frontend render it
  return res.status(200).json({ redirectUrl: checkoutSession.url });
};

export default handler;
