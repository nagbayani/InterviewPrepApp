import * as React from "react";

import { cn } from "@/lib/utils";
import { ValueNoneIcon } from "@radix-ui/react-icons";

export interface CardInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CardInput = React.forwardRef<HTMLInputElement, CardInputProps>(
  ({ className, type, onBlur, onChange, value, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full text-[20px] cursor-pointer rounded-md border border-input bg-background px-2 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        style={{
          //     // display: "inline-block",
          //     // padding: "0.5rem 0.5rem",
          //     // cursor: "pointer",
          fontSize: "20px",
        }}
        {...props}
      />
    );
  }
);
CardInput.displayName = "CardInput";

export { CardInput };
