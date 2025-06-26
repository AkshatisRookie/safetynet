"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons"
import { useToast } from "@/components/ui/use-toast"
import "leaflet/dist/leaflet.css"

export default function ReportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reportType, setReportType] = useState("crime")
  const [crimeType, setCrimeType] = useState("")
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Report Submitted",
        description: "Your report has been successfully submitted.",
      })
      router.push("/dashboard")
    }, 2000)
  }

  function handleAttachmentChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files))
    }
  }

  // Map Picker Component Inline
  function MapPicker({ value, onChange }: { value: { lat: number; lng: number } | null, onChange: (v: { lat: number; lng: number }) => void }) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const mapRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    useEffect(() => {
      import("leaflet").then(L => {
        if (!mapContainer.current || mapRef.current) return
        mapRef.current = L.map(mapContainer.current).setView([value?.lat || 20, value?.lng || 0], 2)
        L.tileLayer(
          "https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=p5xhZro5kxtcZtWPSxsL",
          {
            tileSize: 512,
            zoomOffset: -1,
            attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>',
          }
        ).addTo(mapRef.current)
        // Define a small marker icon
        const smallIcon = L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconSize: [20, 32], // smaller than default [25, 41]
          iconAnchor: [10, 32],
          popupAnchor: [1, -34],
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          shadowSize: [32, 32],
        })
        if (value) {
          markerRef.current = L.marker([value.lat, value.lng], { draggable: true, icon: smallIcon }).addTo(mapRef.current)
          markerRef.current.on("dragend", (e: any) => {
            const { lat, lng } = e.target.getLatLng()
            onChange({ lat, lng })
          })
        }
        mapRef.current.on("click", (e: any) => {
          const { lat, lng } = e.latlng
          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng])
          } else {
            markerRef.current = L.marker([lat, lng], { draggable: true, icon: smallIcon }).addTo(mapRef.current)
            markerRef.current.on("dragend", (e: any) => {
              const { lat, lng } = e.target.getLatLng()
              onChange({ lat, lng })
            })
          }
          onChange({ lat, lng })
        })
        // Store the icon for later use
        markerRef.current && (markerRef.current.options.icon = smallIcon)
        mapRef.current._smallIcon = smallIcon
      })
      return () => {
        if (mapRef.current) {
          mapRef.current.remove()
          mapRef.current = null
        }
      }
    }, [])

    useEffect(() => {
      if (mapRef.current && value && markerRef.current) {
        markerRef.current.setLatLng([value.lat, value.lng])
        mapRef.current.setView([value.lat, value.lng], mapRef.current.getZoom())
        // Update marker icon to small if needed
        if (mapRef.current._smallIcon) {
          markerRef.current.setIcon(mapRef.current._smallIcon)
        }
      }
    }, [value])

    const handleGeolocate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const { latitude, longitude } = pos.coords
          onChange({ lat: latitude, lng: longitude })
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15)
          }
        })
      }
    }

    return (
      <div>
        <div ref={mapContainer} className="h-64 w-full rounded-md mb-2" />
        <Button type="button" onClick={handleGeolocate} className="mb-2">
          Use My Current Location
        </Button>
        {value && (
          <div className="text-xs text-muted-foreground">
            Selected: {value.lat.toFixed(5)}, {value.lng.toFixed(5)}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Report an Incident</h2>
      </div>

      <Tabs defaultValue="crime" onValueChange={setReportType}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="crime">Crime Report</TabsTrigger>
          <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="crime" className="space-y-4">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Report a Crime</CardTitle>
                <CardDescription>Provide details about a crime you witnessed or experienced.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="crime-type">Type of Crime</Label>
                    <Select value={crimeType} onValueChange={setCrimeType} required>
                      <SelectTrigger id="crime-type">
                        <SelectValue placeholder="Select crime type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="assault">Assault</SelectItem>
                        <SelectItem value="vandalism">Vandalism</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="burglary">Burglary</SelectItem>
                        <SelectItem value="harassment">Harassment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <MapPicker value={location} onChange={setLocation} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date of Incident</Label>
                    <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time of Incident</Label>
                    <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide as much detail as possible about what happened"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Photos, Videos, Documents)</Label>
                  <Input id="attachments" type="file" multiple onChange={handleAttachmentChange} />
                  {attachments.length > 0 && (
                    <div className="text-sm text-muted-foreground">{attachments.length} file(s) selected</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="suspicious" className="space-y-4">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Report Suspicious Activity</CardTitle>
                <CardDescription>Report any suspicious behavior or activity in your area.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <MapPicker value={location} onChange={setLocation} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sus-date">Date</Label>
                    <Input id="sus-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sus-time">Time</Label>
                    <Input id="sus-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sus-description">Description of Activity</Label>
                  <Textarea
                    id="sus-description"
                    placeholder="Describe the suspicious activity in detail"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sus-attachments">Attachments (Photos, Videos)</Label>
                  <Input id="sus-attachments" type="file" multiple onChange={handleAttachmentChange} />
                  {attachments.length > 0 && (
                    <div className="text-sm text-muted-foreground">{attachments.length} file(s) selected</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Provide Feedback</CardTitle>
                <CardDescription>
                  Share your feedback about the SafetyNet platform or law enforcement response.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">Feedback Type</Label>
                  <Select required>
                    <SelectTrigger id="feedback-type">
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="app">App Feedback</SelectItem>
                      <SelectItem value="police">Police Response</SelectItem>
                      <SelectItem value="community">Community Safety</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-description">Your Feedback</Label>
                  <Textarea
                    id="feedback-description"
                    placeholder="Please provide your detailed feedback"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-attachments">Attachments (Optional)</Label>
                  <Input id="feedback-attachments" type="file" multiple onChange={handleAttachmentChange} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

