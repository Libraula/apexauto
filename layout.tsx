import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Apex Auto Detailers - Mobile Car Detailing Sunshine Coast",
  description:
    "Professional mobile car detailing across the Sunshine Coast. We come to you with showroom-quality results. Book your detail today!",
  keywords: "mobile car detailing, car wash, auto detailing, Sunshine Coast, Caloundra, Noosa, Maroochydore",
  authors: [{ name: "Apex Auto Detailers" }],
  creator: "Apex Auto Detailers",
  publisher: "Apex Auto Detailers",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Apex Auto Detailers - Mobile Car Detailing Sunshine Coast",
    description:
      "Professional mobile car detailing across the Sunshine Coast. We come to you with showroom-quality results.",
    url: "https://apexautodetailers.com.au",
    siteName: "Apex Auto Detailers",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Apex Auto Detailers Logo",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Auto Detailers - Mobile Car Detailing Sunshine Coast",
    description:
      "Professional mobile car detailing across the Sunshine Coast. We come to you with showroom-quality results.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="icon" href="/logo.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/logo.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
