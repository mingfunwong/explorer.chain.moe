"use client"

import "@/styles/globals.css"
import Script from "next/script"

import { defultChain } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { TopLoader } from "@/components/top-loader"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

interface RootLayoutProps {
  children: React.ReactNode
}

export const runtime = "edge"

export default function RootLayout({ children }: RootLayoutProps) {
  const currentChain = useCurrentChian() || defultChain

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{`${siteConfig.name} - ${currentChain.name} ${siteConfig.description}`}</title>
          <meta content={siteConfig.description} name="description" />
          <link rel="icon" href="/favicon.png" />
        </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TopLoader />
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>

          <Analytics/>
          <SpeedInsights/>
          
          <Script
            id="google-analytics-script1"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-VH918P1NJQ"
          ></Script>
          <Script
            id="google-analytics-script2"
            dangerouslySetInnerHTML={{
              __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-VH918P1NJQ');
        `,
            }}
          />
        </body>
      </html>
    </>
  )
}
