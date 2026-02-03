import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-[#76b04f] text-[#111311] hover:bg-[#91c072]",
        destructive:
          "bg-[#b4524b] text-white hover:bg-[#c3756f] focus-visible:ring-[#b4524b]/20 dark:focus-visible:ring-[#b4524b]/40",
        outline:
          "border border-[#475643] bg-[#2f372f]/50 text-[#e4e9e2] shadow-xs hover:bg-[#2f372f] hover:text-[#91c072] hover:border-[#76b04f]/40",
        secondary:
          "bg-[#2f372f] text-[#e4e9e2] hover:bg-[#475643] hover:text-[#f1f4f1] border border-[#475643] hover:border-[#76b04f]/30",
        ghost:
          "text-[#c8d2c6] hover:bg-[#2f372f]/60 hover:text-[#f1f4f1]",
        link: "text-[#76b04f] underline-offset-4 hover:text-[#91c072] hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
