import * as React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Trash2, Pencil,SquareGanttChart  } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "../ui/checkbox"
import { NavLink, useNavigate } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

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
  create_time:string
  last_edit_time:string
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
    maxSize:48,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    maxSize:48,
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
    },
  },
  {
    accessorKey: "create_time",
    header: () => <div className="max-w-50">Date added</div>,
    cell: ({row}) => {
      const date = row?.original.create_time
      let formatDate = format(parseISO(date),'yyyy/MM/dd')
      return (
        <React.Fragment>
                <div className="">
                  {formatDate || "Wrong date format" }
                </div>
        </React.Fragment>
      )
    },

  },
  {
    accessorKey: "last_edit_time",
    header: () => <div className="max-w-50">Last modification</div>,
    cell: ({row}) => {
      const editDate = row?.original.last_edit_time
      let formatEditDate = format(parseISO(editDate),'yyyy/MM/dd')
      return (
        <React.Fragment>
                <div className="">
                  {formatEditDate || "Wrong date format" }
                </div>
        </React.Fragment>
      )
    },

  },
  {
    accessorKey: "user_note",
    header: () => <div className="max-w-50">User Note</div>,
    cell: ({row}) => {
      return (
        <React.Fragment>
                <div className=" text-ellipsis overflow-clip max-w-50">
                  {row?.original.user_note}
                </div>
        </React.Fragment>
      )
    },
  },
  {
    accessorKey:"event",
    header: () => <div className="">Notification</div>,
    cell: ({row}) => {
      const eventData = row.original.event?.length
      const showData = eventData? eventData : '0'
      return (
        <React.Fragment>
                <div className="">
                  {showData}
                </div>
        </React.Fragment>
      )
    },
    maxSize:160,
  },
  {
    id: "actions",
    cell: ({ table,row }) => {
      const rowData = row.original
      const navigate = useNavigate()

      return (
        <div className="flex gap-4">
          <Button 
          variant="outline" 
          size="icon" 
          onClick={()=>{
            table.options?.meta.handleDeleteRow(rowData.id)
            // onDeleteTask()
          }}>
            <Trash2 className="h-4 w-4"/>
          </Button>
          <Button 
          variant="outline" 
          size="icon"
          onClick={()=>{
            navigate("EditTask/"+`${rowData.id}`)
          }}>
            <Pencil className="h-4 w-4"/>
          </Button>
          <Button 
          variant="outline" 
          size="icon" 
          onClick={()=>{
            navigate("taskinfo/"+`${rowData.id}`)
          }}>
            <NavLink to='/taskInfo'>
              <SquareGanttChart  className="h-4 w-4"/>
            </NavLink>
          </Button>
      </div>
      )
    },
  },
]
