import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

// Mock notifications data
const notifications = [
  {
    id: "notif-1",
    title: "New Crime Report",
    description: "A new theft was reported near your saved location",
    time: "2 hours ago",
    read: false,
    type: "alert",
  },
  {
    id: "notif-2",
    title: "Report Status Update",
    description: "Your report #1234 has been reviewed by law enforcement",
    time: "Yesterday",
    read: true,
    type: "update",
  },
  {
    id: "notif-3",
    title: "Safety Alert",
    description: "Increased reports of suspicious activity in your area",
    time: "2 days ago",
    read: false,
    type: "alert",
  },
  {
    id: "notif-4",
    title: "Community Update",
    description: "New neighborhood watch group formed in your area",
    time: "1 week ago",
    read: true,
    type: "info",
  },
]

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button variant="outline" size="sm">
          <Icons.check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>Stay updated on crime reports and alerts in your area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.read ? "bg-background" : "bg-muted/30"}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className={`mt-0.5 ${notification.read ? "text-muted-foreground" : "text-primary"}`}>
                        {notification.type === "alert" ? (
                          <Icons.alert className="h-5 w-5" />
                        ) : notification.type === "update" ? (
                          <Icons.refresh className="h-5 w-5" />
                        ) : (
                          <Icons.info className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icons.more className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

