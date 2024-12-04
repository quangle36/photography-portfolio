import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"

import Footer from "@/components/footer"
import MainNav from "@/components/main-nav"
import { ThemeProvider } from "@/components/theme-provider"

const inter = localFont({
  src: [
    {
      path: "fonts/Inter_28pt-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-ThinItalic.ttf",
      weight: "100",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-ExtraLightItalic.ttf",
      weight: "200",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-ExtraBoldItalic.ttf",
      weight: "800",
      style: "italic",
    },
    {
      path: "fonts/Inter_28pt-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "fonts/Inter_28pt-BlackItalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-inter", // You can change this variable name to fit your project
  display: "swap",
})
export const metadata: Metadata = {
  title: "Minh Quang Photographys | Capturing Moments",
  description:
    "Professional photographer specializing in portraits. Based in Saigon",
  openGraph: {
    title: "Minh Quang Photographys | Capturing Moments",
    description:
      "Professional photographer specializing in portraits. Based in Saigon",
    images: [
      {
        url: "https://mqphotographys.com/_next/image?url=%2Flogo-quang-black.png&w=256&q=75",
        width: 1200,
        height: 630,
        alt: "Minh Quang Photographys Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main
              id="main"
              className="container mx-auto flex-1 py-16 md:py-20"
              // className="h-[calc(100vh-var(--navbar-height))] pt-16 md:pt-20 flex-1"
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
