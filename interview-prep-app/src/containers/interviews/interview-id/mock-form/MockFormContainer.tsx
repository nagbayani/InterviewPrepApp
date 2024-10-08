// import Sidebar from "@/app/Sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import MockFormFooter from "./MockFormFooter";
import useMockFormStore from "@/_store/mock-form-store";

type TContainer = {
  children: React.ReactNode;
  className?: string;
  onNext: () => void;
  onPreviousStep?: () => void;
};

export default function MockFormContainer({
  children,
  className,
  onNext,
  onPreviousStep,
}: TContainer) {
  const { step, isSubmitted } = useMockFormStore((state) => state);
  return (
    <>
      {/* border-black border-2  */}
      <section className={cn("w-full px-6  relative", className)}>
        {/* <Sidebar /> */}
        <div className='w-full min-h-[500px] relative'>{children}</div>
        {!isSubmitted && (
          <MockFormFooter
            className='lg:inline-flex  bottom-0 left-0 right-0'
            onHandleNextStep={onNext}
            onHandlePreviousStep={onPreviousStep}
          />
        )}
      </section>
      {/* {!isSubmitted && (
        <MockFormFooter
          className={cn(
            "inline-flex lg:hidden absolute my-8 -bottom-10 left-0 right-0",
            { "-bottom-32": step === 2 }
          )}
          onHandleNextStep={onNext}
          onHandlePreviousStep={onPreviousStep}
        />
      )} */}
    </>
  );
}
