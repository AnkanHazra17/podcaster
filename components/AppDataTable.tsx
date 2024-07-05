import { PodcastType, TableProps, UserType } from '@/types'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import React from 'react'
import { Button } from './ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import LoaderSpinner from './LoaderSpinner'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'


const AppDataTable = ({type}: {type: string}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const alluserData = useQuery(api.users.getAllUserdata);
  const allPodcastdata = useQuery(api.podcasts.getAllPodcast);

  const userColumn: ColumnDef<UserType>[] = [
    {
      accessorKey: "userName",
      header: "Name",
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("userName")}</div>
      )
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "podcasts",
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Podcasts
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("podcasts")}</div>,
    }
  ]

  const podcastColumn: ColumnDef<PodcastType>[] = [
    {
      accessorKey: "podcastTitle",
      header: "Title",
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("podcastTitle")}</div>
      )
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({row}) => (
        <div className="capitalize">{row.getValue("author")}</div>
      )
    },
    {
      accessorKey: "views",
      header: ({ column }) => {
        return (
          <div className='flex justify-end'>
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Views
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-right font-medium">{row.getValue("views")}</div>,
    }
  ]

  const table = useReactTable({
    data: type === "users" ? alluserData! : allPodcastdata!,
    columns: type === "users" ? userColumn : podcastColumn,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleUserFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn("email")?.setFilterValue(e.target.value);
  }

  const handlePodcastFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    table.getColumn("podcastTitle")?.setFilterValue(e.target.value)
  }

  if(!alluserData || !allPodcastdata) return <LoaderSpinner></LoaderSpinner>

  return (

    <div className='w-full p-6 rounded-xl bg-black-1 text-white shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105'>
      <div className='flex items-center py-4'>
        <Input
          placeholder="Filter emails..."
          value={type === "users" ? 
            (table.getColumn("email")?.getFilterValue() as string) ?? "" : 
            (table.getColumn("podcastTitle")?.getFilterValue() as string)
          }
          onChange={type === "users" ? handleUserFilter : handlePodcastFilter}
          className="max-w-sm bg-black-2 focus-visible:ring-offset-0 border-none text-white-1"
        />
      </div>
      <div className='rounded-xl border text-white-1'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table?.getRowModel()?.rows?.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={userColumn.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='bg-white-1 text-black-1'
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='bg-white-1 text-black-1'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppDataTable