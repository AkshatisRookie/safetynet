"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import { useMap } from "@/components/map-provider"
import { MapSetup } from "@/components/map-provider"

interface LocationPickerProps {
  value: string
  onChange: (value: string) => void
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const { toast } = useToast()
  const [isMapVisible, setIsMapVisible] = useState(false)
  const { isConfigured } = useMap()

  function handleGetLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
          setIsMapVisible(true)
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Unable to get your current location. Please enter it manually.",
          })
        },
      )
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation. Please enter location manually.",
      })
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="location">Location</Label>
      <div className="flex gap-2">
        <Input
          id="location"
          placeholder="Latitude, Longitude"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="button" variant="outline" size="icon" onClick={handleGetLocation} title="Get current location">
          <Icons.mapPin className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsMapVisible(!isMapVisible)}
          title={isMapVisible ? "Hide map" : "Show map"}
        >
          <Icons.map className="h-4 w-4" />
        </Button>
      </div>

      {isMapVisible && !isConfigured && (
        <div className="mt-2">
          <MapSetup />
        </div>
      )}

      {isMapVisible && isConfigured && (
        <div className="h-[300px] w-full rounded-md mt-2 border bg-muted/30 flex flex-col items-center justify-center">
          <Icons.map className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Map placeholder - would show location at {value || "selected coordinates"}
          </p>
        </div>
      )}
    </div>
  )
}

