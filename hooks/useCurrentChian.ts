"use client"

import { notFound, useParams } from "next/navigation"

import { Chain } from "@/types/chain"
import { chians } from "@/config/chains"

const slugMap = new Map<string, Chain>()
export const useCurrentChian = () => {
  const { chainSlug }: { chainSlug: string } = useParams()
  if (!slugMap.size) {
    chians.forEach((chain) => {
      chain.bindPath.forEach((path) => {
        slugMap.set(path, chain)
      })
    })
  }
  if (slugMap.has(chainSlug)) {
    return slugMap.get(chainSlug)
  } else {
    notFound()
  }
}
