import * as React from "react";
import { cn } from "@/lib/utils";
interface ListItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  description: string;
}

const ListItem = React.forwardRef<React.ElementRef<"div">, ListItemProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <li className='list-none'>
        <div
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{label}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {description}
          </p>
        </div>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";

export default ListItem;
