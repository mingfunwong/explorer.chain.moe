"use client"

import "@/styles/globals.css"
import { defultChain } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

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
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
