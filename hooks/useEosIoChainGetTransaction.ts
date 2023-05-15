"use client"

import { IEosIoChainGetTransaction } from "@/types/IEosIoChainGetTransaction"
import { defultChain } from "@/config/chains"

import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetTransaction = (id: string) => {
  const currentChain = useCurrentChian() || defultChain

  const body = { id }
  const { data, isLoading, isError } = useGet<IEosIoChainGetTransaction, any>({
    url: currentChain.rpcGetTransaction() || "",
    method: "POST",
    body,
  })
  const transaction = data

  return { transaction, isLoading, isError }
}
