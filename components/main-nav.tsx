"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavItem } from "@/types/nav"
import { defultChain } from "@/config/chains"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import ChainSwitcher from "@/components/chain-switcher"
import { Icons } from "@/components/icons"

import { CommandMenu } from "./command-menu"

export function MainNav() {
  const currentChain = useCurrentChian() || defultChain
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
    <div className="hidden w-full md:flex">
      <div className="flex gap-6 md:gap-10">
        <Link
          href={`/${currentChain.slug}`}
          className="hidden items-center space-x-2 md:flex"
        >
          <Icons.logo />
          <span className="hidden font-bold sm:inline-block">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {items.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      </div>
      <div className="flex flex-1 items-center justify-end space-x-4">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <CommandMenu />
        </div>
        <nav className="flex items-center space-x-1">
          <ChainSwitcher />
        </nav>
      </div>
    </div>
  )
}
