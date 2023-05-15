"use client"

import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-alert-dialog"
import { Laptop, Moon, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { defultChain } from "@/config/chains"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const currentChian = useCurrentChian() || defultChain
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  const [keyword, setKeyword] = useState("")
  const onSearch = () => {
    if (!keyword) return
    if (/^[0-9]*$/.test(keyword)) {
      // block
      router.push(`/${currentChian.slug}/block/${keyword}`)
    } else if (/^[0-9a-f]{64}$/.test(keyword)) {
      // tx
      router.push(`/${currentChian.slug}/tx/${keyword}`)
    } else if (/^[0-9a-z\.]{1,12}$/.test(keyword)) {
      // account
      router.push(`/${currentChian.slug}/account/${keyword}`)
    }
    setOpen(false)
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-64 justify-start rounded-[0.5rem] text-sm text-muted-foreground "
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="inline-flex">Account / Block / TX</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a command or search..."
          onInput={(e) => setKeyword(e.currentTarget.value.toLowerCase())}
          onKeyUp={(e) => e.key === "Enter" && onSearch()}
          className="pr-6"
        />
        <CommandList>
          <CommandEmpty>
            {/^[0-9]*$/.test(keyword)
              ? `Block: ${keyword}`
              : /^[0-9a-z\.]{1,12}$/.test(keyword)
              ? `Account: ${keyword}`
              : /^[0-9a-f]{64}$/.test(keyword)
              ? `Tx: ${keyword.slice(0, 32)}`
              : "No results found."}
          </CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunMedium className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <Laptop className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
