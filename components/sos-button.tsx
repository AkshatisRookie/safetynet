"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function SosButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [frontCameraStream, setFrontCameraStream] = useState<MediaStream | null>(null)
  const [backCameraStream, setBackCameraStream] = useState<MediaStream | null>(null)
  const { toast } = useToast()

  async function handleSOS() {
    setIsOpen(true)
    try {
      // Get front camera
      const frontStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      setFrontCameraStream(frontStream)

      // Try to get back camera if available
      try {
        const backStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        })
        setBackCameraStream(backStream)
      } catch (error) {
        console.log("Back camera not available:", error)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      toast({
        variant: "destructive",
        title: "Camera access denied",
        description: "Please enable camera access to use the SOS feature.",
      })
    }
  }

  function handleConfirmSOS() {
    setIsSending(true)

    // Simulate sending SOS alert
    setTimeout(() => {
      setIsSending(false)
      setIsOpen(false)

      // Stop camera streams
      if (frontCameraStream) {
        frontCameraStream.getTracks().forEach((track) => track.stop())
        setFrontCameraStream(null)
      }
      if (backCameraStream) {
        backCameraStream.getTracks().forEach((track) => track.stop())
        setBackCameraStream(null)
      }

      toast({
        title: "SOS Alert Sent",
        description: "Emergency services have been notified of your location.",
      })
    }, 2000)
  }

  function handleCancel() {
    // Stop camera streams
    if (frontCameraStream) {
      frontCameraStream.getTracks().forEach((track) => track.stop())
      setFrontCameraStream(null)
    }
    if (backCameraStream) {
      backCameraStream.getTracks().forEach((track) => track.stop())
      setBackCameraStream(null)
    }

    setIsOpen(false)
  }

  return (
    <>
      <Button variant="destructive" size="sm" className="rounded-full" onClick={handleSOS}>
        <Icons.siren className="h-4 w-4 mr-2" />
        SOS
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-destructive">Emergency SOS Alert</DialogTitle>
            <DialogDescription className="text-center">
              This will send your current location and camera photos to nearby law enforcement agencies.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
              {frontCameraStream ? (
                <video
                  autoPlay
                  playsInline
                  muted
                  ref={(videoRef) => {
                    if (videoRef && frontCameraStream) {
                      videoRef.srcObject = frontCameraStream
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Icons.camera className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs">Front Camera</div>
            </div>

            <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
              {backCameraStream ? (
                <video
                  autoPlay
                  playsInline
                  muted
                  ref={(videoRef) => {
                    if (videoRef && backCameraStream) {
                      videoRef.srcObject = backCameraStream
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Icons.camera className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 rounded text-xs">Back Camera</div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={isSending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmSOS} disabled={isSending} className="gap-2">
              {isSending && <Icons.spinner className="h-4 w-4 animate-spin" />}
              {isSending ? "Sending Alert..." : "Send SOS Alert"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

