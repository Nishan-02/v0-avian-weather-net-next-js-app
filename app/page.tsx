"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full animate-float" />
        <div
          className="absolute top-40 right-32 w-24 h-24 bg-accent rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/3 w-20 h-20 bg-secondary rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="text-center z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6 animate-pulse-glow">
            <div className="absolute inset-0 bg-primary rounded-full opacity-20 animate-ping" />
            <div className="relative w-full h-full bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              {/* Bird silhouette SVG */}
              <svg className="w-16 h-16 text-primary-foreground animate-fly-in" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9ZM17 12C17 14.76 14.76 17 12 17S7 14.76 7 17C7 19.76 9.24 22 12 22S17 19.76 17 17C17 14.24 14.76 12 12 12Z" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            <span className="text-primary">Avian</span>
            <span className="text-accent">Weather</span>
            <span className="text-secondary-foreground">Net</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg text-muted-foreground max-w-md mx-auto text-pretty"
          >
            Predicting weather patterns through the wisdom of bird songs
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="mt-12"
        >
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
            <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
            <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
