import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-[#76b04f] text-[#111311] [a&]:hover:bg-[#91c072]",
        secondary:
          "bg-[#2f372f] text-[#91a58d] border-[#475643] [a&]:hover:bg-[#475643]",
        destructive:
          "bg-[#b4524b] text-white [a&]:hover:bg-[#c3756f] focus-visible:ring-[#b4524b]/20 dark:focus-visible:ring-[#b4524b]/40",
        outline:
          "border-[#475643] text-[#f1f4f1] [a&]:hover:bg-[#2f372f] [a&]:hover:text-[#76b04f]",
        ghost: "[a&]:hover:bg-[#2f372f] [a&]:hover:text-[#76b04f]",
        link: "text-[#76b04f] underline-offset-4 [a&]:hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
