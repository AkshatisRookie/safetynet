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
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/server/database/firebase"
import { getFirestore, doc, setDoc } from "firebase/firestore"

// Initialize Firestore
const db = getFirestore()

export default function RegisterPage() {
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
    const confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value
    const firstName = (document.getElementById("first-name") as HTMLInputElement).value
    const lastName = (document.getElementById("last-name") as HTMLInputElement).value
    let badgeNumber=null;
    if (userType=="law-enforcement"){
      badgeNumber=(document.getElementById("badge-number") as HTMLInputElement).value
    }
    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Store additional user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        email,
        userType,
        badgeNumber,
        createdAt: new Date().toISOString()
      })
      
      // Redirect to login page after successful registration
      router.push("/login")
    } catch (error: unknown) {
      console.error("Registration error:", error)
      if (typeof error === "object" && error !== null && "code" in error) {
        const code = (error as { code: string }).code
        if (code === "auth/email-already-in-use") {
          setError("This email is already registered")
        } else if (code === "auth/weak-password") {
          setError("Password should be at least 6 characters")
        } else {
          setError("Registration failed")
        }
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create your SafetyNet account</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {/* Display error message if any */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            {/* Name fields in a two-column grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" required />
              </div>
            </div>
            {/* Email input field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required />
            </div>
            {/* Password input fields */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            {/* User type selection */}
            <div className="space-y-2">
              <Label>Account Type</Label>
              <RadioGroup defaultValue="citizen" onValueChange={setUserType} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="citizen" id="r-citizen" />
                  <Label htmlFor="r-citizen" className="cursor-pointer">
                    Citizen
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="law-enforcement" id="r-law-enforcement" />
                  <Label htmlFor="r-law-enforcement" className="cursor-pointer">
                    Law Enforcement
                  </Label>
                </div>
              </RadioGroup>
              {/* Show badge number field only for law enforcement */}
              {userType === "law-enforcement" && (
                <div className="pt-2">
                  <Label htmlFor="badge-number">Badge/ID Number</Label>
                  <Input id="badge-number" className="mt-1" required />
                  <p className="text-xs text-muted-foreground mt-1">
                    Law enforcement accounts require verification before approval.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            {/* Submit button with loading state */}
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
            {/* Link to login page */}
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

