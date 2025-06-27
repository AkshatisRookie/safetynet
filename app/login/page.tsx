"use client"
// This directive tells Next.js that this is a client-side component
// Client-side components can use browser APIs, event listeners, and React hooks

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Icons } from "@/components/icons"
import Link from "next/link"
// Import Firebase authentication and Firestore functions
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/server/database/firebase"
import { getFirestore, doc, getDoc } from "firebase/firestore"

// Initialize Firestore
const db = getFirestore()

export default function LoginPage() {
  // Initialize router for navigation
  const router = useRouter()
  // State for loading spinner
  const [isLoading, setIsLoading] = useState(false)
  // State for user type (citizen or law-enforcement)
  const [userType, setUserType] = useState("citizen")
  // State for error messages
  const [error, setError] = useState("")

  // Handle form submission
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const email = (document.getElementById("email") as HTMLInputElement).value
    const password = (document.getElementById("password") as HTMLInputElement).value

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid))
      const userData = userDoc.data()

      if (!userData) {
        throw new Error("User data not found")
      }
      // Redirect based on user type
      if (userType === "citizen") {
        router.push("/dashboard")
      } else {
        router.push("/law-enforcement")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login error:", error)
        setError("Invalid email or password")
      } else {
        setError("Invalid email or password")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login to SafetyNet</CardTitle>
          <CardDescription>Enter your credentials to access the platform</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {/* Display error message if any */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            {/* Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            {/* Password input field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {/* User type selection */}
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="citizen" onValueChange={setUserType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="citizen" id="citizen" />
                  <Label htmlFor="citizen" className="cursor-pointer">
                    Citizen
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="law-enforcement" id="law-enforcement" />
                  <Label htmlFor="law-enforcement" className="cursor-pointer">
                    Law Enforcement
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            {/* Submit button with loading state */}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
            {/* Link to registration page */}
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{"  "}  
              <Link href="/register" className="underline underline-offset-4 hover:text-primary">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

