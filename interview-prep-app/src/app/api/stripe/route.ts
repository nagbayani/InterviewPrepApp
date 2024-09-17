import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

/**
 *
 * Get the subscription status of the user from Stripe
 * @returns subscription status
 */
export async function GET(req: NextRequest) {
  const user = await currentUser();

  // Error handling: Check if the user is signed in
  if (!user.session?.user) {
    return NextResponse.json({
      status: 401,
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }

  // Fetch the user from the database
  const userStripe = await prisma.user.findUnique({
    where: { id: user.session.user.id },
  });

  // Check if the user has a valid Stripe customer ID
  if (!userStripe?.stripeCustomerId) {
    return NextResponse.json({
      status: 400,
      error: {
        code: "no-stripe-customer",
        message: "No valid Stripe customer ID found for the user.",
      },
    });
  }

  try {
    // Retrieve the user's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: userStripe.stripeCustomerId,
      limit: 1, // Fetch only the latest subscription
    });

    // Check if the user has any subscription
    if (!subscriptions.data || subscriptions.data.length === 0) {
      return NextResponse.json({
        status: 404,
        error: {
          code: "no-subscription",
          message: "No subscription found for the user.",
        },
      });
    }

    // Get the subscription information
    const subscription = subscriptions.data[0];
    const status = subscription.status; // active, canceled, etc.
    const cancelAtPeriodEnd = subscription.cancel_at_period_end; // true or false
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000); // End of the billing period

    // Return the subscription status
    return NextResponse.json({
      message: "Subscription status retrieved successfully",
      status: 200,
      subscriptionStatus: status,
      cancelAtPeriodEnd: cancelAtPeriodEnd,
      currentPeriodEnd: currentPeriodEnd,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 400,
      message: "Failed to retrieve the subscription status",
      error,
    });
  }
}

/**
 * Create a new subscription for the user
 */
export async function POST() {
  // This object will contain the user's data if the user is signed in
  const user = await currentUser();
  // Error handling
  if (!user.session?.user) {
    return NextResponse.json({
      status: 401,
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }
  const userStripe = await prisma.user.findUnique({
    where: { id: user.session.user.id },
  });

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: userStripe?.stripeCustomerId, // Ensure this is a valid Stripe customer ID
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/?cancelledPayment=true",
      subscription_data: {
        metadata: {
          payingUserId: String(user.session?.user.id), // Casts the user ID to a string
        },
      },
    } as Stripe.Checkout.SessionCreateParams);

    if (!checkoutSession.url) {
      return NextResponse.json({
        status: 500,
        message: "Could not create checkout session",
        error: "stripe-error Could not create checkout session",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Successful Checkout",
      redirectUrl: checkoutSession.url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 400,
      message: "Stripe Event Failed",
      error,
    });
  }
}

export async function DELETE() {
  const user = await currentUser();

  // Error handling
  if (!user.session?.user) {
    return NextResponse.json({
      status: 401,
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }

  // Fetch the user from the database
  const userStripe = await prisma.user.findUnique({
    where: { id: user.session.user.id },
  });

  // Check if the user has a valid Stripe customer ID
  if (!userStripe?.stripeCustomerId) {
    return NextResponse.json({
      status: 400,
      error: {
        code: "no-stripe-customer",
        message: "No valid Stripe customer ID found for the user.",
      },
    });
  }

  // Fetch the user's active subscription from the database
  // const userSubscription = await prisma.subscription.findUnique({
  //   where: { userId: user.session.user.id },
  // });

  // if (!userSubscription) {
  //   return NextResponse.json({
  //     status: 404,
  //     error: {
  //       code: "no-subscription",
  //       message: "No active subscription found for the user.",
  //     },
  //   });
  // }

  try {
    // Retrieve the user's subscriptions from Stripe
    const subscriptions = await stripe.subscriptions.list({
      customer: userStripe.stripeCustomerId,
      status: "active", // Only fetch active subscriptions
      limit: 1, // Fetch only the latest active subscription
    });

    // Check if the user has an active subscription
    if (!subscriptions.data || subscriptions.data.length === 0) {
      return NextResponse.json({
        status: 404,
        error: {
          code: "no-subscription",
          message: "No active subscription found for the user.",
        },
      });
    }
    // Get the subscription ID of the first active subscription
    const subscriptionId = subscriptions.data[0].id;

    // Cancel the subscription on Stripe, using subscription id
    const cancelledSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );

    // CORRECT: Set the subscription to cancel at the end of the billing cycle
    // const cancelledSubscription = await stripe.subscriptions.update(
    //   subscriptionId,
    //   {
    //     cancel_at_period_end: true, // Set this to cancel at the end of the billing cycle
    //   }
    // );

    return NextResponse.json({
      status: 200,
      message: "Subscription canceled successfully",
      subscription: cancelledSubscription,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 400,
      message: "Failed to cancel the subscription",
      error,
    });
  }
}
