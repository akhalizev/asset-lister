import { Asset } from '../types/asset';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones } from 'lucide-react';

interface CompactAssetCardProps {
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

export function CompactAssetCard({ asset, isSelected, onSelect, onClick }: CompactAssetCardProps) {
  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  return (
    <Card className="group relative overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer">
      <div 
        className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(asset.id)}
          className="bg-white border-2 h-4 w-4"
        />
      </div>
      
      {/* Compact thumbnail */}
      <div 
        className="aspect-[4/3] bg-gray-100 relative overflow-hidden"
        onClick={onClick}
      >
        {asset.thumbnail ? (
          <ImageWithFallback
            src={asset.thumbnail}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <Icon className="w-10 h-10 text-gray-300" />
          </div>
        )}
        
        <div className={`absolute bottom-1.5 left-1.5 ${fileConfig.color} rounded px-1.5 py-0.5 flex items-center gap-1`}>
          <Icon className="w-2.5 h-2.5 text-white" />
          <span className="text-white text-xs">{fileConfig.label}</span>
        </div>
      </div>
      
      {/* Compact content */}
      <div className="p-2.5">
        <div className="flex items-center gap-1.5 mb-1">
          <Icon className={`w-3 h-3 ${fileConfig.color.replace('bg-', 'text-')} shrink-0`} />
          <h3 className="text-xs truncate font-mono" title={asset.assetId}>
            {asset.assetId}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 truncate">{asset.caseId}</span>
          <Badge className={`${statusColors[asset.fileStatus]} text-xs py-0 h-4`} variant="outline">
            {asset.fileStatus}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span className="truncate mr-2">{formatUsername(asset.userName)}</span>
          <span className="shrink-0">{new Date(asset.capturedOn).toLocaleDateString()}</span>
        </div>
        
        <div className="text-xs text-gray-500">
          <span>{asset.assetSize}</span>
        </div>
      </div>
    </Card>
  );
}
