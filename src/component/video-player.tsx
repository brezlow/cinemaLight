"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Lightbulb } from "lucide-react"

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ambientColor, setAmbientColor] = useState("rgba(0, 0, 0, 0.8)")
  const [ambientLightEnabled, setAmbientLightEnabled] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorExtractionInterval = useRef<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const toggleAmbientLight = () => {
    setAmbientLightEnabled(!ambientLightEnabled)
  }

  // Extract dominant color from video frame
  const extractDominantColor = () => {
    if (!videoRef.current || !canvasRef.current || !ambientLightEnabled) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    try {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Sample pixels from the edge of the frame for better ambient effect
      const edgePixels: number[] = []

      // Sample top and bottom edges
      for (let x = 0; x < canvas.width; x += Math.max(1, Math.floor(canvas.width / 20))) {
        // Top edge
        const topData = ctx.getImageData(x, 0, 1, 1).data
        edgePixels.push(topData[0], topData[1], topData[2])

        // Bottom edge
        const bottomData = ctx.getImageData(x, canvas.height - 1, 1, 1).data
        edgePixels.push(bottomData[0], bottomData[1], bottomData[2])
      }

      // Sample left and right edges
      for (let y = 0; y < canvas.height; y += Math.max(1, Math.floor(canvas.height / 20))) {
        // Left edge
        const leftData = ctx.getImageData(0, y, 1, 1).data
        edgePixels.push(leftData[0], leftData[1], leftData[2])

        // Right edge
        const rightData = ctx.getImageData(canvas.width - 1, y, 1, 1).data
        edgePixels.push(rightData[0], rightData[1], rightData[2])
      }

      // Simple k-means to find dominant color (simplified version)
      let r = 0,
        g = 0,
        b = 0

      // Calculate average color
      for (let i = 0; i < edgePixels.length; i += 3) {
        r += edgePixels[i]
        g += edgePixels[i + 1]
        b += edgePixels[i + 2]
      }

      const pixelCount = edgePixels.length / 3
      r = Math.floor(r / pixelCount)
      g = Math.floor(g / pixelCount)
      b = Math.floor(b / pixelCount)

      // Set the ambient color with some opacity for better effect
      setAmbientColor(`rgba(${r}, ${g}, ${b}, 0.8)`)
    } catch (error) {
      console.error("Error extracting color:", error)
      // Fallback to a default color based on video playback position
      // This creates a color-cycling effect when the direct extraction fails
      const hue = (currentTime * 10) % 360
      setAmbientColor(`hsla(${hue}, 70%, 50%, 0.8)`)
    }
  }

  // Add this function after the extractDominantColor function
  const generateFallbackColor = () => {
    if (!videoRef.current || !ambientLightEnabled) return

    // Generate color based on video position for a dynamic effect
    // when direct pixel extraction isn't possible
    const hue = (currentTime * 10) % 360
    const saturation = 70
    const lightness = 50

    setAmbientColor(`hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`)
  }

  // Set up color extraction interval
  useEffect(() => {
    if (isPlaying && ambientLightEnabled) {
      try {
        // Extract color immediately
        extractDominantColor()

        // Then set up interval to extract color every second
        colorExtractionInterval.current = setInterval(extractDominantColor, 1000)
      } catch (error) {
        console.error("Could not set up color extraction:", error)
        // Use fallback method instead
        generateFallbackColor()
        colorExtractionInterval.current = setInterval(generateFallbackColor, 1000)
      }
    }

    return () => {
      if (colorExtractionInterval.current) {
        clearInterval(colorExtractionInterval.current)
      }
    }
  }, [isPlaying, ambientLightEnabled, currentTime])

  return (
    <div
      className="relative rounded-lg overflow-hidden transition-all duration-1000 ease-in-out"
      style={{
        background: ambientLightEnabled ? ambientColor : "black",
        boxShadow: ambientLightEnabled ? `0 0 50px 5px ${ambientColor}` : "none",
        padding: "0px",
      }}
    >
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="/placeholder.svg?height=720&width=1280"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          crossOrigin="anonymous"
        />

        <canvas
          ref={canvasRef}
          className="hidden" // Hide the canvas element
        />

        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition"
            >
              <Play className="w-10 h-10 text-white fill-white" />
            </button>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500"
            />

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-gray-300">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button onClick={toggleMute} className="hover:text-gray-300">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <span className="text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleAmbientLight}
                  className={`hover:text-gray-300 ${ambientLightEnabled ? "text-yellow-400" : "text-white"}`}
                  title="Toggle ambient light"
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
                <button onClick={enterFullscreen} className="hover:text-gray-300">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
