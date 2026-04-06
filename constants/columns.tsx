"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { CryptoCoin } from "@/constants/apiTypes"

export type TableLabels = {
  coin: string
  symbol: string
  priceUsd: string
  h24: string
  marketCap: string
}

const formatCompactMoney = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value)
}

const formatUsd = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value > 1 ? 2 : 4,
  }).format(value)
}

export const createColumns = (labels: TableLabels): ColumnDef<CryptoCoin>[] => [
  {
    accessorKey: "name",
    header: labels.coin,
    cell: ({ row }) => {
      const coin = row.original
      return (
        <div className="flex items-center gap-2.5">
          <Image
            src={coin.imageUrl}
            alt={`${coin.name} icon`}
            width={24}
            height={24}
            sizes="24px"
            loading="lazy"
            decoding="async"
            className="h-6 w-6 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-medium">{coin.name}</span>
            <span className="text-xs text-muted-foreground">#{coin.id}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "symbol",
    header: labels.symbol,
    cell: ({ getValue }) => <span className="font-semibold">{String(getValue())}</span>,
  },
  {
    accessorKey: "priceUsd",
    header: labels.priceUsd,
    cell: ({ getValue }) => formatUsd(Number(getValue())),
  },
  {
    accessorKey: "change24h",
    header: labels.h24,
    cell: ({ getValue }) => {
      const value = Number(getValue())
      const isUp = value >= 0
      return (
        <span className={isUp ? "text-green-500" : "text-red-500"}>
          {isUp ? "+" : ""}
          {value.toFixed(2)}%
        </span>
      )
    },
  },
  {
    accessorKey: "marketCap",
    header: labels.marketCap,
    cell: ({ getValue }) => formatCompactMoney(Number(getValue())),
  },
]
