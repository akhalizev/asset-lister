import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Grid3x3, List, LayoutGrid, Calendar as CalendarIcon, X } from 'lucide-react';
import { AssetType, FileStatus } from '../types/asset';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Separator } from './ui/separator';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface AssetFiltersProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  density: 'comfortable' | 'compact' | 'minimal' | 'horizontal';
  onDensityChange: (density: 'comfortable' | 'compact' | 'minimal' | 'horizontal') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: AssetType | 'all';
  onTypeChange: (type: AssetType | 'all') => void;
  selectedStatus: FileStatus | 'all';
  onStatusChange: (status: FileStatus | 'all') => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onClearAllFilters: () => void;
}

export function AssetFilters({
  viewMode,
  onViewModeChange,
  density,
  onDensityChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  onClearAllFilters
}: AssetFiltersProps) {
  const hasDateRange = dateRange.from || dateRange.to;
  const hasActiveFilters =
    !!searchQuery ||
    selectedCategory !== 'all' ||
    selectedType !== 'all' ||
    selectedStatus !== 'all' ||
    !!hasDateRange;

  const clearDateRange = () => {
    onDateRangeChange({ from: undefined, to: undefined });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex-1 w-full sm:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search assets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex gap-2 items-center flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                  </>
                ) : (
                  formatDate(dateRange.from)
                )
              ) : (
                'Date Range'
              )}
              {hasDateRange && (
                <X
                  className="ml-2 h-4 w-4 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearDateRange();
                  }}
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3 space-y-3">
              <div>
                <p className="text-sm mb-2">Start Date</p>
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => onDateRangeChange({ ...dateRange, from: date })}
                  initialFocus
                />
              </div>
              <Separator />
              <div>
                <p className="text-sm mb-2">End Date</p>
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => onDateRangeChange({ ...dateRange, to: date })}
                  disabled={(date) => dateRange.from ? date < dateRange.from : false}
                />
              </div>
              {hasDateRange && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearDateRange}
                >
                  Clear Date Range
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Body Cam">Body Cam</SelectItem>
            <SelectItem value="Dash Cam">Dash Cam</SelectItem>
            <SelectItem value="Crime Scene">Crime Scene</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Documentation">Documentation</SelectItem>
            <SelectItem value="Surveillance">Surveillance</SelectItem>
            <SelectItem value="Audio Recording">Audio Recording</SelectItem>
            <SelectItem value="Aerial">Aerial</SelectItem>
            <SelectItem value="Training">Training</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedType} onValueChange={(value) => onTypeChange(value as AssetType | 'all')}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="image">Images</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedStatus} onValueChange={(value) => onStatusChange(value as FileStatus | 'all')}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('grid')}
            className="h-8 w-8"
            title="Grid view"
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => onViewModeChange('list')}
            className="h-8 w-8"
            title="List view"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        
        {viewMode === 'grid' && (
          <Select value={density} onValueChange={(value) => onDensityChange(value as 'comfortable' | 'compact' | 'minimal' | 'horizontal')}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="horizontal">Horizontal</SelectItem>
            </SelectContent>
          </Select>
        )}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearAllFilters}
            className="h-8"
            title="Clear all filters"
          >
            <X className="mr-2 h-4 w-4" />
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
