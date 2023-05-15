"use client"

import { IEosIoChainGetBlock } from "@/types/IEosIoChainGetBlock"
import { defultChain } from "@/config/chains"

import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useEosIoChainGetBlock = (block_num_or_id: string) => {
  const currentChain = useCurrentChian() || defultChain
  const body = { block_num_or_id }
  const { data, isLoading, isError } = useGet<IEosIoChainGetBlock, any>({
    url: currentChain.rpcGetBlock() || "",
    method: "POST",
    body,
  })
  const block = data

  return { block, isLoading, isError }
}
