"use client"

import { IEosIoChainGetProducerJson } from "../types"
import { useEosIoChainGetTableRows } from "./useEosIoChainGetTableRows"

export const useEosIoChainGetProducerJson = () => {
  const body = {
    json: true,
    code: "producerjson",
    scope: "producerjson",
    table: "producerjson",
    limit: 1000,
  }

  let { data, isLoading, isError } =
    useEosIoChainGetTableRows<IEosIoChainGetProducerJson>(body)

  const producerJson: IEosIoChainGetProducerJson[] | undefined = data?.rows

  return {
    producerJson,
    isLoading,
    isError,
  }
}
