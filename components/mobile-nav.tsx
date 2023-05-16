"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu } from "lucide-react"

import { NavItem } from "@/types/nav"
import { defultChain } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"

import ChainSwitcher from "./chain-switcher"
import { CommandMenu } from "./command-menu"
import { Separator } from "./ui/separator"

export function MobileNav() {
  const currentChain = useCurrentChian() || defultChain
  const [open, setOpen] = React.useState(false)
  const items: NavItem[] = [
    {
      title: "Dashboard",
      href: `/${currentChain.slug}`,
    },
    {
      title: "Producers",
      href: `/${currentChain.slug}/producers`,
    },
  ]
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex w-full justify-between md:hidden">
          <Link
            href={`/${currentChain.slug}`}
            className="flex items-center space-x-2"
          >
            <Icons.logo />
            <span className="inline-block font-bold">{siteConfig.name}</span>
          </Link>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent size="xl" position="left" className="pr-0">
        <MobileLink
          href="/"
          className="mb-6 ml-16 flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        <ChainSwitcher className="my-2 ml-2" />

        <div className="ml-4 mr-8 mt-2 pb-2">
          <CommandMenu />
        </div>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {items.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={
                      pathname === item.href
                        ? "text-foreground"
                        : "text-foreground/60"
                    }
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
