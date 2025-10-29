import { Asset } from '../types/asset';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones } from 'lucide-react';

interface MinimalAssetCardProps {
  asset: Asset;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onClick: () => void;
}

const fileTypeConfig = {
  document: { icon: FileText, color: 'bg-red-500' },
  image: { icon: Image, color: 'bg-blue-500' },
  video: { icon: Video, color: 'bg-purple-500' },
  audio: { icon: Headphones, color: 'bg-green-500' }
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

export function MinimalAssetCard({ asset, isSelected, onSelect, onClick }: MinimalAssetCardProps) {
  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  return (
    <Card 
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
      onClick={onClick}
    >
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
      
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {asset.thumbnail ? (
          <ImageWithFallback
            src={asset.thumbnail}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <Icon className="w-12 h-12 text-gray-300" />
          </div>
        )}
        
        <div className={`absolute bottom-2 right-2 ${fileConfig.color} rounded-full p-1.5 shadow-lg`}>
          <Icon className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="p-2">
        <div className="flex items-center gap-1 mb-1">
          <Icon className={`w-3 h-3 ${fileConfig.color.replace('bg-', 'text-')} shrink-0`} />
          <h3 className="text-xs truncate font-mono" title={asset.assetId}>
            {asset.assetId}
          </h3>
        </div>
        <div className="text-xs text-gray-500 truncate">
          {formatUsername(asset.userName)}
        </div>
      </div>
    </Card>
  );
}
