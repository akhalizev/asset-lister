import { Asset } from '../types/asset';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones } from 'lucide-react';

interface AssetCardProps {
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

export function AssetCard({ asset, isSelected, onSelect, onClick }: AssetCardProps) {
  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div 
        className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelect(asset.id)}
          className="bg-white border-2"
        />
      </div>
      
      <div 
        className="aspect-video bg-gray-100 relative overflow-hidden"
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
            <Icon className="w-16 h-16 text-gray-300" />
          </div>
        )}
        
        <div className={`absolute bottom-2 left-2 ${fileConfig.color} rounded px-2 py-1 flex items-center gap-1`}>
          <Icon className="w-3 h-3 text-white" />
          <span className="text-white text-xs">{fileConfig.label}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon className={`w-4 h-4 ${fileConfig.color.replace('bg-', 'text-')} shrink-0`} />
          <h3 className="truncate font-mono" title={asset.assetId}>
            {asset.assetId}
          </h3>
        </div>
        
        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Category:</span>
            <span className="truncate ml-2">{asset.category}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Case ID:</span>
            <span className="truncate ml-2">{asset.caseId}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Captured:</span>
            <span>{new Date(asset.capturedOn).toLocaleDateString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">User:</span>
            <span className="truncate ml-2">{formatUsername(asset.userName)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status:</span>
            <Badge className={statusColors[asset.fileStatus]} variant="outline">
              {asset.fileStatus}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Size:</span>
            <span>{asset.assetSize}</span>
          </div>
          
          {asset.assetDuration !== 'N/A' && (
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Duration:</span>
              <span>{asset.assetDuration}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
