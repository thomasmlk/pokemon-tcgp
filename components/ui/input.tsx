import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "flex bg-background rounded-full shadow-neumorphism h-11 px-5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
