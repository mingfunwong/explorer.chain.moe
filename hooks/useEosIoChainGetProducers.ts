"use client"

import { IEosIoChainGetProducers } from "../types"
import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetProducers = () => {
  const body = {
    scope: "eosio",
    code: "eosio",
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
