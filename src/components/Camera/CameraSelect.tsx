import * as React from "react"
import { useState,useEffect } from 'react';

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
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { RotateCw, Search  } from 'lucide-react';



interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export type Cameras = {
    id: string
    name: string
    description: string
    location:string
    inference_job:array
}
/* table column config */
export const cameraColumn: ColumnDef<cameras>[] = [
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
            className=" hidden "
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
        accessorKey: "name",
        header: "name",
        cell:({row}) => (
            <React.Fragment>
                <div className="">
                    <div className="font-medium text-black">{row.original.name}</div>
                    <div className="font-medium text-sm">{row.original.description}</div>
                    <div className="font-medium text-sm">{row.original.location}</div>
                </div>
            </React.Fragment>
        )
    }
]

export default function CameraSelect<TData, TValue>({
    columns,
    data,
    fetchCameraData,
    choseCamera
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})

    React.useEffect(() => {
        fetchCameraData()
    }, []);

    React.useEffect(() => {
      let selectedDataIndex = Object.keys(rowSelection)[0]
      let selectedData ={} 
      if(data){selectedData = data[selectedDataIndex]}
      choseCamera(selectedData)
    }, [rowSelection]);
    
    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
        rowSelection,
    },
    enableMultiRowSelection: false,
    })

    // // setRowSelection({})
    // let selectedDataIndex = Object.keys(rowSelection)[0]
    // let selectedData ={} 
    // if(data){selectedData = data[selectedDataIndex]}
    const onRefreshClick = ()=>{
        setRowSelection({})
        fetchCameraData()
    }
    
    // useEffect(() => {
    //     setChosenRow(selectedData)

    // }, [rowSelection]);

    return (
    <div className="basis-2/5 h-full bg-white px-5 pt-2 pb-2 shadow-default rounded-md max-h-[470px] min-h-[300px] overflow-hidden border border-stroke">
        {/* camera tool bar */}
        <div className="flex items-center py-2 justify-between h-14 text-clip">
            <p className="text-xl text-blue-600 font-medium">Cameras</p>
            <p className="text-black text-sm mr-2 opacity-70">Select one camera</p>
            <Button variant="outline" size="icon" onClick={onRefreshClick}>
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
        {/* Camera table */}
        <div className="h-5/6 rounded-md overflow-y-auto max-h-[580px] min-h-19">
            <Table className='border-separate border-spacing-y-2' >
            <TableHeader className="bg-gray-2 hidden">
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
                {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    className="bg-blue-50 !border border-zinc-600 focus:border-2 border-zinc-950 data-[state=selected]:!bg-blue-200 data-[state=selected]:!border-2"
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
        </div>
    </div>
    )
}


