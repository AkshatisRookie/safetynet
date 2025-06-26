"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Icons.logo className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/map",
      label: "Crime Map",
      icon: <Icons.mapPin className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/map",
    },
    {
      href: "/dashboard/report",
      label: "Report Crime",
      icon: <Icons.alert className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/report",
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
      icon: <Icons.notification className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/notifications",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Icons.settings className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/settings",
    },
    {
      href: "/dashboard/settings/map-config",
      label: "Map Configuration",
      icon: <Icons.map className="mr-2 h-4 w-4" />,
      active: pathname === "/dashboard/settings/map-config",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Icons.logo className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="grid gap-2 py-6">
          <h1 className="text-xl font-bold px-4">SafetyNet</h1>
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn("justify-start", route.active && "bg-muted")}
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={route.href}>
                  {route.icon}
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

