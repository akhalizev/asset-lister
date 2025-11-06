import React, { useState, useRef, useMemo } from 'react';
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
import { ImageWithFallback } from './figma/ImageWithFallback';

const fileTypeConfig = {
  document: { icon: FileText, color: 'text-red-500', label: 'Document' },
  image: { icon: Image, color: 'text-blue-500', label: 'Image' },
  video: { icon: Video, color: 'text-purple-500', label: 'Video' },
  audio: { icon: Headphones, color: 'text-green-500', label: 'Audio' }
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  recoverable: 'bg-yellow-100 text-yellow-800'
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

// Thumbnail cell component - simplified for virtualization stability
function ThumbnailCell({ asset, rowKey }: { asset: Asset; rowKey: string }) {
  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;
  const isVisual = asset.assetType === 'image' || asset.assetType === 'video';
  const [imageError, setImageError] = React.useState(false);

  // Reset error state when component remounts or thumbnail changes
  React.useEffect(() => {
    setImageError(false);
  }, [asset.thumbnail, rowKey]);

  return (
    <div 
      className="w-[110px] h-[60px] rounded overflow-hidden flex items-center justify-center bg-gray-100"
    >
      {isVisual && asset.thumbnail && !imageError ? (
        <img
          key={`thumb-${rowKey}-${asset.assetId}`}
          src={asset.thumbnail}
          alt={asset.assetId}
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />
      ) : (
        <Icon className={`w-6 h-6 ${fileConfig.color}`} aria-label="Asset thumbnail placeholder" />
      )}
    </div>
  );
}

interface AssetDataTableProps {
  data: Asset[];
  onRowClick?: (asset: Asset) => void;
  variant?: 'id' | 'thumbnail';
}

export function AssetDataTable({ data, onRowClick, variant = 'id' }: AssetDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});

  const columns: ColumnDef<Asset>[] = [];

  // Select column
  columns.push({
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
  });

  // Asset Thumbnail column (only in thumbnail variant)
  if (variant === 'thumbnail') {
    columns.push({
      id: 'assetThumbnail',
      header: () => (<span className="px-2">Asset Thumbnail</span>),
      enableSorting: false,
      cell: ({ row }) => <ThumbnailCell asset={row.original} rowKey={row.id} />,
      size: 160,
      enableResizing: true,
    });
  }

  // Asset ID column
  columns.push({
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
      const asset = row.original;
      const fileConfig = fileTypeConfig[asset.assetType];
      // Format assetId with SMG- prefix
      const formattedAssetId = asset.assetId.startsWith('SMG-') 
        ? asset.assetId 
        : `SMG-${asset.assetId}`;
      if (variant === 'thumbnail') {
        return (
          <div className="min-w-0 flex flex-col">
            <div className="font-mono text-sm truncate" title={formattedAssetId}>{formattedAssetId}</div>
            <div className="text-xs text-gray-500 truncate" title={fileConfig.label}>{fileConfig.label}</div>
            <div className="mt-0.5">
              <Badge className={statusColors[asset.fileStatus]} variant="outline">
                {asset.fileStatus}
              </Badge>
            </div>
          </div>
        );
      }
      const Icon = fileConfig.icon;
      return (
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${fileConfig.color} shrink-0`} />
          <span className="font-mono text-sm">{formattedAssetId}</span>
        </div>
      );
    },
    size: variant === 'thumbnail' ? 300 : undefined,
  });

  columns.push({
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
      size: 150,
      minSize: 120,
    });
  columns.push({
      accessorKey: 'caseId',
      header: 'Case ID',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('caseId')}</span>
      ),
      size: 150,
      minSize: 120,
    });
  columns.push({
      accessorKey: 'cadId',
      header: 'CAD ID',
      cell: ({ row }) => (
        <span className="font-mono text-sm">{row.getValue('cadId')}</span>
      ),
      size: 120,
      minSize: 100,
    });
  columns.push({
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
      size: 180,
      minSize: 160,
    });
  columns.push({
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
      size: 180,
      minSize: 160,
    });
  columns.push({
      accessorKey: 'assetType',
      header: 'Type',
      cell: ({ row }) => {
        const type = row.getValue('assetType') as keyof typeof fileTypeConfig;
        return fileTypeConfig[type].label;
      },
      size: 100,
      minSize: 80,
    });
  columns.push({
      accessorKey: 'device',
      header: 'Device',
      size: 150,
      minSize: 120,
    });
  columns.push({
      accessorKey: 'station',
      header: 'Station',
      size: 120,
      minSize: 100,
    });
  columns.push({
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
      size: 150,
      minSize: 120,
    });
  if (variant !== 'thumbnail') {
    columns.push({
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
    });
  }
  columns.push({
      accessorKey: 'retentionSpan',
      header: 'Retention',
      size: 120,
      minSize: 100,
    });
  columns.push({
      accessorKey: 'assetDuration',
      header: 'Duration',
      size: 100,
      minSize: 80,
    });
  columns.push({
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
      size: 120,
      minSize: 100,
    });
  columns.push({
      accessorKey: 'unitId',
      header: 'Unit ID',
      cell: ({ row }) => {
        const unitId = row.getValue('unitId') as string | undefined;
        return (
          <span className="font-mono text-sm">{unitId || 'N/A'}</span>
        );
      },
      size: 120,
      minSize: 100,
    });

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
    estimateSize: () => 72, // Estimate row height to accommodate 60px thumbnails
    overscan: 50, // Increase overscan to keep more rows mounted and reduce thumbnail disappearing
  });

  const tableTotalWidth = table.getCenterTotalSize();
  const minTableWidth = Math.max(tableTotalWidth, 1200); // Ensure minimum width for scrolling

  // Create a ref for horizontal scroll synchronization
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const tableScrollRef = useRef<HTMLDivElement>(null);

  // Sync horizontal scrolling between table and bottom scrollbar
  React.useEffect(() => {
    const tableScroll = tableScrollRef.current;
    const horizontalScroll = horizontalScrollRef.current;
    
    if (!tableScroll || !horizontalScroll) return;

    let isScrollingTable = false;
    let isScrollingHorizontal = false;

    const handleTableScroll = () => {
      if (!isScrollingHorizontal && horizontalScroll) {
        isScrollingTable = true;
        horizontalScroll.scrollLeft = tableScroll.scrollLeft;
        requestAnimationFrame(() => {
          isScrollingTable = false;
        });
      }
    };

    const handleHorizontalScroll = () => {
      if (!isScrollingTable && tableScroll) {
        isScrollingHorizontal = true;
        tableScroll.scrollLeft = horizontalScroll.scrollLeft;
        requestAnimationFrame(() => {
          isScrollingHorizontal = false;
        });
      }
    };

    tableScroll.addEventListener('scroll', handleTableScroll, { passive: true });
    horizontalScroll.addEventListener('scroll', handleHorizontalScroll, { passive: true });

    return () => {
      tableScroll.removeEventListener('scroll', handleTableScroll);
      horizontalScroll.removeEventListener('scroll', handleHorizontalScroll);
    };
  }, []);

  return (
    <div className="space-y-4" style={{ width: '90%', margin: '0 auto' }}>
      <div className="border rounded-lg" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Vertical and horizontal scroll container */}
        <div 
          ref={(el) => {
            tableContainerRef.current = el;
            tableScrollRef.current = el;
          }}
          style={{ 
            maxHeight: '600px', 
            overflowY: 'auto',
            overflowX: 'hidden',
            width: '100%',
            position: 'relative'
          }}
          onScroll={(e) => {
            if (horizontalScrollRef.current) {
              horizontalScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
            }
          }}
        >
          <div style={{ width: minTableWidth }}>
            <table 
              className="w-full caption-bottom text-sm"
              style={{ width: minTableWidth, borderCollapse: 'collapse' }}
            >
            {/* Ensure consistent column widths between header and body */}
            {table.getHeaderGroups().length > 0 && (
              <colgroup>
                {table.getHeaderGroups()[0].headers.map((header) => (
                  <col key={header.id} style={{ width: header.getSize() }} />
                ))}
              </colgroup>
            )}
            <thead className="[&_tr]:border-b sticky top-0 z-10 bg-white">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                  {headerGroup.headers.map((header) => (
                    <th 
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
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {rows.length ? (
                <>
                  {/* Top spacer to push the first rendered row into view position */}
                  {(() => {
                    const items = virtualizer.getVirtualItems();
                    const top = items.length > 0 ? items[0].start : 0;
                    return top > 0 ? (
                      <tr aria-hidden>
                        <td colSpan={columns.length} style={{ height: top }} />
                      </tr>
                    ) : null;
                  })()}

                  {virtualizer.getVirtualItems().map((virtualRow) => {
                    const row = rows[virtualRow.index];
                    return (
                      <tr
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                        className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors"
                        style={{ height: virtualRow.size }}
                      >
                        {row.getVisibleCells().map((cell) => {
                          const isViewerTrigger = (variant === 'thumbnail'
                            ? cell.column.id === 'assetThumbnail'
                            : cell.column.id === 'assetId');
                          return (
                            <td
                              key={cell.id}
                              onClick={isViewerTrigger ? () => onRowClick?.(row.original) : undefined}
                              className={`p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${isViewerTrigger ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}

                  {/* Bottom spacer to fill the remaining scrollable space */}
                  {(() => {
                    const items = virtualizer.getVirtualItems();
                    const total = virtualizer.getTotalSize();
                    const end = items.length > 0 ? items[items.length - 1].end : 0;
                    const bottom = Math.max(total - end, 0);
                    return bottom > 0 ? (
                      <tr aria-hidden>
                        <td colSpan={columns.length} style={{ height: bottom }} />
                      </tr>
                    ) : null;
                  })()}
                </>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="h-24 text-center p-2 align-middle whitespace-nowrap"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
        {/* Horizontal scrollbar - always visible at bottom */}
        <div 
          ref={horizontalScrollRef}
          style={{ 
            overflowX: 'scroll',
            overflowY: 'hidden',
            width: '100%',
            height: '17px',
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            cursor: 'pointer'
          }}
          onScroll={(e) => {
            if (tableScrollRef.current) {
              tableScrollRef.current.scrollLeft = e.currentTarget.scrollLeft;
            }
          }}
        >
          <div style={{ height: '1px', width: minTableWidth }}></div>
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
