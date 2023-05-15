"use client"

import { defultChain } from "@/config/chains"

import { IEosIoChainGetTableRows } from "../types"
import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetTableRows = <T>(body: any) => {
  const currentChain = useCurrentChian() || defultChain

  const { data, isLoading, isError } = useGet<IEosIoChainGetTableRows<T>, any>({
    url: currentChain.rpcGetTableRows() || "",
    method: "POST",
    body,
  })

  return { data, isLoading, isError }
}
