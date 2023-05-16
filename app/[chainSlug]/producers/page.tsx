"use client"

import Link from "next/link"
import { IProducer } from "@/types"
import { formatNumber } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import { defultChain } from "@/config/chains"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { useProducers } from "@/hooks/useProducers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

export default function ProducersPage() {
  const currentChain = useCurrentChian() || defultChain
  const { bpList } = useProducers()
  const columns: ColumnDef<IProducer>[] = [
    {
      accessorKey: "no",
      header: "#",
      cell: ({ row }) => {
        return row.index < 21 ? (
          <span className="rounded-md bg-gray-800 px-1.5 py-0.5 text-xs font-medium leading-none text-white no-underline group-hover:no-underline">
            {row.index + 1}
          </span>
        ) : (
          <span className="rounded-md bg-gray-400 px-1.5 py-0.5 text-xs font-medium leading-none text-white no-underline group-hover:no-underline">
            {row.index + 1}
          </span>
        )
      },
    },
    {
      accessorKey: "account",
      header: "ACCOUNT",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Avatar>
              <AvatarImage src={row.original.logo} alt={row.original.owner} />
              <AvatarFallback>
                {row.original.owner.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/${currentChain.slug}/account/${row.original.owner}`}
              className="ml-4 border-b border-b-gray-800"
            >
              {row.original.owner}
            </Link>
          </div>
        )
      },
    },
    {
      accessorKey: "percent",
      header: "PERCENT",
      cell: ({ row }) => {
        return row.original.weight_percent.toFixed(2) + " %"
      },
    },
    {
      accessorKey: "voted",
      header: "VOTED",
      cell: ({ row }) => {
        return formatNumber(row.original.staked) + " " + currentChain.symbol
      },
    },
    {
      accessorKey: "rewards",
      header: "REWARDS PER DAY",
      cell: ({ row }) => {
        return (
          formatNumber(row.original.claimRewardsTotal) +
          " " +
          currentChain.symbol
        )
      },
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => {
        return (
          <Link
            href={row.original.urlFull}
            target="_blank"
            className="border-b border-b-gray-800"
          >
            {row.original.urlSimple}
          </Link>
        )
      },
    },
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Producers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={bpList} />
        </CardContent>
      </Card>
    </section>
  )
}
