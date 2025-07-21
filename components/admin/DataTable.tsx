"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Column<T> {
  header: string
  accessorKey: keyof T
  cell?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  searchKey?: keyof T
  onRowClick?: (item: T) => void
}

export function DataTable<T>({ columns, data, searchKey, onRowClick }: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredData = searchKey
    ? data.filter((item) => {
        const value = item[searchKey] as unknown as string
        return value?.toLowerCase().includes(searchQuery.toLowerCase())
      })
    : data

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header as string}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow
                  key={index}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <TableCell key={`${column.accessorKey as string}-${index}`}>
                      {column.cell ? column.cell(row) : (row[column.accessorKey] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
