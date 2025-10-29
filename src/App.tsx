import React, { useState, useMemo } from 'react';
import { mockAssets } from './data/mockAssets';
import { AssetCardGrid } from './components/AssetCardGrid';
import { AssetDataTable } from './components/AssetDataTable';
import { AssetFilters, DateRange } from './components/AssetFilters';
import { AssetViewer } from './components/AssetViewer';
import { Button } from './components/ui/button';
import { Plus, Download, Trash2 } from 'lucide-react';
import { AssetType, FileStatus, Asset } from './types/asset';

export default function App() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [density, setDensity] = useState<'comfortable' | 'compact' | 'minimal' | 'horizontal'>('comfortable');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState<AssetType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<FileStatus | 'all'>('all');
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined });
  const [selectedAssetForViewer, setSelectedAssetForViewer] = useState<Asset | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const filteredAssets = useMemo(() => {
    return mockAssets.filter((asset) => {
      const matchesSearch = asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory;
      const matchesType = selectedType === 'all' || asset.assetType === selectedType;
      const matchesStatus = selectedStatus === 'all' || asset.fileStatus === selectedStatus;
      
      // Date range filtering based on capturedOn date
      let matchesDateRange = true;
      if (dateRange.from || dateRange.to) {
        const assetDate = new Date(asset.capturedOn);
        if (dateRange.from && dateRange.to) {
          const fromDate = new Date(dateRange.from);
          const toDate = new Date(dateRange.to);
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(23, 59, 59, 999);
          matchesDateRange = assetDate >= fromDate && assetDate <= toDate;
        } else if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          matchesDateRange = assetDate >= fromDate;
        } else if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          matchesDateRange = assetDate <= toDate;
        }
      }
      
      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedStatus, dateRange]);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAssetForViewer(asset);
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setViewerOpen(false);
  };

  const handleNavigateAsset = (asset: Asset) => {
    setSelectedAssetForViewer(asset);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedStatus('all');
    setDateRange({ from: undefined, to: undefined });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-20">
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AssetFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          density={density}
          onDensityChange={setDensity}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearAllFilters={handleClearAllFilters}
        />

        {filteredAssets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No assets found matching your filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <AssetCardGrid
            data={filteredAssets}
            density={density}
            onAssetClick={handleAssetClick}
          />
        ) : (
          <AssetDataTable
            data={filteredAssets}
            onRowClick={handleAssetClick}
          />
        )}
      </main>

      {selectedAssetForViewer && (
        <AssetViewer
          asset={selectedAssetForViewer}
          allAssets={mockAssets}
          open={viewerOpen}
          onClose={handleCloseViewer}
          onNavigate={handleNavigateAsset}
        />
      )}
    </div>
  );
}
