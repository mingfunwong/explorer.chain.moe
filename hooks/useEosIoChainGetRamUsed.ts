"use client"

import { useEosIoChainGetGlobal } from "./useEosIoChainGetGlobal"

export const useEosIoChainGetRamUsed = () => {
  const { global, isLoading, isError } = useEosIoChainGetGlobal()

  const ramUsed = calculateRamUsed(
    parseInt(global?.total_ram_bytes_reserved || "0"),
    parseInt(global?.max_ram_size || "0")
  )

  return {
    ramUsed,
    isLoading,
    isError,
  }
}

function calculateRamUsed(
  total_ram_bytes_reserved: number,
  max_ram_size: number
) {
  const ramUsed = Math.floor(total_ram_bytes_reserved / 1024 ** 3)
  const ramMax = Math.floor(max_ram_size / 1024 ** 3)
  return `${ramUsed} / ${ramMax}`
}
