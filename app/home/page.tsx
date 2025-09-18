"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileAudio, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ThemeToggle } from "@/components/theme-toggle"

const models = [
  { id: "neural-weather-v1", name: "Neural Weather V1", description: "Basic weather pattern recognition" },
  { id: "avian-climate-pro", name: "Avian Climate Pro", description: "Advanced bird behavior analysis" },
  { id: "atmospheric-ai", name: "Atmospheric AI", description: "Multi-species weather correlation" },
  { id: "weather-sage", name: "Weather Sage", description: "Deep learning weather prediction" },
]

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      if (
        file.type === "audio/wav" ||
        file.type === "audio/mpeg" ||
        file.name.endsWith(".mp3") ||
        file.name.endsWith(".wav")
      ) {
        setSelectedFile(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload only .wav or .mp3 files",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      if (
        file.type === "audio/wav" ||
        file.type === "audio/mpeg" ||
        file.name.endsWith(".mp3") ||
        file.name.endsWith(".wav")
      ) {
        setSelectedFile(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload only .wav or .mp3 files",
          variant: "destructive",
        })
      }
    }
  }

  const handlePredict = async () => {
    if (!selectedFile || !selectedModel) {
      toast({
        title: "Missing information",
        description: "Please select both a file and a model",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("model", selectedModel)

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const result = await response.json()

      // Store result in sessionStorage to pass to results page
      sessionStorage.setItem("predictionResult", JSON.stringify(result))
      router.push("/results")
    } catch (error) {
      toast({
        title: "Prediction failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
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
                className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
                whileTap={{ rotate: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ willChange: "transform" }}
              >
                <motion.svg
                  className="w-6 h-6 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  style={{ willChange: "transform" }}
                >
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9Z" />
                </motion.svg>
              </motion.div>
              <motion.h1
                className="text-2xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                AvianWeatherNet
              </motion.h1>
            </motion.div>
            <nav className="flex items-center space-x-6">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => router.push("/about")}>
                About
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Predict Weather Through{" "}
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              >
                Bird Songs
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Upload bird sound recordings and let our AI models analyze the patterns to predict upcoming weather
              conditions.
            </motion.p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* File Upload Section */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ willChange: "transform" }}
            >
              <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <FileAudio className="w-5 h-5 text-primary" />
                    </motion.div>
                    Upload Audio File
                  </CardTitle>
                  <CardDescription>Upload a .wav or .mp3 file containing bird sounds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : selectedFile
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".wav,.mp3,audio/wav,audio/mpeg"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {selectedFile ? (
                      <motion.div
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <motion.div
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          style={{ willChange: "opacity" }}
                        >
                          <FileAudio className="w-12 h-12 text-accent mx-auto" />
                        </motion.div>
                        <p className="font-medium text-foreground">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="space-y-4"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        style={{ willChange: "transform" }}
                      >
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-foreground">Drop your audio file here</p>
                          <p className="text-sm text-muted-foreground">or click to browse</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Supports .wav and .mp3 files</p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Model Selection Section */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ willChange: "transform" }}
            >
              <Card className="hover:shadow-lg dark:hover:shadow-primary/10 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <motion.svg
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <path d="M12 2L2 7L12 12L22 7L12 2ZM2 17L12 22L22 17M2 12L12 17L22 12" />
                    </motion.svg>
                    Select AI Model
                  </CardTitle>
                  <CardDescription>Choose the prediction model for weather analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Choose a prediction model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-muted-foreground">{model.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedModel && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="p-4 bg-secondary/20 rounded-lg border border-border/50"
                    >
                      <p className="text-sm text-muted-foreground">
                        {models.find((m) => m.id === selectedModel)?.description}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Predict Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              style={{ willChange: "transform" }}
            >
              <Button
                onClick={handlePredict}
                disabled={!selectedFile || !selectedModel || isUploading}
                size="lg"
                className="px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-primary/20 dark:hover:shadow-primary/30"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Bird Sounds...
                  </>
                ) : (
                  <>
                    <motion.svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      style={{ willChange: "transform" }}
                    >
                      <path d="M12 2L2 7L12 12L22 7L12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9Z" />
                    </motion.svg>
                    Predict Weather
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
