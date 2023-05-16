"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronsUpDown } from "lucide-react"

import { defultChain, privateChians, publicChians } from "@/config/chains"
import { eosMainnet } from "@/config/chains/eos-mainnet"
import { cn } from "@/lib/utils"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const groups = [
  {
    label: "Public",
    chains: publicChians,
  },
  {
    label: "Private",
    chains: privateChians,
  },
]

type Chain = (typeof groups)[number]["chains"][number]

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface ChainSwitcherProps extends PopoverTriggerProps {}

export default function ChainSwitcher({ className }: ChainSwitcherProps) {
  const router = useRouter()
  const currentChain = useCurrentChian() || defultChain

  const [open, setOpen] = React.useState(false)
  const [selectedChain] = React.useState<Chain>(currentChain)
  const setSelectedChain = (chain: Chain) => {
    router.push(`/${chain.slug}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a chain"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage src={selectedChain.logo} alt={selectedChain.name} />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {selectedChain.name}
          <span className="ml-2 text-muted-foreground">
            {selectedChain.netType}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search chain..." />
            <CommandEmpty>No chain found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.chains.map((chain) => (
                  <CommandItem
                    key={chain.slug}
                    onSelect={() => {
                      setSelectedChain(chain)
                      setOpen(false)
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage src={chain.logo} alt={chain.name} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <span className="w-14 font-medium">{chain.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {
                        {
                          Mainnet: (
                            <span className="text-gray-700">Mainnet</span>
                          ),
                          Testnet: "Testnet",
                          "": "",
                        }[chain.netType]
                      }
                    </span>
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedChain.slug === chain.slug
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
