"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, Users, Zap, Globe, Heart } from "lucide-react"

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Lead AI Researcher",
    linkedin: "https://linkedin.com/in/sarah-chen-ai",
    expertise: "Machine Learning & Ornithology",
    avatar: "/professional-woman-scientist.png",
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Data Scientist",
    linkedin: "https://linkedin.com/in/marcus-rodriguez-data",
    expertise: "Audio Processing & Neural Networks",
    avatar: "/professional-data-scientist.png",
  },
  {
    name: "Dr. Emily Watson",
    role: "Meteorology Expert",
    linkedin: "https://linkedin.com/in/emily-watson-weather",
    expertise: "Climate Patterns & Weather Prediction",
    avatar: "/professional-woman-meteorologist.jpg",
  },
  {
    name: "Alex Kim",
    role: "Full-Stack Developer",
    linkedin: "https://linkedin.com/in/alex-kim-dev",
    expertise: "Web Development & System Architecture",
    avatar: "/professional-person-developer.jpg",
  },
]

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning models trained on thousands of bird sound recordings",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Weather Patterns",
    description: "Comprehensive weather prediction covering diverse climate conditions worldwide",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Team",
    description: "Multidisciplinary team combining AI, ornithology, and meteorology expertise",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Nature Conservation",
    description: "Supporting bird conservation efforts through citizen science and data collection",
  },
]

export default function AboutPage() {
  const router = useRouter()

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
            <nav className="flex items-center space-x-6">
              <Button variant="ghost" onClick={() => router.push("/home")}>
                Home
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" onClick={() => router.push("/home")} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              About <span className="text-primary">AvianWeatherNet</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-pretty leading-relaxed">
              AvianWeatherNet represents a groundbreaking fusion of artificial intelligence, ornithology, and
              meteorology. Our innovative platform harnesses the natural wisdom of birds to predict weather patterns
              with unprecedented accuracy.
            </p>
          </motion.div>

          {/* Project Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <Card className="border-2 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto text-pretty leading-relaxed">
                  Birds have been nature's weather forecasters for millennia, adjusting their behavior and vocalizations
                  in response to atmospheric changes. AvianWeatherNet leverages cutting-edge machine learning to decode
                  these natural signals, creating a revolutionary approach to weather prediction that combines ancient
                  wisdom with modern technology.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Card className="text-center h-full">
                        <CardContent className="pt-6">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            {feature.icon}
                          </div>
                          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Our multidisciplinary team brings together expertise from AI research, ornithology, meteorology, and
                software development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-secondary/20">
                        <img
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          crossOrigin="anonymous"
                        />
                      </div>
                      <h4 className="font-bold text-foreground mb-1">{member.name}</h4>
                      <Badge variant="secondary" className="mb-2">
                        {member.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4">{member.expertise}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(member.linkedin, "_blank")}
                        className="flex items-center gap-2 mx-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        LinkedIn
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="mb-16"
          >
            <Card className="border-2 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-center">How It Works</CardTitle>
                <CardDescription className="text-center text-lg">
                  The science behind our weather prediction technology
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 14C9.79 14 8 15.79 8 18S9.79 22 12 22 16 20.21 16 18 14.21 14 12 14ZM12 9C10.9 9 10 8.1 10 7S10.9 5 12 5 14 5.9 14 7 13.1 9 12 9ZM6 20C4.9 20 4 19.1 4 18S4.9 16 6 16 8 16.9 8 18 7.1 20 6 20ZM6 10C4.9 10 4 9.1 4 8S4.9 6 6 6 8 6.9 8 8 7.1 10 6 10ZM18 20C16.9 20 16 19.1 16 18S16.9 16 18 16 20 16.9 20 18 19.1 20 18 20ZM18 10C16.9 10 16 9.1 16 8S16.9 6 18 6 20 6.9 20 8 19.1 10 18 10Z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Audio Analysis</h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Advanced signal processing extracts key features from bird vocalizations and environmental sounds
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-8 h-8 text-accent" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">AI Processing</h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Neural networks trained on thousands of recordings correlate bird behavior with weather patterns
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Weather Prediction</h4>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Sophisticated algorithms generate accurate weather forecasts based on avian behavioral patterns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17C15.24 5.06 14.32 5 13.4 5C10.3 5 7.4 5.64 5 6.64V9C7.4 8 10.3 7.36 13.4 7.36C16.5 7.36 19.4 8 21 9Z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-foreground">AvianWeatherNet</span>
            </div>
            <p className="text-muted-foreground">© 2025 AvianWeatherNet. All rights reserved.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Bridging the gap between nature's wisdom and modern technology
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
