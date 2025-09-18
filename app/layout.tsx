import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "AvianWeatherNet - Weather Prediction Through Bird Sounds",
  description: "Predict weather patterns using advanced AI analysis of bird sounds and calls",
  generator: "AvianWeatherNet",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress ResizeObserver loop errors
              window.addEventListener('error', function(e) {
                if (e.message === 'ResizeObserver loop completed with undelivered notifications.' || 
                    e.message === 'ResizeObserver loop limit exceeded') {
                  e.stopImmediatePropagation();
                  e.preventDefault();
                  return false;
                }
              });
              
              // Also handle unhandled promise rejections for ResizeObserver
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && 
                    (e.reason.message.includes('ResizeObserver') || 
                     e.reason.message.includes('loop completed'))) {
                  e.preventDefault();
                  return false;
                }
              });
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
