"use client"

import { formatDate, formatNumber } from "../utils"
import { useEosIoChainGetInfo } from "./useEosIoChainGetInfo"

export const useHeadBlockInfo = (refresh = false) => {
  const { info: data, isLoading, isError } = useEosIoChainGetInfo(refresh)

  const info = [
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
    {
      name: "不可逆区块",
      value:
        data && !isError ? formatNumber(data.last_irreversible_block_num) : "",
    },
  ]

  return {
    info,
    isLoading: isLoading,
    isError: isError,
  }
}
