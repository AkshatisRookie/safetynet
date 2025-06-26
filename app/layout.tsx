import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MapProvider } from "@/components/map-provider"
import '../styles/global.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SafetyNet - Crime Reporting System",
  description: "Report crimes and view crime heatmaps in your area",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MapProvider>{children}</MapProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

