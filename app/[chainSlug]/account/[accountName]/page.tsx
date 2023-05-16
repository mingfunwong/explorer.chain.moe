"use client"

import Link from "next/link"
import { formatNumber } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import { IEosIoChainGetActionsAction } from "@/types/IEosIoChainGetActions"
import { defultChain } from "@/config/chains"
import { useCurrentChian } from "@/hooks/useCurrentChian"
import { useEosIoChainGetAccount } from "@/hooks/useEosIoChainGetAccount"
import { useEosIoChainGetActions } from "@/hooks/useEosIoChainGetActions"
import { useEosIoChainGetBalance } from "@/hooks/useEosIoChainGetBalance"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

export default function AccountPage({
  params,
}: {
  params: { accountName: string }
}) {
  const currentChain = useCurrentChian() || defultChain
  const accountName = params.accountName
  const { account } = useEosIoChainGetAccount(accountName)
  const { balance } = useEosIoChainGetBalance(accountName)
  const { actions, isError } = useEosIoChainGetActions(accountName)
  const balanceFix = account?.core_liquid_balance
    ? account.core_liquid_balance
    : balance

  const columns: ColumnDef<IEosIoChainGetActionsAction>[] = [
    {
      accessorKey: "date",
      header: "DATE",
      cell: ({ row }) => {
        return new Date(row.original.block_time + "Z").toLocaleString()
      },
    },
    {
      accessorKey: "hash",
      header: "HASH",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/tx/${row.original.action_trace.trx_id}`}
            className="border-b border-b-gray-800"
          >
            {row.original.action_trace.trx_id.slice(0, 4)}
          </Link>
        )
      },
    },
    {
      accessorKey: "block",
      header: "BLOCK",
      cell: ({ row }) => {
        return (
          <Link
            href={`/${currentChain.slug}/block/${row.original.action_trace.block_num}`}
            className="border-b border-b-gray-800"
          >
            {formatNumber(row.original.action_trace.block_num)}
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
            href={`/${currentChain.slug}/account/${row.original.action_trace.act.account}`}
            className="border-b border-b-gray-800"
          >
            {row.original.action_trace.act.account}
          </Link>
        )
      },
    },
    {
      accessorKey: "action",
      header: "ACTION",
      cell: ({ row }) => {
        return (
          <Badge variant="secondary">
            {row.original.action_trace.act.name}
          </Badge>
        )
      },
    },
    {
      accessorKey: "data",
      header: "DATA",
      cell: ({ row }) => {
        return JSON.stringify(row.original.action_trace.act.data, null, 2)
      },
    },
  ]

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="items-center space-y-2">
        <h2 className="inline-block text-3xl font-bold tracking-tight">
          {currentChain.name} Account
        </h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>{account?.account_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableHead className="w-28">CREAT AT</TableHead>
                <TableCell>
                  {account?.created
                    ? new Date(account?.created + "Z").toLocaleString()
                    : ""}
                </TableCell>
                <TableHead className="w-28"> </TableHead>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableHead>BALANCE </TableHead>
                <TableCell>
                  {formatNumber(parseFloat(balanceFix || "0"), 4)}{" "}
                  {currentChain.symbol}
                </TableCell>
                <TableHead>RAM </TableHead>
                <TableCell>
                  <div className="flex justify-between">
                    <span>
                      {formatNumber((account?.ram_usage || 0) / 1024, 2)} K /
                      {formatNumber((account?.ram_quota || 0) / 1024, 2)} K{" "}
                    </span>
                  </div>
                  <Progress
                    value={
                      ((account?.ram_usage || 0) / (account?.ram_quota || 0)) *
                      100
                    }
                    className="h-2"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableHead>CPU </TableHead>
                <TableCell>
                  <div className="flex justify-between">
                    <span>
                      {formatNumber(
                        parseFloat(account?.total_resources?.cpu_weight || "0"),
                        4
                      )}{" "}
                      {currentChain.symbol}
                    </span>
                    <span className="text-muted-foreground">
                      {formatNumber((account?.cpu_limit.used || 0) / 1024, 2)}{" "}
                      ms /{" "}
                      {formatNumber((account?.cpu_limit.max || 0) / 1024, 2)} ms
                    </span>
                  </div>
                  <Progress
                    value={
                      ((account?.cpu_limit.used || 0) /
                        (account?.cpu_limit.max || 0)) *
                      100
                    }
                    className="h-2"
                  />
                </TableCell>
                <TableHead>NET </TableHead>
                <TableCell>
                  <div className="flex justify-between">
                    <span>
                      {formatNumber(
                        parseFloat(account?.total_resources?.net_weight || "0"),
                        4
                      )}{" "}
                      {currentChain.symbol}
                    </span>
                    <span className="text-muted-foreground">
                      {formatNumber((account?.net_limit.used || 0) / 1024, 2)}{" "}
                      ms /{" "}
                      {formatNumber((account?.net_limit.max || 0) / 1024, 2)} ms
                    </span>
                  </div>
                  <Progress
                    value={
                      ((account?.net_limit.used || 0) /
                        (account?.net_limit.max || 0)) *
                      100
                    }
                    className="h-2"
                  />
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
