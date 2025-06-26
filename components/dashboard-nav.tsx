"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function DashboardNav() {
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
    }
  ]

  return (
    <nav className="grid gap-1 p-4">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={route.active ? "secondary" : "ghost"}
          className={cn("justify-start", route.active && "bg-muted")}
          asChild
        >
          <Link href={route.href}>
            {route.icon}
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}

