"use client"

import { IEosIoChainGetActions } from "@/types/IEosIoChainGetActions"
import { defultChain } from "@/config/chains"

import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetActions = (
  accountName: string,
  offset = -100,
  pos = -1
) => {
  const currentChain = useCurrentChian() || defultChain
  const body = { account_name: accountName, offset, pos }
  const { data, isLoading, isError } = useGet<IEosIoChainGetActions, any>({
    url: currentChain.rpcGetActions() || "",
    method: "POST",
    body,
  })
  const actions = data?.actions || []

  return { actions, isLoading, isError }
}
