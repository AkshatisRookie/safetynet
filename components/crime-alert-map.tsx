"use client"

import { useState, useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

// Mock recent alerts data
const recentAlerts = [
  {
    id: "alert-1",
    type: "Theft",
    location: "Central Park",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    description: "Bicycle theft reported near Central Park",
    severity: "medium",
  },
  {
    id: "alert-2",
    type: "Assault",
    location: "Downtown",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    description: "Physical altercation reported outside nightclub",
    severity: "high",
  },
  {
    id: "alert-3",
    type: "Suspicious Activity",
    location: "West Side",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    description: "Suspicious person checking car doors in parking lot",
    severity: "low",
  },
]

export function CrimeAlertMap() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)

  // MapTiler integration
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then(L => {
      if (!mapContainer.current) return
      // Prevent initializing twice
      if (mapRef.current) return

      mapRef.current = L.map(mapContainer.current).setView([20, 0], 2)

      L.tileLayer(
        "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=p5xhZro5kxtcZtWPSxsL",
        {
          tileSize: 512,
          zoomOffset: -1,
          attribution:
            '&copy; <a href="https://api.maptiler.com/maps/streets-v2/?key=p5xhZro5kxtcZtWPSxsL#1.0/0.00000/0.00000">MapTiler</a>',
        }
      ).addTo(mapRef.current)
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`

    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`
  }

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Crime Alerts</CardTitle>
        <CardDescription>Recent incidents reported in your area</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] w-full rounded-md overflow-hidden bg-muted/30 flex flex-col items-center justify-center">
          {/* Map container */}
          <div ref={mapContainer} className="h-full w-full" id="alert-map-container" />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Alerts</h3>
          <div className="space-y-2">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedAlert === alert.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedAlert(alert.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{alert.type}</div>
                    <div className="text-sm text-muted-foreground">{alert.description}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Location: {alert.location} • {formatRelativeTime(alert.timestamp)}
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full">
          <Icons.notification className="mr-2 h-4 w-4" />
          Subscribe to Alerts
        </Button>
      </CardContent>
    </Card>
  )
}

