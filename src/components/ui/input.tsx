import * as React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  showSearchIcon?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, showSearchIcon = true, ...props }, ref) => {
    return (
      <div className="relative">
        {showSearchIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-2xl bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
            showSearchIcon && "pl-9",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
