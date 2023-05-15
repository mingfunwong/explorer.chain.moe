"use client"

import { defultChain } from "@/config/chains"

import { IEosIoChainGetInfo } from "../types"
import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetInfo = (refresh = false) => {
  const currentChain = useCurrentChian() || defultChain
  const { data, isLoading, isError } = useGet<IEosIoChainGetInfo, any>({
    url: currentChain.rpcGetInfo() || "",
    refresh,
  })
  const info = data

  return { info, isLoading, isError }
}
