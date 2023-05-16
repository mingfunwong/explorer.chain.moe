"use client"

import { defultChain } from "@/config/chains"

import { IEosIoChainGetProducers } from "../types"
import { useCurrentChian } from "./useCurrentChian"
import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetProducers = () => {
  const currentChain = useCurrentChian() || defultChain

  const body = {
    scope: currentChain.contract,
    code: currentChain.contract,
    table: "producers",
    json: true,
    limit: 100,
    key_type: "float64",
    index_position: 2,
  }

  const { data, isLoading, isError } =
    useEosIoChainGetTableRows<IEosIoChainGetProducers>(body)

  const producers: IEosIoChainGetProducers[] | undefined = data?.rows

  return {
    producers,
    isLoading,
    isError,
  }
}
