"use client"
import 'leaflet/dist/leaflet.css';
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CrimeMap } from "@/components/crime-map"
import { CrimeFilters } from "@/components/crime-filters"


export default function MapPage() {
  const [crimeType, setCrimeType] = useState("all")
  const [timeRange, setTimeRange] = useState("30")


  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Crime Map</h2>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Crime Heatmap</CardTitle>
            <CardDescription>View crime hotspots in your area based on reported incidents.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="grid gap-2 w-full md:w-1/3">
                <Label htmlFor="crime-type">Crime Type</Label>
                <Select value={crimeType} onValueChange={setCrimeType}>
                  <SelectTrigger id="crime-type">
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crimes</SelectItem>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="suspicious">Suspicious Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 w-full md:w-1/3">
                <Label htmlFor="time-range">Time Range</Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger id="time-range">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                    <SelectItem value="365">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="heatmap" className="space-y-4">
              <TabsList>
                <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
                <TabsTrigger value="markers">Markers</TabsTrigger>
                <TabsTrigger value="clusters">Clusters</TabsTrigger>
              </TabsList>
              <TabsContent value="heatmap" className="space-y-4">
                <CrimeMap type="heatmap" crimeType={crimeType} timeRange={timeRange} />
              </TabsContent>
              <TabsContent value="markers" className="space-y-4">
                <CrimeMap type="markers" crimeType={crimeType} timeRange={timeRange} />
              </TabsContent>
              <TabsContent value="clusters" className="space-y-4">
                <CrimeMap type="clusters" crimeType={crimeType} timeRange={timeRange} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Crime Statistics</CardTitle>
              <CardDescription>Breakdown of reported crimes by type in this area.</CardDescription>
            </CardHeader>
            <CardContent>
              <CrimeFilters />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Safety Score</CardTitle>
              <CardDescription>Overall safety rating for the current area.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-amber-500">72</div>
                <p className="text-sm text-muted-foreground mt-2">Moderate Risk Area</p>
                <p className="text-xs text-muted-foreground mt-1">Based on 248 reports in the last 30 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

