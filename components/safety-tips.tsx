import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const tips = [
  {
    icon: <Icons.shield className="h-5 w-5" />,
    title: "Stay Aware of Your Surroundings",
    description: "Always be alert and aware of what's happening around you, especially in unfamiliar areas.",
  },
  {
    icon: <Icons.notification className="h-5 w-5" />,
    title: "Share Your Location",
    description: "Let someone know where you're going and when you expect to return, especially at night.",
  },
  {
    icon: <Icons.mapPin className="h-5 w-5" />,
    title: "Avoid Dangerous Areas",
    description: "Check the crime map before traveling to unfamiliar locations and avoid high-risk areas.",
  },
  {
    icon: <Icons.shieldAlert className="h-5 w-5" />,
    title: "Report Suspicious Activity",
    description: "If you see something suspicious, report it immediately through the app or to local authorities.",
  },
]

export function SafetyTips() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {tips.map((tip, index) => (
        <Card key={index}>
          <CardContent className="p-4 flex flex-col items-center text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">{tip.icon}</div>
            <h3 className="font-medium mb-1">{tip.title}</h3>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

