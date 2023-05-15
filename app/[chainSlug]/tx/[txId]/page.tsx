"use client"

import Link from "next/link"
import { formatNumber } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import { IEosIoChainGetTransactionTrace } from "@/types/IEosIoChainGetTransaction"
import { defultChain } from "@/config/chains"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { useEosIoChainGetTransaction } from "@/hooks/useEosIoChainGetTransaction"
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

export default function TxPage({ params }: { params: { txId: string } }) {
  const currentChain = useCurrentChian() || defultChain
  const txId = params.txId
  const { transaction, isError } = useEosIoChainGetTransaction(txId)
  const data = transaction?.traces || []

  const columns: ColumnDef<IEosIoChainGetTransactionTrace>[] = [
    {
      accessorKey: "authorizer",
      header: "AUTHORIZER",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/account/${row.original.act.authorization[0].actor}`}
            className="border-b border-b-gray-800"
          >
            {row.original.act.authorization[0].actor}
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
            href={`/${currentChain.slug}/account/${row.original.act.account}`}
            className="border-b border-b-gray-800"
          >
            {row.original.act.account}
          </Link>
        )
      },
    },
    {
      accessorKey: "action",
      header: "ACTION",
      cell: ({ row }) => {
        return <Badge variant="secondary">{row.original.act.name}</Badge>
      },
    },
    {
      accessorKey: "data",
      header: "DATA",
      cell: ({ row }) => {
        return JSON.stringify(row.original.act.data, null, 2)
      },
    },
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="items-center space-y-2">
        <h2 className="inline-block text-3xl font-bold tracking-tight">
          EOS Transaction
        </h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle># {transaction?.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-28">CREAT AT</TableHead>
                <TableCell>
                  {transaction?.block_time
                    ? new Date(transaction?.block_time + "Z").toLocaleString()
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead className="w-28">BLOCK</TableHead>
                <TableCell>
                  {formatNumber(transaction?.block_num || 0)}
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
            data={data}
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
