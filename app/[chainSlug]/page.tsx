"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { formatNumber } from "@/utils"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { ChevronsUp, Database, MemoryStick, User } from "lucide-react"
import { useCountUp } from "react-countup"

import { IEosIoChainGetBlock } from "@/types/IEosIoChainGetBlock"
import { defultChain } from "@/config/chains"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { useEosIoChainGetInfo } from "@/hooks/useEosIoChainGetInfo"
import { useEosIoChainGetRamMarket } from "@/hooks/useEosIoChainGetRamMarket"
import { useEosIoChainGetRamUsed } from "@/hooks/useEosIoChainGetRamUsed"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type LatestBlocksColumn = {
  block: number
  tx: number
  date: string
  producer: string
}

export const runtime = "edge"

export type LatestTransactionsColumn = {
  hash: string
  account: string
  action: string
}

export default function DashboardPage() {
  const currentChain = useCurrentChian() || defultChain
  const { info } = useEosIoChainGetInfo(true)
  const { ramMarketString } = useEosIoChainGetRamMarket()
  const { ramUsed } = useEosIoChainGetRamUsed()
  const [latestBlocksData, setLatestBlocksData] = useState<
    LatestBlocksColumn[]
  >([])
  const [latestTransactionsdata, setLatestTransactionsdata] = useState<
    LatestTransactionsColumn[]
  >([])
  const [latestBlocksParent] = useAutoAnimate({ duration: 200 })
  const [latestTransactionsParent] = useAutoAnimate({ duration: 50 })
  const countUpRef = useRef(null)
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    end: 0,
    duration: 1,
  })

  useEffect(() => {
    async function fetchData() {
      update(info?.head_block_num || 0)
      try {
        const request = await fetch(currentChain.rpcGetBlock() || "", {
          method: "POST",
          body: JSON.stringify({ block_num_or_id: info?.head_block_num }),
        })
        const block: IEosIoChainGetBlock = await request.json()
        const latestBlocksDataItem: LatestBlocksColumn = {
          block: block.block_num,
          tx: block.transactions.length,
          date: new Date(block.timestamp + "Z").toLocaleString(),
          producer: block.producer,
        }
        setLatestBlocksData(
          [latestBlocksDataItem, ...latestBlocksData].slice(0, 5)
        )

        block.transactions.forEach((tx, index) => {
          setTimeout(() => {
            const latestTransactionsdataItem: LatestTransactionsColumn = {
              hash: tx.trx?.id,
              account: tx.trx?.transaction?.actions[0].authorization[0].actor,
              action: tx.trx?.transaction?.actions[0].name,
            }
            latestTransactionsdata.unshift(latestTransactionsdataItem)
            setLatestTransactionsdata(latestTransactionsdata.slice(0, 5))
          }, (1000 / block.transactions.length) * index)
        })
      } catch (error) {}
    }
    if (info) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info?.head_block_num])

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="items-center space-y-2">
        <h2 className="inline-block text-3xl font-bold tracking-tight">
          Dashboard
        </h2>
        <span className="relative top-[-1em] ml-2 rounded-md bg-gray-800 px-1.5 py-0.5 text-xs font-medium leading-none text-white no-underline group-hover:no-underline">
          {currentChain.name}
        </span>
      </div>

      <div className="overflow-auto rounded-lg border bg-card px-6 pb-6 text-card-foreground shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Block</CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={countUpRef} className="text-2xl font-bold"></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Producer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {info?.head_block_producer || "-"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RAM Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ramMarketString} {currentChain.symbol} / MB
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RAM Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ramUsed} GB</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Latest Blocks</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pl-2">
            <div className="min-w-max text-sm">
              <div className="flex border-b transition-colors">
                <div className="h-8 w-3/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  BLOCK
                </div>
                <div className="h-8 w-2/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  TX
                </div>
                <div className="h-8 w-4/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  DATE
                </div>
                <div className="h-8 w-3/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  PRODUCER
                </div>
              </div>
              <div
                ref={latestBlocksParent}
                className="[&_div:last-child]:border-0"
              >
                {latestBlocksData.map((item) => (
                  <div
                    key={item.block}
                    className="flex border-b transition-colors hover:bg-muted/50"
                  >
                    <div className="w-3/12 p-4 align-middle">
                      <Link
                        href={`/${currentChain.slug}/block/${item.block}`}
                        className="border-b border-b-gray-800"
                      >
                        {formatNumber(item.block)}
                      </Link>
                    </div>
                    <div className="w-2/12 p-4 align-middle">{item.tx}</div>
                    <div className="w-4/12 p-4 align-middle">{item.date}</div>
                    <div className="w-3/12 p-4 align-middle">
                      <Link
                        href={`/${currentChain.slug}/account/${item.producer}`}
                        className="border-b border-b-gray-800"
                      >
                        {item.producer}
                      </Link>
                    </div>
                  </div>
                ))}
                {!latestBlocksData.length && (
                  <div className="flex h-24 items-center justify-center">
                    <div>No results.</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <div className="min-w-max text-sm">
              <div className="flex border-b transition-colors">
                <div className="h-8 w-4/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  HASH
                </div>
                <div className="h-8 w-4/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  ACCOUNT
                </div>
                <div className="h-8 w-4/12 px-4 text-left align-middle font-medium text-muted-foreground">
                  ACTION
                </div>
              </div>
              <div
                ref={latestTransactionsParent}
                className="[&_div:last-child]:border-0"
              >
                {latestTransactionsdata.map((item) => (
                  <div
                    key={item.hash}
                    className="flex border-b transition-colors hover:bg-muted/50"
                  >
                    <div className="w-4/12 p-4 align-middle">
                      <Link
                        href={`/${currentChain.slug}/tx/${item.hash}`}
                        className="border-b border-b-gray-800"
                      >
                        {item.hash?.slice(0, 4)}
                      </Link>
                    </div>
                    <div className="w-4/12 p-4 align-middle">
                      <Link
                        href={`/${currentChain.slug}/account/${item.account}`}
                        className="border-b border-b-gray-800"
                      >
                        {item.account}
                      </Link>
                    </div>
                    <div className="w-4/12 p-4 align-middle">
                      <Badge variant="secondary">{item.action}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!latestTransactionsdata.length && (
              <div className="flex h-24 items-center justify-center">
                <div>No results.</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
