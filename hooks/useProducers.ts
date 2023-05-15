"use client"

import { useEffect, useState } from "react"

import { IProducer } from "../types"
import { getProducers } from "../utils"
import { useEosIoChainGetGlobal } from "./useEosIoChainGetGlobal"
import { useEosIoChainGetProducerJson } from "./useEosIoChainGetProducerJson"
import { useEosIoChainGetProducers } from "./useEosIoChainGetProducers"

export const useProducers = () => {
  const [bpList, setBpList] = useState<IProducer[]>([])
  const { global } = useEosIoChainGetGlobal()
  const { producers } = useEosIoChainGetProducers()
  const { producerJson } = useEosIoChainGetProducerJson()

  useEffect(() => {
    if (global && producers) {
      const bpList = getProducers(producers, producerJson, global)
      setBpList(bpList)
    }
  }, [global, producers, producerJson])
  return { bpList }
}
