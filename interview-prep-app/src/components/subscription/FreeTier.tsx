import React from "react";
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

export const FreeTier = ({ className, ...props }: CardProps) => {
  return (
    <Card className={cn("w-[380px] flex flex-col", className)} {...props}>
      <CardHeader>
        <CardTitle>Interfluent Free</CardTitle>
        <CardDescription>
          Get started with essential features for interview preparation.
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='text-center'>
          <span className='text-4xl font-bold'>$0</span>
          <span className='text-sm text-muted-foreground'> / per month</span>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              7 Starter Decks with Questions
            </p>
            <p className='text-sm text-muted-foreground'>
              Access 7 starter decks filled with questions to help you get
              started.
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              3 AI-Generated Bundles (30 Questions)
            </p>
            <p className='text-sm text-muted-foreground'>
              Get up to 3 AI-generated bundles of questions (approximately 30
              questions).
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              5 Generated Answers
            </p>
            <p className='text-sm text-muted-foreground'>
              Receive AI-generated answers for 5 questions.
            </p>
          </div>
        </div>

        <div className='flex items-center space-x-4 rounded-md border p-2'>
          <div className='flex-1 space-y-1'>
            <p className='text-sm font-medium leading-none'>
              5 Generated Feedback
            </p>
            <p className='text-sm text-muted-foreground'>
              Get detailed feedback generated for 5 answers.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Get Started for Free</Button>
      </CardFooter>
    </Card>
  );
};
