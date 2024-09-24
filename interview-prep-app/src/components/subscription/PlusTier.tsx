"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export const PlusTier = ({ className, ...props }: CardProps) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { redirectUrl } = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Checkout failed:", error);
      setLoading(false);
    }
  };
  return (
    <Card className={cn("w-[380px] flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle>Interfluent Plus+</CardTitle>
        <CardDescription>
          Unlock premium features to supercharge your interview preparation.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='text-center'>
          <span className='text-4xl font-bold'>$3.99</span>
          <span className='text-sm text-muted-foreground'> / per month</span>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Unlimited AI Question Generations
            </p>
            <p className='text-sm text-muted-foreground'>
              Generate an unlimited number of interview questions tailored to
              your needs.
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Unlimited AI Feedback
            </p>
            <p className='text-sm text-muted-foreground'>
              Receive detailed feedback on all your mock interview answers.
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Unlimited Mock Interviews
            </p>
            <p className='text-sm text-muted-foreground'>
              Practice as many mock interviews as you need to be fully prepared.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={handleCheckout}>
          Get Interfluent Plus+
        </Button>
      </CardFooter>
    </Card>
  );
};
