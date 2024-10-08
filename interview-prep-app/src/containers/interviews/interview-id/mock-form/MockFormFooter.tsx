"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useMockFormStore from "@/_store/mock-form-store";
type TFooter = {
  className?: string;
  onHandleNextStep?: () => void;
  onHandlePreviousStep?: () => void;
};

export default function MockFormFooter({
  className,
  onHandleNextStep,
  onHandlePreviousStep,
}: TFooter) {
  const step = useMockFormStore((state) => state.step);
  return (
    <footer
      className={cn(
        "p-4 bg-c-neutral-white w-full flex items-center justify-between",
        className
      )}
    >
      {step === 1 && <div className='w-full' />}

      {step > 1 && (
        <Button
          variant='ghost'
          className='text-c-neutral-cool-gray hover:text-c-primary-marine-blue'
          onClick={onHandlePreviousStep}
        >
          Go Back
        </Button>
      )}
      <Button
        className={cn(" text-white hover:bg-c-primary-marine-blue-hover", {
          "bg-blue-700 hover:bg-blue-500": step === 4,
        })}
        onClick={onHandleNextStep}
      >
        {step === 4 ? "Confirm" : "Next"}
      </Button>
    </footer>
  );
}
