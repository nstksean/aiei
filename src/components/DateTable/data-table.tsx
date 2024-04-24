import * as React from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import {activeFetchData} from '../../api'
import { NavLink } from "react-router-dom"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    setTableDatas
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [rowSelection, setRowSelection] = React.useState({})
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        sorting,
        rowSelection,
        columnFilters,
    },
    removeRow: (id:number) => {
        const setFilterFun = (old:TData[])=> old.filter( (_row:TData, index:number)=> index !==id);
        setData(setFilterFun);
    },
    })

    function onRefreshClick(){
        activeFetchData('inference_job',setTableDatas)
    }

    React.useEffect(() => {
        activeFetchData('inference_job',setTableDatas)
    }, [])
    

    return (
    <div className="bg-white px-5 pt-2 pb-2 shadow-default rounded-md border border-stroke">
      <div className="flex items-center py-4 justify-between">
          <div className="inline-flex items-center ">
              <svg 
              className="fill-body hover:fill-primary mx-1" width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              >
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z" fill=""></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z" fill=""></path>
              </svg>
              <Input
              placeholder="Filter Names..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm border-0"
              />
              <Button variant="outline" size="icon" onClick={onRefreshClick} className="h-10 w-10 px-2 mx-2">
                {/* <!-- refresh button --> */}
                <svg 
                className="fill-body hover:fill-primary" width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M11.7050589,4.34677521 C14.2678388,4.34677521 16.60338,5.60228262 18.0314654,7.6164783 L18.4171679,6.00835959 C18.513713,5.60555453 18.9185163,5.35728179 19.3213214,5.45382691 C19.7241264,5.55037202 19.9723992,5.95517532 19.8758541,6.35798038 L19.0461434,9.81969506 C18.9495983,10.2225001 18.544795,10.4707729 18.1419899,10.3742277 L14.6802753,9.5445171 C14.2774702,9.44797199 14.0291975,9.04316869 14.1257426,8.64036363 C14.2222877,8.23755857 14.627091,7.98928583 15.0298961,8.08583094 L16.8307736,8.51667127 C15.6809547,6.87282032 13.786014,5.84677521 11.7050589,5.84677521 C8.25166254,5.84677521 5.45189636,8.64642962 5.45189636,12.099533 C5.45189636,15.5528946 8.25151605,18.3522908 11.7050589,18.3522908 C14.0749204,18.3522908 16.2077126,17.0226249 17.2712615,14.951874 C17.460503,14.583417 17.9126069,14.4381342 18.2810639,14.6273757 C18.6495208,14.8166172 18.7948037,15.2687211 18.6055622,15.6371781 C17.2875346,18.2034039 14.6427101,19.8522908 11.7050589,19.8522908 C7.42311573,19.8522908 3.95189636,16.3813485 3.95189636,12.099533 C3.95189636,7.81798909 7.42324882,4.34677521 11.7050589,4.34677521 Z" id="Combined-Shape" fill="" fillRule="nonzero"></path>
                </svg>
            </Button>
          </div>
        <NavLink
                to="/SelectScenarios"
                className={`inline-flex items-center justify-center rounded-md bg-meta-3 py-2 text-center font-medium text-white lg:px-4 xl:px-4 hover:bg-primary hover:bg-opacity-8`}
        >
        <svg 
            className="fill-current"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5,10.5h-3v-3a1.5,1.5,0,0,0-3,0v3h-3a1.5,1.5,0,0,0,0,3h3v3a1.5,1.5,0,0,0,3,0v-3h3a1.5,1.5,0,0,0,0-3Z"/>
        </svg>
        New Task
        </NavLink>
      </div>
      <div className="rounded-md">
          <Table>
          <TableHeader className="bg-gray-2">
              {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                  return (
                      <TableHead key={header.id} className="text-sm font-medium uppercase xsm:text-base">
                      {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                          )}
                      </TableHead>
                  )
                  })}
              </TableRow>
              ))}
          </TableHeader>
          <TableBody>
              {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                  <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  >
                  {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                  ))}
                  </TableRow>
              ))
              ) : (
              <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                  </TableCell>
              </TableRow>
              )}
          </TableBody>
          </Table>
          
          <div className="flex-1 text-sm text-muted-foreground px-2 bg-gray-2">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
      </div>
    </div>
    )
}