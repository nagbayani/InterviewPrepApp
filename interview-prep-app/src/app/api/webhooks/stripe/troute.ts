import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import prisma from "@/lib/db";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
// YOUR ENDPOINT SECRET copied from the Stripe CLI start-up earlier, should look like 'whsec_xyz123...'

// Disable automatic body parsing for raw body processing
export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing to handle raw body
  },
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const requestBuffer = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-06-20",
    });

    let event;

    try {
      // Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
      event = stripe.webhooks.constructEvent(
        requestBuffer.toString(), // Stringify the request for the Stripe library
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook signature verification failed.`);
    }

    // Handle the event
    switch (event.type) {
      // Handle successful subscription creation
      case "customer.subscription.created": {
        try {
          const subscription = event.data.object as Stripe.Subscription;
          await prisma.user.update({
            // Find the customer in our database with the Stripe customer ID linked to this purchase
            where: {
              stripeCustomerId: subscription.customer as string,
            },
            // Update that customer so their status is now active
            data: {
              isActive: true,
            },
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            status: 500,
            message: "Error updating user",
            error,
          });
        }
        break;
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true });
  } catch (err) {
    // Return a 500 error
    console.log(err);
    res.status(500).end();
  }
};

export default handler;
