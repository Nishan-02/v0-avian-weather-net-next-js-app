"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WeatherAnimation } from "@/components/weather-animation"
import { ArrowLeft, Calendar, FileAudio, Zap } from "lucide-react"

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
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  const getWeatherColor = (weather: string) => {
    switch (weather.toLowerCase()) {
      case "sunny":
        return "from-yellow-400 to-orange-500"
      case "rainy":
        return "from-blue-400 to-blue-600"
      case "winter":
        return "from-blue-200 to-blue-400"
      case "cloudy":
        return "from-gray-400 to-gray-600"
      default:
        return "from-primary to-accent"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-600 bg-green-100"
    if (confidence >= 0.7) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-foreground">AvianWeatherNet</h1>
            </motion.div>
            <Button variant="ghost" onClick={() => router.push("/about")}>
              About
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Upload
            </Button>
          </motion.div>

          {/* Main Result Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-border/50 shadow-2xl">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold text-foreground mb-2">Weather Prediction</CardTitle>
                <CardDescription className="text-lg">Based on bird sound analysis</CardDescription>
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
                    <h2
                      className={`text-6xl font-bold bg-gradient-to-r ${getWeatherColor(
                        result.prediction,
                      )} bg-clip-text text-transparent mb-4`}
                    >
                      {result.prediction}
                    </h2>
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
                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                      <Badge className={`text-lg font-bold ${getConfidenceColor(result.confidence)}`}>
                        {(result.confidence * 100).toFixed(1)}%
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <FileAudio className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Audio File</p>
                      <p className="font-medium text-foreground truncate">{result.fileName}</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center">
                    <CardContent className="pt-6">
                      <Calendar className="w-8 h-8 text-secondary-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Analyzed</p>
                      <p className="font-medium text-foreground">{new Date(result.timestamp).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Model Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-secondary/20 rounded-lg p-6 text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">Prediction Model</p>
                  <p className="font-semibold text-foreground capitalize">{result.model.replace("-", " ")}</p>
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
            <Button
              onClick={handleGoBack}
              size="lg"
              className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105"
            >
              Analyze Another Recording
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
