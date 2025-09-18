"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WeatherAnimationProps {
  weather: string
  className?: string
}

export function WeatherAnimation({ weather, className = "" }: WeatherAnimationProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`w-32 h-32 ${className}`} />
  }

  const renderAnimation = () => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return (
          <div className="relative w-32 h-32">
            {/* Sun */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            {/* Sun rays */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-t from-yellow-400 to-transparent"
                style={{
                  top: "-16px",
                  left: "50%",
                  transformOrigin: "50% 80px",
                  transform: `translateX(-50%) rotate(${i * 45}deg)`,
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
              />
            ))}
          </div>
        )

      case "rainy":
        return (
          <div className="relative w-32 h-32">
            {/* Cloud */}
            <div className="absolute top-4 left-4 w-24 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full" />
            <div className="absolute top-6 left-8 w-16 h-12 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" />
            <div className="absolute top-8 left-12 w-12 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full" />
            {/* Rain drops */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full"
                style={{
                  left: `${20 + (i % 4) * 15}px`,
                  top: "60px",
                }}
                animate={{
                  y: [0, 40, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )

      case "winter":
        return (
          <div className="relative w-32 h-32">
            {/* Snowflakes */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-blue-200 text-2xl"
                style={{
                  left: `${Math.random() * 100}px`,
                  top: `${Math.random() * 100}px`,
                }}
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                ❄
              </motion.div>
            ))}
            {/* Ice crystal center */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <div className="w-16 h-16 border-4 border-blue-300 rounded-full relative">
                <div className="absolute inset-2 border-2 border-blue-400 rounded-full" />
                <div className="absolute inset-4 border border-blue-500 rounded-full" />
              </div>
            </motion.div>
          </div>
        )

      case "cloudy":
        return (
          <div className="relative w-32 h-32">
            {/* Multiple clouds */}
            <motion.div
              className="absolute top-2 left-2 w-20 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-80"
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-8 left-6 w-24 h-14 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-90"
              animate={{ x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-12 left-4 w-18 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-70"
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        )

      default:
        return (
          <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
            <span className="text-4xl">?</span>
          </div>
        )
    }
  }

  return <div className={`flex items-center justify-center ${className}`}>{renderAnimation()}</div>
}
