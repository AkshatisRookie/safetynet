"use client"

import * as React from "react"
import DayPicker from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  
}: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        container: "",
        interactionDisabled: "",
        navBar: "",
        navButtonPrev: "",
        navButtonNext: "",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        weekdays: "",
        weekdaysRow: "",
        weekday: "",
        body: "",
        week: "",
        today: "",
        selected: "",
        disabled: "",
        outside: "",
        ...Object.fromEntries(
          Object.entries(classNames ?? {}).filter(([, v]) => typeof v === "string")
        ),
      }}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
