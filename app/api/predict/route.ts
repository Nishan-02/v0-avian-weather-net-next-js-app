import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const model = formData.get("model") as string

    if (!file || !model) {
      return NextResponse.json({ error: "Missing file or model parameter" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["audio/wav", "audio/mpeg"]
    const allowedExtensions = [".wav", ".mp3"]
    const isValidType = allowedTypes.includes(file.type) || allowedExtensions.some((ext) => file.name.endsWith(ext))

    if (!isValidType) {
      return NextResponse.json({ error: "Invalid file type. Only .wav and .mp3 files are allowed." }, { status: 400 })
    }

    // Create FormData to forward to backend
    const backendFormData = new FormData()
    backendFormData.append("file", file)
    backendFormData.append("model", model)

    // For demo purposes, we'll simulate the backend response
    // In production, you would forward to: https://your-backend.com/predict
    const mockPredictions = [
      { weather: "Sunny", confidence: 0.92, description: "Clear skies with abundant sunshine expected" },
      { weather: "Rainy", confidence: 0.87, description: "Precipitation likely with overcast conditions" },
      { weather: "Winter", confidence: 0.94, description: "Cold temperatures with possible snow" },
      { weather: "Cloudy", confidence: 0.78, description: "Overcast skies with mild temperatures" },
    ]

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return random prediction for demo
    const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)]

    const response = {
      prediction: randomPrediction.weather,
      confidence: randomPrediction.confidence,
      description: randomPrediction.description,
      model: model,
      fileName: file.name,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)

    // Uncomment below for actual backend integration:
    /*
    try {
      const backendResponse = await fetch('https://your-backend.com/predict', {
        method: 'POST',
        body: backendFormData,
      })

      if (!backendResponse.ok) {
        throw new Error(`Backend responded with status: ${backendResponse.status}`)
      }

      const result = await backendResponse.json()
      return NextResponse.json(result)
    } catch (backendError) {
      console.error('Backend error:', backendError)
      return NextResponse.json(
        { error: 'Backend service unavailable' },
        { status: 503 }
      )
    }
    */
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
