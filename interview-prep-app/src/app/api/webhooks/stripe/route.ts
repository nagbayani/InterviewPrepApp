import Stripe from "stripe";
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { stat } from "fs";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);
  const signature = req.headers.get("stripe-signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature as string,
      WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  try {
    // event = stripe.webhooks.constructEvent(
    //   payload,
    //   signature as string,
    //   // process.env.STRIPE_WEBHOOK_SECRET as string
    //   WEBHOOK_SECRET
    // );
    // console.log(
    //   res?.data?.object?.billing_details?.email, // email
    //   res?.data?.object?.amount, // amount
    //   JSON.stringify(res), // payment info
    //   res?.type, // type
    //   String(timeString), // time
    //   String(dateTime), // date
    //   res?.data?.object?.receipt_email, // email
    //   res?.data?.object?.receipt_url, // url
    //   JSON.stringify(res?.data?.object?.payment_method_details), // Payment method details
    //   JSON.stringify(res?.data?.object?.billing_details), // Billing details
    //   res?.data?.object?.currency // Currency
    // );
    // console.log("Event: ", event.type);
    switch (event.type) {
      // case "checkout.session.completed": {
      //   const subscription = event.data.object;
      //   console.log("Subscription ID", subscription.subscription);
      //   console.log("Subscription Checkout Session ID", subscription.id);
      //   await prisma.user.update({
      //     // Find the customer in our database with the Stripe customer ID linked to this purchase
      //     where: {
      //       stripeCustomerId: subscription.customer as string,
      //     },
      //     // Update that customer so their status is now active
      //     data: {

      //       isActive: true,
      //     },
      //   });
      // }
      case "customer.subscription.created": {
        console.log("CREATE SUBSCRIPTION");
        const subscription = event.data.object as Stripe.Subscription;

        // console.log("Subscription started", subscription.start_date);
        // console.log("Subscription ends", subscription.current_period_end);
        // console.log("Subscription Metadata", subscription.metadata);

        const startDate = new Date(subscription.start_date * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const endDate = new Date(subscription.current_period_end * 1000);
        // console.log("Subscription START Date FORMAT:", startDate);
        // console.log("Subscription END Date FORMAT:", endDate);

        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
            plan: "premium",
          },
        });

        await prisma.subscription.upsert({
          where: {
            userId: subscription.metadata["payingUserId"] as string,
          },
          update: {
            plan: "premium",
            period: "monthly",
            startDate: new Date(subscription.start_date * 1000),
            endDate: new Date(subscription.current_period_end * 1000),
          },
          create: {
            id: subscription.id,
            userId: subscription.metadata["payingUserId"] as string,
            plan: "premium",
            period: "monthly",
            startDate: new Date(subscription.start_date * 1000),
            endDate: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log("Subscription Created, User Updated");

        break;
      }
      // Handle subscription cancellations
      case "customer.subscription.deleted": {
        console.log("CANCEL SUBSCRIPTION");
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: {
            userId: subscription.metadata.payingUserId as string,
          },
          data: {
            endDate: new Date(), // Mark the end date as now, since it's canceled
          },
        });

        const cancelledUser = await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: false,
            plan: "free", // Set them back to free plan after cancellation
          },
        });

        console.log("Subscription Canceled, User Updated", cancelledUser);
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
        console.log(`Event: ${event}`);
    }

    // charge.succeeded
    // customer.subscription.created
    // payment_intent.succeeded
    // payment_intent.created
    return NextResponse.json({
      status: 200,
      message: "Stripe Event Received",
      event: event.type,
      response: res,
    });
  } catch (error) {
    console.error("Webhook signature verification failed.", error);
    return NextResponse.json({
      status: 400,
      message: "Stripe Event Failed",
      error,
    });
  }
}
