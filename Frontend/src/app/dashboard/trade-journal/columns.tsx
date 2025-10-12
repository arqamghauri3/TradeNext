"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trade } from "./data";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Trade>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "userId",
    header: "UserId",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "positionType",
    header: "PositionType",
  },
  {
    accessorKey: "entryPrice",
    header: "EntryPrice",
  },
  {
    accessorKey: "exitPrice",
    header: "ExitPrice",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "entryDate",
    header: "EntryDate",
  },
  {
    accessorKey: "exitDate",
    header: "ExitDate",
  },
  {
    accessorKey: "pnl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer"
        >
          PnL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("pnl"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "strategyId",
    header: "StrategyId",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "screenshots",
    header: "Screenshots",
  },
];
