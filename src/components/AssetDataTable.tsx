import React, { useState, useRef } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ColumnSizingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Asset } from '../types/asset';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FileText, Image, Video, Headphones, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const fileTypeConfig = {
  document: { icon: FileText, color: 'text-red-500', label: 'Document' },
  image: { icon: Image, color: 'text-blue-500', label: 'Image' },
  video: { icon: Video, color: 'text-purple-500', label: 'Video' },
  audio: { icon: Headphones, color: 'text-green-500', label: 'Audio' }
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800'
};

function formatUsername(fullName: string): string {
  // Remove titles like "Officer", "Det.", "Dispatcher", etc.
  const nameWithoutTitle = fullName.replace(/^(Officer|Det\.|Detective|Dispatcher|Sgt\.|Sergeant|Evidence Tech|Forensic Tech)\s+/i, '');
  
  // Split into parts
  const parts = nameWithoutTitle.trim().split(/\s+/);
  
  if (parts.length < 2) return fullName.toLowerCase().replace(/\s+/g, '.');
  
  // Get full first name and full last name
  const firstName = parts[0].toLowerCase();
  const lastName = parts[parts.length - 1].toLowerCase();
  
  return `${firstName}.${lastName}`;
}

interface AssetDataTableProps {
  data: Asset[];
  onRowClick?: (asset: Asset) => void;
}

export function AssetDataTable({ data, onRowClick }: AssetDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const columns: ColumnDef<Asset>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 50,
    },
    {
      accessorKey: 'assetId',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Asset ID
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const fileConfig = fileTypeConfig[row.original.assetType];
        const Icon = fileConfig.icon;
        return (
          <div className="flex items-center gap-2">
            <Icon className={`w-4 h-4 ${fileConfig.color} shrink-0`} />
            <span className="font-mono text-sm">{row.getValue('assetId')}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Category
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: 'caseId',
      header: 'Case ID',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('caseId')}</span>
      ),
    },
    {
      accessorKey: 'cadId',
      header: 'CAD ID',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('cadId')}</span>
      ),
    },
    {
      accessorKey: 'capturedOn',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Captured On
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('capturedOn'));
        return (
          <span className="whitespace-nowrap">
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      },
    },
    {
      accessorKey: 'uploaded',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Uploaded
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('uploaded'));
        return (
          <span className="whitespace-nowrap">
            {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        );
      },
    },
    {
      accessorKey: 'assetType',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('assetType') as keyof typeof fileTypeConfig;
        return fileTypeConfig[type].label;
      },
    },
    {
      accessorKey: 'device',
      header: 'Device',
    },
    {
      accessorKey: 'station',
      header: 'Station',
    },
    {
      accessorKey: 'userName',
      header: 'User Name',
      cell: ({ row }) => {
        const formattedName = formatUsername(row.getValue('userName'));
        return (
          <div 
            className="overflow-hidden text-ellipsis whitespace-nowrap block w-full"
            title={formattedName}
          >
            {formattedName}
          </div>
        );
      },
    },
    {
      accessorKey: 'fileStatus',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Status
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue('fileStatus') as keyof typeof statusColors;
        return (
          <Badge className={statusColors[status]} variant="outline">
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'retentionSpan',
      header: 'Retention',
    },
    {
      accessorKey: 'assetDuration',
      header: 'Duration',
    },
    {
      accessorKey: 'assetSize',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-2"
          >
            Size
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      columnSizing,
    },
  });

  const { rows } = table.getRowModel();
  
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 50, // Estimate row height
    overscan: 10, // Render extra rows outside viewport
  });

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto" ref={tableContainerRef} style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <Table style={{ width: table.getCenterTotalSize() }}>
            {/* Ensure consistent column widths between header and body */}
            {table.getHeaderGroups().length > 0 && (
              <colgroup>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <col key={header.id} style={{ width: header.getSize() }} />
                ))}
              </colgroup>
            )}
            <TableHeader className="sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      style={{
                        position: 'relative',
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg-transparent hover:bg-blue-500 ${
                            header.column.getIsResizing() ? 'bg-blue-500' : ''
                          }`}
                          style={{
                            transform: 'translateX(50%)',
                          }}
                        />
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.length ? (
                <>
                  {/* Top spacer to push the first rendered row into view position */}
                  {(() => {
                    const items = virtualizer.getVirtualItems();
                    const top = items.length > 0 ? items[0].start : 0;
                    return top > 0 ? (
                      <TableRow aria-hidden>
                        <TableCell colSpan={columns.length} style={{ height: top }} />
                      </TableRow>
                    ) : null;
                  })()}

                  {virtualizer.getVirtualItems().map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => onRowClick?.(row.original)}
                        style={{ height: virtualRow.size }}
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
                    );
                  })}

                  {/* Bottom spacer to fill the remaining scrollable space */}
                  {(() => {
                    const items = virtualizer.getVirtualItems();
                    const total = virtualizer.getTotalSize();
                    const end = items.length > 0 ? items[items.length - 1].end : 0;
                    const bottom = Math.max(total - end, 0);
                    return bottom > 0 ? (
                      <TableRow aria-hidden>
                        <TableCell colSpan={columns.length} style={{ height: bottom }} />
                      </TableRow>
                    ) : null;
                  })()}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Stats and Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {virtualizer.getVirtualItems().length > 0 ? virtualizer.getVirtualItems()[0].index + 1 : 0}-
          {virtualizer.getVirtualItems().length > 0 
            ? virtualizer.getVirtualItems()[virtualizer.getVirtualItems().length - 1].index + 1 
            : 0} of {rows.length} row(s). {table.getFilteredSelectedRowModel().rows.length} selected.
        </div>
        <div className="text-sm text-gray-500">
          {data.length >= 1000 && (
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Virtualized rendering enabled
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
