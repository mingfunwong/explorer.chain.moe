"use client"

import { IEosIoChainGetBalance } from "@/types/IEosIoChainGetBalance"
import { defultChain } from "@/config/chains"

import { useCurrentChian } from "./useCurrentChian"
import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetBalance = (accountName: string) => {
  const currentChain = useCurrentChian() || defultChain
  const body = {
    code: "eosio.token",
    json: true,
    limit: 1,
    scope: accountName,
    table: "accounts",
  }

  let { data, isLoading, isError } =
    useEosIoChainGetTableRows<IEosIoChainGetBalance>(body)

  let balance = "0"
  if (data?.rows?.length) {
    for (const row of data.rows) {
      const _balance = row.balance
      if ("string" === typeof _balance) {
        balance = _balance
        break
      }
      if (
        "object" === typeof _balance &&
        _balance.quantity.includes(currentChain.symbol || "")
      ) {
        balance = _balance.quantity
        break
      }
    }
  }

  return {
    balance,
    isLoading,
    isError,
  }
}
