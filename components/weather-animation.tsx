"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface WeatherAnimationProps {
  weather: string
  className?: string
}

export function WeatherAnimation({ weather, className = "" }: WeatherAnimationProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={`w-32 h-32 ${className}`} />
  }

  const isDark = theme === "dark"

  const renderAnimation = () => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return (
          <div className="relative w-32 h-32">
            <motion.div
              className={`absolute inset-0 rounded-full ${
                isDark
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-[0_0_40px_rgba(251,191,36,0.6)]"
                  : "bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_0_30px_rgba(251,191,36,0.4)]"
              }`}
              animate={{
                rotate: 360,
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
              style={{ willChange: "transform" }}
            />
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-10 rounded-full ${
                  isDark
                    ? "bg-gradient-to-t from-yellow-400 via-yellow-300 to-transparent"
                    : "bg-gradient-to-t from-yellow-400 via-yellow-200 to-transparent"
                }`}
                style={{
                  top: "-20px",
                  left: "50%",
                  transformOrigin: "50% 84px",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  willChange: "opacity, transform",
                }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-yellow-200" : "bg-yellow-400"}`}
                style={{
                  left: `${40 + Math.cos((i * 60 * Math.PI) / 180) * 50}px`,
                  top: `${40 + Math.sin((i * 60 * Math.PI) / 180) * 50}px`,
                  willChange: "opacity, transform",
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        )

      case "rainy":
        return (
          <div className="relative w-32 h-32">
            <motion.div
              className={`absolute top-2 left-2 w-24 h-16 rounded-full ${
                isDark
                  ? "bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg"
                  : "bg-gradient-to-br from-gray-400 to-gray-600"
              }`}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className={`absolute top-4 left-6 w-20 h-14 rounded-full ${
                isDark ? "bg-gradient-to-br from-gray-500 to-gray-700" : "bg-gradient-to-br from-gray-300 to-gray-500"
              }`}
              animate={{ x: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className={`absolute top-6 left-10 w-16 h-12 rounded-full ${
                isDark ? "bg-gradient-to-br from-gray-600 to-gray-800" : "bg-gradient-to-br from-gray-400 to-gray-600"
              }`}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            />
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${i % 3 === 0 ? "w-1 h-6" : "w-0.5 h-4"} ${
                  isDark
                    ? "bg-gradient-to-b from-blue-300 to-blue-500 shadow-[0_0_4px_rgba(59,130,246,0.5)]"
                    : "bg-gradient-to-b from-blue-300 to-blue-500"
                }`}
                style={{
                  left: `${15 + (i % 5) * 12 + Math.random() * 8}px`,
                  top: "55px",
                  willChange: "transform, opacity",
                }}
                animate={{
                  y: [0, 50, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2 + Math.random() * 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.08,
                  ease: "easeIn",
                }}
              />
            ))}
            {isDark && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-200/20 to-transparent"
                animate={{ opacity: [0, 0, 0, 1, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.7, 0.75, 0.8, 1],
                }}
                style={{ willChange: "opacity" }}
              />
            )}
          </div>
        )

      case "winter":
        return (
          <div className="relative w-32 h-32">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${i % 4 === 0 ? "text-3xl" : i % 3 === 0 ? "text-xl" : "text-lg"} ${
                  isDark ? "text-blue-100 drop-shadow-[0_0_8px_rgba(219,234,254,0.8)]" : "text-blue-200 drop-shadow-sm"
                }`}
                style={{
                  left: `${Math.random() * 110}px`,
                  top: `${Math.random() * 110}px`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  y: [0, 30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  rotate: [0, 360],
                  opacity: [0.2, 1, 0.2],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              >
                {i % 5 === 0 ? "❅" : "❄"}
              </motion.div>
            ))}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ willChange: "transform" }}
            >
              <div
                className={`w-20 h-20 border-4 rounded-full relative ${
                  isDark ? "border-blue-300 shadow-[0_0_20px_rgba(147,197,253,0.6)]" : "border-blue-300"
                }`}
              >
                <div
                  className={`absolute inset-3 border-2 rounded-full ${isDark ? "border-blue-200" : "border-blue-400"}`}
                />
                <div
                  className={`absolute inset-6 border rounded-full ${isDark ? "border-blue-100" : "border-blue-500"}`}
                />
                <motion.div
                  className={`absolute inset-0 flex items-center justify-center text-2xl ${
                    isDark ? "text-blue-100" : "text-blue-400"
                  }`}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  style={{ willChange: "opacity" }}
                >
                  ✦
                </motion.div>
              </div>
            </motion.div>
          </div>
        )

      case "cloudy":
        return (
          <div className="relative w-32 h-32">
            <motion.div
              className={`absolute top-1 left-1 w-22 h-14 rounded-full opacity-70 ${
                isDark
                  ? "bg-gradient-to-br from-gray-500 to-gray-700 shadow-lg"
                  : "bg-gradient-to-br from-gray-300 to-gray-400"
              }`}
              animate={{
                x: [0, 12, 0],
              }}
              transition={{
                x: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className={`absolute top-6 left-4 w-26 h-16 rounded-full opacity-90 ${
                isDark
                  ? "bg-gradient-to-br from-gray-400 to-gray-600 shadow-xl"
                  : "bg-gradient-to-br from-gray-200 to-gray-400"
              }`}
              animate={{
                x: [0, -10, 0],
              }}
              transition={{
                x: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              className={`absolute top-10 left-2 w-20 h-12 rounded-full opacity-80 ${
                isDark ? "bg-gradient-to-br from-gray-500 to-gray-700" : "bg-gradient-to-br from-gray-300 to-gray-500"
              }`}
              animate={{
                x: [0, 8, 0],
              }}
              transition={{
                x: { duration: 4.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
              style={{ willChange: "transform" }}
            />
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-gray-300/40" : "bg-gray-400/30"}`}
                style={{
                  left: `${20 + Math.random() * 80}px`,
                  top: `${20 + Math.random() * 80}px`,
                  willChange: "transform, opacity",
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        )

      default:
        return (
          <motion.div
            className={`w-32 h-32 rounded-full flex items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-primary to-accent shadow-[0_0_30px_rgba(69,123,157,0.4)]"
                : "bg-gradient-to-br from-primary to-accent"
            }`}
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{ willChange: "transform" }}
          >
            <span className="text-4xl">?</span>
          </motion.div>
        )
    }
  }

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
      }}
      style={{ willChange: "transform" }}
    >
      {renderAnimation()}
    </motion.div>
  )
}
