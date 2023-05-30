"use client"

import Link from "next/link"
import { formatNumber } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import { IEosIoChainGetBlockAction } from "@/types/IEosIoChainGetBlock"
import { defultChain } from "@/config/chains"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { useEosIoChainGetBlock } from "@/hooks/useEosIoChainGetBlock"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

type IEosIoChainGetBlockActionWithId = IEosIoChainGetBlockAction & {
  id: string
}

export const runtime = "edge"

export default function BlockPage({ params }: { params: { blockId: string } }) {
  const currentChain = useCurrentChian() || defultChain
  const blockId = params.blockId
  const { block, isError } = useEosIoChainGetBlock(blockId)
  const actions: IEosIoChainGetBlockActionWithId[] = []
  block?.transactions.forEach((tx) => {
    actions.push(
      ...tx.trx.transaction.actions.map((act) => ({ id: tx.trx.id, ...act }))
    )
  })
  const columns: ColumnDef<IEosIoChainGetBlockActionWithId>[] = [
    {
      accessorKey: "hash",
      header: "HASH",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/tx/${row.original.id}`}
            className="border-b border-b-gray-800"
          >
            {row.original.id.slice(0, 4)}
          </Link>
        )
      },
    },
    {
      accessorKey: "authorizer",
      header: "AUTHORIZER",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/account/${row.original.authorization[0].actor}`}
            className="border-b border-b-gray-800"
          >
            {row.original.authorization[0].actor}
          </Link>
        )
      },
    },
    {
      accessorKey: "contract",
      header: "CONTRACT",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/account/${row.original.account}`}
            className="border-b border-b-gray-800"
          >
            {row.original.account}
          </Link>
        )
      },
    },
    {
      accessorKey: "action",
      header: "ACTION",
      cell: ({ row }) => {
        return <Badge variant="secondary">{row.original.name}</Badge>
      },
    },
    {
      accessorKey: "data",
      header: "DATA",
      cell: ({ row }) => {
        return JSON.stringify(row.original.data, null, 2)
      },
    },
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="items-center space-y-2">
        <h2 className="inline-block text-3xl font-bold tracking-tight">
          {currentChain.name} Block
        </h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>
            # {block?.block_num ? formatNumber(block?.block_num) : ""}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead>HASH</TableHead>
                <TableCell>{block?.id}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>CREAT DATE </TableHead>
                <TableCell>
                  {block?.timestamp
                    ? new Date(block?.timestamp + "Z").toLocaleString()
                    : ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={actions}
            noResultsMessage={
              isError
                ? "Transactions are unavailable at this Endpoint."
                : "No results."
            }
          />
        </CardContent>
      </Card>
    </section>
  )
}
