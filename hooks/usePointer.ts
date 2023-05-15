"use client"

import { useEffect, useState } from "react"

import { EndPointStatus } from "../enums"
import { IPoints } from "../types"
import { PointersStatus } from "../utils"
import { useEosIoChainGetProducerJson } from "./useEosIoChainGetProducerJson"

interface IAccessPoints {
  "p2p-peer-address": string[]
  "http-api-address": string[]
  "https-api-address": string[]
}

export const usePointer = () => {
  const [accessPoints, setAccessPoints] = useState<IAccessPoints>()
  const [points, setPoints] = useState<IPoints[]>([])
  const { producerJson } = useEosIoChainGetProducerJson()

  useEffect(() => {
    const pointersStatus = new PointersStatus()
    pointersStatus.run(producerJson || [])

    async function fetchData() {
      const points = pointersStatus.points
      const successList = points.filter(
        (item) => item.status === EndPointStatus.success
      )
      const p2pList = successList
        .filter((item) => item.p2p_endpoint)
        .map((item) => item.p2p_endpoint)
      const apiList = successList
        .filter((item) => item.api_endpoint)
        .map((item) => item.api_endpoint)
      const sslList = successList
        .filter((item) => item.ssl_endpoint)
        .map((item) => item.ssl_endpoint)

      // const accessPoints: IAccessPoints = {
      //   "p2p-peer-address": [...new Set([...p2pList])],
      //   "http-api-address": [...new Set([...apiList])],
      //   "https-api-address": [...new Set([...sslList])],
      // }

      setPoints(points)
      // setAccessPoints(accessPoints)
    }
    fetchData()
    let timer = setInterval(fetchData, 100)
    return () => clearInterval(timer)
  }, [producerJson])

  return { accessPoints, points }
}
