import { Asset } from '../types/asset';
import { AssetCard } from './AssetCard';
import { CompactAssetCard } from './CompactAssetCard';
import { MinimalAssetCard } from './MinimalAssetCard';

interface AssetGridProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onSelectAsset: (id: string) => void;
  density: 'comfortable' | 'compact' | 'minimal';
  onAssetClick: (asset: Asset) => void;
}

export function AssetGrid({ assets, selectedAssets, onSelectAsset, density, onAssetClick }: AssetGridProps) {
  const gridClasses = 
    density === 'minimal' 
      ? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3'
      : density === 'compact'
      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';

  return (
    <div className={gridClasses}>
      {assets.map((asset) => (
        density === 'minimal' ? (
          <MinimalAssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAssets.has(asset.id)}
            onSelect={onSelectAsset}
            onClick={() => onAssetClick(asset)}
          />
        ) : density === 'compact' ? (
          <CompactAssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAssets.has(asset.id)}
            onSelect={onSelectAsset}
          />
        ) : (
          <AssetCard
            key={asset.id}
            asset={asset}
            isSelected={selectedAssets.has(asset.id)}
            onSelect={onSelectAsset}
          />
        )
      ))}
    </div>
  );
}
