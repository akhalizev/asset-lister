import { useState } from 'react';
import {
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  RowSelectionState,
} from '@tanstack/react-table';
import { Asset } from '../types/asset';
import { AssetCard } from './AssetCard';
import { CompactAssetCard } from './CompactAssetCard';
import { MinimalAssetCard } from './MinimalAssetCard';
import { HorizontalAssetCard } from './HorizontalAssetCard';
import { Button } from './ui/button';

interface AssetCardGridProps {
  data: Asset[];
  density: 'comfortable' | 'compact' | 'minimal' | 'horizontal';
  onAssetClick: (asset: Asset) => void;
}

export function AssetCardGrid({ data, density, onAssetClick }: AssetCardGridProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns: [
      { accessorKey: 'id' },
      { accessorKey: 'assetId' },
      { accessorKey: 'category' },
      { accessorKey: 'caseId' },
      { accessorKey: 'capturedOn' },
      { accessorKey: 'fileStatus' },
      { accessorKey: 'assetSize' },
      { accessorKey: 'assetDuration' },
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: density === 'minimal' ? 50 : density === 'compact' ? 30 : density === 'horizontal' ? 15 : 20,
      },
    },
  });

  const handleSelectAsset = (id: string) => {
    const row = table.getRowModel().rows.find((r) => r.original.id === id);
    if (row) {
      row.toggleSelected();
    }
  };

  const gridClasses =
    density === 'minimal'
      ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3'
      : density === 'compact'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4'
      : density === 'horizontal'
      ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  const rows = table.getRowModel().rows;

  return (
    <div className="space-y-4">
      <div className={gridClasses}>
        {rows.map((row) => {
          const asset = row.original;
          const isSelected = row.getIsSelected();

          return density === 'minimal' ? (
            <MinimalAssetCard
              key={asset.id}
              asset={asset}
              isSelected={isSelected}
              onSelect={handleSelectAsset}
              onClick={() => onAssetClick(asset)}
            />
          ) : density === 'compact' ? (
            <CompactAssetCard
              key={asset.id}
              asset={asset}
              isSelected={isSelected}
              onSelect={handleSelectAsset}
              onClick={() => onAssetClick(asset)}
            />
          ) : density === 'horizontal' ? (
            <HorizontalAssetCard
              key={asset.id}
              asset={asset}
              isSelected={isSelected}
              onSelect={handleSelectAsset}
              onClick={() => onAssetClick(asset)}
            />
          ) : (
            <AssetCard
              key={asset.id}
              asset={asset}
              isSelected={isSelected}
              onSelect={handleSelectAsset}
              onClick={() => onAssetClick(asset)}
            />
          );
        })}
      </div>

      {/* Pagination */}
      {table.getPageCount() > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} asset(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
