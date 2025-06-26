import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const reports = [
  {
    id: "1",
    title: "Theft",
    description: "Bicycle stolen from outside the library",
    date: "2 hours ago",
    status: "active",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      initials: "AJ",
    },
  },
  {
    id: "2",
    title: "Vandalism",
    description: "Graffiti on the wall of Central Park",
    date: "5 hours ago",
    status: "investigating",
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg",
      initials: "SM",
    },
  },
  {
    id: "3",
    title: "Suspicious Activity",
    description: "Unknown person checking car doors on Oak Street",
    date: "Yesterday",
    status: "resolved",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      initials: "MC",
    },
  },
  {
    id: "4",
    title: "Noise Complaint",
    description: "Loud music from apartment 302 at midnight",
    date: "2 days ago",
    status: "resolved",
    user: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg",
      initials: "EW",
    },
  },
]

export function RecentReports() {
  return (
    <div className="space-y-8">
      {reports.map((report) => (
        <div key={report.id} className="flex items-start gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={report.user.avatar} alt={report.user.name} />
            <AvatarFallback>{report.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{report.title}</p>
              <Badge
                variant={
                  report.status === "active" ? "default" : report.status === "investigating" ? "secondary" : "outline"
                }
              >
                {report.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{report.description}</p>
            <p className="text-xs text-muted-foreground">{report.date}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

