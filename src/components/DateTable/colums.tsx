import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "../ui/checkbox"

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm font-medium uppercase xsm:text-base"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },  },
  {
    accessorKey: "user_note",
    header: () => <div className="text-right">User Note</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <>
          <Button>
            <Trash2 className="h-4 w-4"/>
          </Button>
          <Button >
            <Pencil className="h-4 w-4"/>
          </Button>
      </>
      )
    },
  },
]
