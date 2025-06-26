"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { LawEnforcementNav } from "@/components/law-enforcement-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { CrimeMap } from "@/components/crime-map"

export default function LawEnforcementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const reports = [
    {
      id: "REP-1234",
      type: "Theft",
      location: "123 Main St",
      date: "2023-07-10",
      time: "14:30",
      status: "new",
      priority: "medium",
      description: "Bicycle stolen from outside the library",
      reporter: "John Doe",
    },
    {
      id: "REP-1235",
      type: "Assault",
      location: "456 Oak Ave",
      date: "2023-07-09",
      time: "22:15",
      status: "investigating",
      priority: "high",
      description: "Physical altercation outside of nightclub",
      reporter: "Jane Smith",
    },
    {
      id: "REP-1236",
      type: "Vandalism",
      location: "789 Pine St",
      date: "2023-07-08",
      time: "03:45",
      status: "resolved",
      priority: "low",
      description: "Graffiti on public building",
      reporter: "Mike Johnson",
    },
    {
      id: "REP-1237",
      type: "Suspicious Activity",
      location: "321 Elm St",
      date: "2023-07-10",
      time: "19:20",
      status: "new",
      priority: "medium",
      description: "Unknown person checking car doors in parking lot",
      reporter: "Sarah Williams",
    },
    {
      id: "REP-1238",
      type: "Burglary",
      location: "654 Maple Dr",
      date: "2023-07-07",
      time: "02:10",
      status: "investigating",
      priority: "high",
      description: "Break-in at convenience store",
      reporter: "Officer Thompson",
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      searchQuery === "" ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || report.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <MobileNav />
        <div className="hidden md:block">
          <h1 className="text-xl font-bold">SafetyNet - Law Enforcement</h1>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <LawEnforcementNav />
        </aside>
        <main className="flex-1">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Law Enforcement Dashboard</h2>
            </div>

            <Tabs defaultValue="reports" className="space-y-4">
              <TabsList>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="map">Crime Map</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Incident Reports</CardTitle>
                    <CardDescription>View and manage citizen-reported incidents.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <Label htmlFor="search" className="sr-only">
                          Search
                        </Label>
                        <Input
                          id="search"
                          placeholder="Search by ID, type, location, or reporter..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="w-full md:w-48">
                        <Label htmlFor="status-filter" className="sr-only">
                          Filter by Status
                        </Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger id="status-filter">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="investigating">Investigating</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="rounded-md border">
                      <div className="grid grid-cols-7 gap-2 p-4 font-medium border-b">
                        <div>ID</div>
                        <div>Type</div>
                        <div>Location</div>
                        <div>Date/Time</div>
                        <div>Reporter</div>
                        <div>Status</div>
                        <div>Actions</div>
                      </div>
                      {filteredReports.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          No reports found matching your criteria.
                        </div>
                      ) : (
                        filteredReports.map((report) => (
                          <div key={report.id} className="grid grid-cols-7 gap-2 p-4 border-b items-center">
                            <div className="font-medium">{report.id}</div>
                            <div>{report.type}</div>
                            <div className="truncate">{report.location}</div>
                            <div>
                              {report.date}
                              <br />
                              {report.time}
                            </div>
                            <div>{report.reporter}</div>
                            <div>
                              <Badge
                                variant={
                                  report.status === "new"
                                    ? "default"
                                    : report.status === "investigating"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {report.status}
                              </Badge>
                            </div>
                            <div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Reports</CardTitle>
                      <Icons.alert className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">+5 since yesterday</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Investigating</CardTitle>
                      <Icons.shieldAlert className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                      <Icons.check className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">128</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">SOS Alerts</CardTitle>
                      <Icons.siren className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="map" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Crime Heatmap</CardTitle>
                    <CardDescription>View crime hotspots and analyze patterns.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CrimeMap type="heatmap" crimeType="all" timeRange="30" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Crime Analytics</CardTitle>
                    <CardDescription>Advanced analytics and crime prediction.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[400px] flex items-center justify-center">
                    <p className="text-muted-foreground">Advanced analytics dashboard coming soon.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

