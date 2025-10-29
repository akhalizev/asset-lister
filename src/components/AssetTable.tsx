import { Asset } from '../types/asset';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FileText, Image, Video, Headphones } from 'lucide-react';

interface AssetTableProps {
  assets: Asset[];
  selectedAssets: Set<string>;
  onSelectAsset: (id: string) => void;
  onSelectAll: () => void;
}

const fileTypeConfig = {
  document: { icon: FileText, color: 'text-red-500', label: 'Document' },
  image: { icon: Image, color: 'text-blue-500', label: 'Image' },
  video: { icon: Video, color: 'text-purple-500', label: 'Video' },
  audio: { icon: Headphones, color: 'text-green-500', label: 'Audio' }
};

const statusColors = {
  draft: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-800',
  'in-review': 'bg-blue-100 text-blue-800'
};

export function AssetTable({ assets, selectedAssets, onSelectAsset, onSelectAll }: AssetTableProps) {
  const allSelected = assets.length > 0 && assets.every(asset => selectedAssets.has(asset.id));
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Asset ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Case ID</TableHead>
              <TableHead>CAD ID</TableHead>
              <TableHead>Captured On</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Retention</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Size</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => {
              const fileConfig = fileTypeConfig[asset.assetType];
              const Icon = fileConfig.icon;
              
              return (
                <TableRow key={asset.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedAssets.has(asset.id)}
                      onCheckedChange={() => onSelectAsset(asset.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${fileConfig.color} shrink-0`} />
                      <span className="font-mono text-sm">{asset.assetId}</span>
                    </div>
                  </TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.caseId}</TableCell>
                  <TableCell className="font-mono text-sm">{asset.cadId}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(asset.capturedOn).toLocaleDateString()} {new Date(asset.capturedOn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(asset.uploaded).toLocaleDateString()} {new Date(asset.uploaded).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                  <TableCell>{fileConfig.label}</TableCell>
                  <TableCell>{asset.device}</TableCell>
                  <TableCell>{asset.station}</TableCell>
                  <TableCell>{asset.userName}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[asset.fileStatus]} variant="outline">
                      {asset.fileStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{asset.retentionSpan}</TableCell>
                  <TableCell>{asset.assetDuration}</TableCell>
                  <TableCell>{asset.assetSize}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
