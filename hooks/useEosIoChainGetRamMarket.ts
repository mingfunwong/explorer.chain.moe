"use client"

import { IEosIoChainGetRamMarketRow } from "@/types/IEosIoChainGetRamMarket"

import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetRamMarket = () => {
  const body = {
    json: true,
    code: "eosio",
    scope: "eosio",
    table: "rammarket",
    limit: 1,
  }

  let { data, isLoading, isError } =
    useEosIoChainGetTableRows<IEosIoChainGetRamMarketRow>(body)

  const ramMarket: IEosIoChainGetRamMarketRow | undefined = data?.rows[0]
  const ramMarketString = calculateMbPrice(
    parseFloat(ramMarket?.quote.balance || "0"),
    parseFloat(ramMarket?.base.balance || "0")
  )

  return {
    ramMarket,
    ramMarketString,
    isLoading,
    isError,
  }
}

function calculateMbPrice(quoteBalance: number, baseBalance: number) {
  const kbToMbConversion = 1024
  const kbPrice = (quoteBalance / baseBalance) * kbToMbConversion
  const mbPrice = kbPrice * kbToMbConversion
  return (mbPrice || 0).toFixed(2)
}
