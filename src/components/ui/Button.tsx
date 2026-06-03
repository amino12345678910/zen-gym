import * as React from "react"
import { cn } from "@/components/layout"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-2xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zen-sage disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      default: "bg-zen-sage text-zen-offwhite hover:bg-zen-sage/90",
      outline: "border border-zen-stone bg-transparent hover:bg-zen-sand text-zen-charcoal",
      ghost: "hover:bg-zen-sand text-zen-charcoal",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 px-4",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
