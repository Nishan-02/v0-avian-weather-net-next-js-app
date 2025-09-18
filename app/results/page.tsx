"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WeatherAnimation } from "@/components/weather-animation"
import { ArrowLeft, Calendar, FileAudio, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

interface PredictionResult {
  prediction: string
  confidence: number
  description: string
  model: string
  fileName: string
  timestamp: string
}

export default function ResultsPage() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    const storedResult = sessionStorage.getItem("predictionResult")
    if (storedResult) {
      setResult(JSON.parse(storedResult))
    } else {
      // Redirect to home if no result found
      router.push("/home")
    }
  }, [router])

  const handleGoBack = () => {
    sessionStorage.removeItem("predictionResult")
    router.push("/home")
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  const isDark = theme === "dark"

  const getWeatherColor = (weather: string) => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return isDark ? "from-yellow-300 to-orange-400" : "from-yellow-400 to-orange-500"
      case "rainy":
        return isDark ? "from-blue-300 to-blue-500" : "from-blue-400 to-blue-600"
      case "winter":
        return isDark ? "from-blue-100 to-blue-300" : "from-blue-200 to-blue-400"
      case "cloudy":
        return isDark ? "from-gray-300 to-gray-500" : "from-gray-400 to-gray-600"
      default:
        return "from-primary to-accent"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9)
      return isDark
        ? "text-green-400 bg-green-900/30 border-green-500/30"
        : "text-green-600 bg-green-100 border-green-200"
    if (confidence >= 0.7)
      return isDark
        ? "text-yellow-400 bg-yellow-900/30 border-yellow-500/30"
        : "text-yellow-600 bg-yellow-100 border-yellow-200"
    return isDark ? "text-red-400 bg-red-900/30 border-red-500/30" : "text-red-600 bg-red-100 border-red-200"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                className={`w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center ${
                  isDark ? "shadow-[0_0_20px_rgba(69,123,157,0.4)]" : "shadow-lg"
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9Z" />
                </svg>
              </motion.div>
              <h1 className="text-2xl font-bold text-foreground">AvianWeatherNet</h1>
            </motion.div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => router.push("/about")}>
                About
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <motion.div whileHover={{ x: -5 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
              <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2 hover:bg-secondary/50">
                <ArrowLeft className="w-4 h-4" />
                Back to Upload
              </Button>
            </motion.div>
          </motion.div>

          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          >
            <Card
              className={`border-2 border-border/50 ${
                isDark ? "shadow-2xl shadow-primary/10" : "shadow-2xl"
              } hover:shadow-3xl transition-all duration-300`}
            >
              <CardHeader className="text-center pb-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">Weather Prediction</CardTitle>
                  <CardDescription className="text-lg">Based on bird sound analysis</CardDescription>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Weather Animation and Result */}
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <WeatherAnimation weather={result.prediction} className="mx-auto mb-6" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <motion.h2
                      className={`text-6xl font-bold bg-gradient-to-r ${getWeatherColor(
                        result.prediction,
                      )} bg-clip-text text-transparent mb-4`}
                      animate={{
                        scale: [1, 1.02, 1],
                        filter: isDark
                          ? [
                              "drop-shadow(0 0 10px rgba(69,123,157,0.3))",
                              "drop-shadow(0 0 20px rgba(69,123,157,0.6))",
                              "drop-shadow(0 0 10px rgba(69,123,157,0.3))",
                            ]
                          : ["none", "none", "none"],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {result.prediction}
                    </motion.h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">{result.description}</p>
                  </motion.div>
                </div>

                {/* Confidence and Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {[
                    {
                      icon: Zap,
                      label: "Confidence",
                      value: `${(result.confidence * 100).toFixed(1)}%`,
                      color: getConfidenceColor(result.confidence),
                    },
                    { icon: FileAudio, label: "Audio File", value: result.fileName, color: "text-accent" },
                    {
                      icon: Calendar,
                      label: "Analyzed",
                      value: new Date(result.timestamp).toLocaleDateString(),
                      color: "text-secondary-foreground",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Card
                        className={`text-center ${
                          isDark ? "hover:shadow-lg hover:shadow-primary/10" : "hover:shadow-lg"
                        } transition-all duration-300`}
                      >
                        <CardContent className="pt-6">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                          >
                            <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
                          </motion.div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          {index === 0 ? (
                            <Badge className={`text-lg font-bold border ${item.color}`}>{item.value}</Badge>
                          ) : (
                            <p className={`font-medium text-foreground ${index === 1 ? "truncate" : ""}`}>
                              {item.value}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Model Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className={`bg-secondary/20 rounded-lg p-6 text-center border border-border/30 ${
                    isDark ? "bg-secondary/10" : ""
                  }`}
                >
                  <p className="text-sm text-muted-foreground mb-2">Prediction Model</p>
                  <motion.p
                    className="font-semibold text-foreground capitalize"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {result.model.replace("-", " ")}
                  </motion.p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={handleGoBack}
                size="lg"
                className={`px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 ${
                  isDark
                    ? "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                    : "shadow-lg hover:shadow-xl"
                }`}
              >
                Analyze Another Recording
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
