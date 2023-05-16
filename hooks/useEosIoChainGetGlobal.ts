"use client"

import { defultChain } from "@/config/chains"

import { IEosIoChainGetGlobal } from "../types"
import { useCurrentChian } from "./useCurrentChian"
import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetGlobal = () => {
  const currentChain = useCurrentChian() || defultChain

  const body = {
    code: currentChain.contract,
    scope: currentChain.contract,
    json: true,
    limit: 1,
    table: "global",
  }

  let { data, isLoading, isError } =
    useEosIoChainGetTableRows<IEosIoChainGetGlobal>(body)

  const global: IEosIoChainGetGlobal | undefined = data?.rows[0]

  return {
    global,
    isLoading,
    isError,
  }
}
