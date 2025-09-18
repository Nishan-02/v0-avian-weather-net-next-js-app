"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function SplashScreen() {
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const isDark = theme === "dark"

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh animate-flow-gradient" />

      <div className="absolute inset-0 opacity-30">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: `${200 + Math.random() * 400}px`,
              left: `${-100 + Math.random() * 120}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 60 - 30}deg)`,
            }}
            animate={{
              x: ["-100%", "100vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${i % 3 === 0 ? "w-32 h-32" : i % 2 === 0 ? "w-20 h-20" : "w-12 h-12"} ${
              isDark
                ? "bg-gradient-to-br from-primary via-accent to-primary shadow-[0_0_60px_rgba(139,92,246,0.6)]"
                : "bg-gradient-to-br from-primary/60 via-accent/60 to-primary/60"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 40 - 20, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative w-40 h-40 mx-auto mb-8">
              {/* Outer glow ring */}
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  isDark
                    ? "bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_100px_rgba(139,92,246,0.8)]"
                    : "bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_60px_rgba(139,92,246,0.4)]"
                } opacity-30`}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              />

              {/* Main logo container */}
              <motion.div
                className={`relative w-full h-full rounded-full flex items-center justify-center glass-effect ${
                  isDark ? "animate-pulse-neon" : ""
                }`}
                style={{
                  background: isDark
                    ? "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.3) 50%, rgba(59,130,246,0.3) 100%)"
                    : "linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(236,72,153,0.8) 50%, rgba(59,130,246,0.8) 100%)",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                }}
              >
                {/* Animated bird icon */}
                <motion.svg
                  className="w-20 h-20 text-white drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9ZM17 12C17 14.76 14.76 17 12 17S7 14.76 7 17C7 19.76 9.24 22 12 22S17 19.76 17 17C17 14.24 14.76 12 12 12Z" />
                </motion.svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-balance"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #3b82f6 100%)"
                  : "linear-gradient(135deg, #6366f1 0%, #d946ef 50%, #0ea5e9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: isDark ? "drop-shadow(0 0 20px rgba(139,92,246,0.5))" : "none",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              >
                Avian
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              >
                Weather
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              >
                Net
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className={`text-xl max-w-md mx-auto text-pretty ${isDark ? "text-white/80" : "text-white/90"}`}
            >
              Predicting weather patterns through the wisdom of bird songs
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-16"
          >
            <div className="flex justify-center space-x-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`w-6 h-6 rounded-full ${
                    isDark
                      ? "bg-gradient-to-r from-primary to-accent shadow-[0_0_20px_rgba(139,92,246,0.8)]"
                      : "bg-gradient-to-r from-primary to-accent shadow-lg"
                  }`}
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
