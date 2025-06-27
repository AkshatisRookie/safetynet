"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"
import type { Map as LeafletMap } from "leaflet"

// Mock crime data for demonstration
const crimeData = [
  { id: 1, type: "theft", date: "2023-06-15", location: "Central Park" },
  { id: 2, type: "assault", date: "2023-06-18", location: "Downtown" },
  { id: 3, type: "vandalism", date: "2023-06-20", location: "West Side" },
  { id: 4, type: "theft", date: "2023-06-22", location: "East Side" },
  { id: 5, type: "fraud", date: "2023-06-25", location: "North Side" },
]

interface CrimeMapProps {
  type: string;
  crimeType: string
  timeRange: string
}

export function CrimeMap({ crimeType, timeRange }: CrimeMapProps) {
  // Filter crime data based on props
  const filteredData = crimeData.filter((crime) => {
    const matchesType = crimeType === "all" || crime.type === crimeType
    return matchesType
  })

  // MapTiler integration
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  useEffect(() => {
    // Dynamically import leaflet to avoid SSR issues
    import("leaflet").then(L => {
      if (!mapContainer.current) return;
      // Prevent initializing twice
      if (mapRef.current) return;

      mapRef.current = L.map(mapContainer.current).setView([20, 0], 2);

      L.tileLayer(
        "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=p5xhZro5kxtcZtWPSxsL",
        {
          tileSize: 512,
          zoomOffset: -1,
          attribution:
            '&copy; <a href="https://api.maptiler.com/maps/streets-v2/?key=p5xhZro5kxtcZtWPSxsL#1.0/0.00000/0.00000">MapTiler</a>',
        }
      ).addTo(mapRef.current as L.Map);
    });

    return () => {
      if (mapRef.current as L.Map) {
        (mapRef.current as L.Map).remove();
        mapRef.current= null;
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crime Reports</CardTitle>
        <CardDescription>
          Showing {crimeType === "all" ? "all crimes" : crimeType} from the last {timeRange} days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full rounded-md overflow-hidden bg-muted/30 flex flex-col items-center justify-center mb-4">
          {/* Map container */}
          <div ref={mapContainer} className="h-full w-full" id="cyber-map-container" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recent Reports</h3>
          {filteredData.map((crime) => (
            <div key={crime.id} className="p-3 border rounded-md">
              <div className="font-medium capitalize">{crime.type}</div>
              <div className="text-sm text-muted-foreground">Location: {crime.location}</div>
              <div className="text-xs text-muted-foreground">Reported: {crime.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

