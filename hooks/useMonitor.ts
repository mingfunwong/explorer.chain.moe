"use client"

import { defultChain } from "@/config/chains"

import { IProducerStatus } from "../types"
import { formatDate, formatNumber } from "../utils"
import { useCurrentChian } from "./useCurrentChian"
import { useGet } from "./useGet"

export const useMonitor = (refresh = false) => {
  const currentChain = useCurrentChian() || defultChain

  const { data, isLoading, isError } = useGet<IProducerStatus, any>({
    url: currentChain.apiBpStatus || "",
    refresh,
  })

  const monitors = [
    {
      name: "生产者",
      value: data && !isError ? data.head_block_producer : "",
    },
    {
      name: "出块时间",
      value: data && !isError ? formatDate(data.head_block_time) : "",
    },
    {
      name: "最新区块",
      value: data && !isError ? formatNumber(data.head_block_num) : "",
    },
  ]

  return { monitors, producerStatus: data, isLoading, isError }
}
