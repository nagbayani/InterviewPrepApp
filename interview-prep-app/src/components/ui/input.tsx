import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// Define the input variants using cva
const inputVariants = cva(
  "flex w-full rounded-md bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground ",
  {
    variants: {
      variant: {
        default:
          "border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        destructive: "border-red-500 text-red-600 placeholder:text-red-500",
        outline: "border-none focus-visible:outline-none ",
        ghost: "border-none bg-transparent",
      },
      inputSize: {
        default: "h-10",
        sm: "h-8 text-xs px-2 py-1",
        lg: "h-12 text-lg px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, onBlur, ...props }, ref) => {
//     return (
//       <input
//         type={type}
//         // disabled:cursor-not-allowed
//         // className={cn(
//         //   "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50",
//         //   className
//         // )}
//         className={cn(
//           "flex h-10 w-full rounded-md  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none   disabled:opacity-50",
//           className
//         )}
//         ref={ref}
//         onBlur={onBlur}
//         {...props}
//       />
//     );
//   }

// Extend InputProps to include variant and inputSize from inputVariants
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, ...props }, ref) => {
    return (
      <input
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
