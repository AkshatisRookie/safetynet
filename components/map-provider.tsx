"use client"

import { createContext, useContext, type ReactNode } from "react"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface MapContextType {
  isConfigured: boolean
}

const MapContext = createContext<MapContextType>({
  isConfigured: true,
})

export function useMap() {
  return useContext(MapContext)
}

interface MapProviderProps {
  children: ReactNode
}

export function MapProvider({ children }: MapProviderProps) {
  return (
    <MapContext.Provider value={{ isConfigured: true }}>{children}</MapContext.Provider>
  )
}

export function MapSetup() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Map View</CardTitle>
        <CardDescription>Interactive map view of crime data</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full rounded-md overflow-hidden bg-muted/30 flex flex-col items-center justify-center">
          <Icons.map className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Map view is currently disabled</p>
        </div>
      </CardContent>
    </Card>
  )
}

