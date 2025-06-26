import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-6 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold ">SafetyNet</h1>
          <p className="text-xl mt-2">Community-based crime reporting system</p>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Making Communities Safer Together</h2>
          <p className="text-xl mb-8">
            Report incidents, view crime heatmaps, and help law enforcement agencies respond more effectively to keep
            your community safe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/register">Register</Link>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Report Incidents</h3>
              <p>Easily report crimes and incidents in your area with detailed information.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">View Crime on Maps</h3>
              <p>See where incidents are occurring and to stay safe.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Emergency SOS</h3>
              <p>One-tap emergency button that sends your location and photos to authorities.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 SafetyNet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

