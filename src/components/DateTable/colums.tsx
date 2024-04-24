import * as React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash2, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "../ui/checkbox"

export type InterenceJob = {
  camera: array
  event: array
  event_type_config: object
  id: number
  inference_config: object
  name: string
  scenario: object
  schedule_config: object
  user_note: string
}

export const columns: ColumnDef<InterenceJob>[] = [
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
    header: () => <div className="">User Note</div>,
  },
  {
    accessorKey:"event",
    header: () => <div className="">Notification</div>,
    cell: ({row}) => {
      const eventData = row.original
      console.log('rowcell',eventData)
      return (
        <React.Fragment>
                <div className="">
                  {eventData?.event.length}
                </div>
        </React.Fragment>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className="flex gap-4">
          <Button variant="outline" size="icon">
            <Trash2 className="h-4 w-4"/>
          </Button>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4"/>
          </Button>
      </div>
      )
    },
  },
]
