"use client"

import { defultChain } from "@/config/chains"

import { IEosIoChainGetAccount } from "../types"
import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetAccount = (account_name: string) => {
  const currentChain = useCurrentChian() || defultChain
  const body = { account_name }
  const { data, isLoading, isError } = useGet<IEosIoChainGetAccount, any>({
    url: currentChain.rpcGetAccount() || "",
    method: "POST",
    body,
  })
  const account = data

  return { account, isLoading, isError }
}
