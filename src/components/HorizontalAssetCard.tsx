import React from 'react';
import { Asset } from '../types/asset';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones, Calendar, User, HardDrive, Clock } from 'lucide-react';

interface HorizontalAssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick?: () => void;
}

const fileTypeConfig = {
  document: { icon: FileText, color: 'bg-red-500', label: 'DOC' },
  image: { icon: Image, color: 'bg-blue-500', label: 'IMG' },
  video: { icon: Video, color: 'bg-purple-500', label: 'VID' },
  audio: { icon: Headphones, color: 'bg-green-500', label: 'AUD' }
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800'
};

const statusLabels = {
  available: 'Available',
  expired: 'Expired'
};

function formatUsername(fullName: string): string {
  const nameWithoutTitle = fullName.replace(/^(Officer|Det\.|Detective|Dispatcher|Sgt\.|Sergeant|Evidence Tech|Forensic Tech)\s+/i, '');
  const parts = nameWithoutTitle.trim().split(/\s+/);
  
  if (parts.length < 2) return fullName.toLowerCase().replace(/\s+/g, '.');
  
  const firstName = parts[0].toLowerCase();
  const lastName = parts[parts.length - 1].toLowerCase();
  
  return `${firstName}.${lastName}`;
}

export function HorizontalAssetCard({ asset, isSelected, onSelect, onClick }: HorizontalAssetCardProps) {
  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="flex h-28">
        {/* Left - Thumbnail */}
        <div 
          className="w-36 bg-gray-100 relative overflow-hidden flex-shrink-0"
          onClick={onClick}
        >
          <div 
            className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onSelect(asset.id)}
              className="bg-white border-2"
            />
          </div>
          
          {asset.thumbnail ? (
            <ImageWithFallback
              src={asset.thumbnail}
              alt={asset.assetId}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <Icon className="w-10 h-10 text-gray-300" />
            </div>
          )}
          
          <div className={`absolute bottom-1 left-1 ${fileConfig.color} rounded px-1.5 py-0.5 flex items-center gap-0.5`}>
            <Icon className="w-2.5 h-2.5 text-white" />
            <span className="text-white text-[10px]">{fileConfig.label}</span>
          </div>
        </div>
        
        {/* Right - Info */}
        <div className="flex-1 p-2.5 flex flex-col justify-between min-w-0">
          {/* Header */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Icon className={`w-3 h-3 ${fileConfig.color.replace('bg-', 'text-')} shrink-0`} />
              <h3 className="truncate font-mono text-xs" title={asset.assetId}>
                {asset.assetId}
              </h3>
            </div>
            
            <p className="text-[10px] text-gray-600 mb-1.5 line-clamp-1">{asset.category}</p>
            <Badge className={`${statusColors[asset.fileStatus]} text-[10px] px-1.5 py-0 h-auto`} variant="outline">
              {statusLabels[asset.fileStatus]}
            </Badge>
          </div>
          
          {/* Metadata */}
          <div className="space-y-0.5 text-[10px]">
            <div className="flex items-center gap-1 text-gray-600">
              <Calendar className="w-2.5 h-2.5 text-gray-400 shrink-0" />
              <span className="truncate">{new Date(asset.capturedOn).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-600">
              <User className="w-2.5 h-2.5 text-gray-400 shrink-0" />
              <span className="truncate">{formatUsername(asset.userName)}</span>
            </div>
            
            <div className="flex items-center gap-1 text-gray-600">
              <HardDrive className="w-2.5 h-2.5 text-gray-400 shrink-0" />
              <span className="truncate">{asset.assetSize}</span>
              {asset.assetDuration !== 'N/A' && (
                <>
                  <span className="text-gray-400">•</span>
                  <Clock className="w-2.5 h-2.5 text-gray-400 shrink-0" />
                  <span className="truncate">{asset.assetDuration}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
