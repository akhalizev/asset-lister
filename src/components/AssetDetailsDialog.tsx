import React from 'react';
import { Asset } from '../types/asset';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones, Calendar, Upload, HardDrive, Clock, Tag, User, Shield, Database, MapPin, Fingerprint } from 'lucide-react';
import { Separator } from './ui/separator';

interface AssetDetailsDialogProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fileTypeConfig = {
  document: { icon: FileText, color: 'bg-red-500', label: 'Document' },
  image: { icon: Image, color: 'bg-blue-500', label: 'Image' },
  video: { icon: Video, color: 'bg-purple-500', label: 'Video' },
  audio: { icon: Headphones, color: 'bg-green-500', label: 'Audio' }
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  recoverable: 'bg-yellow-100 text-yellow-800'
};

const statusLabels = {
  available: 'Available',
  expired: 'Expired',
  recoverable: 'Recoverable'
};

export function AssetDetailsDialog({ asset, open, onOpenChange }: AssetDetailsDialogProps) {
  if (!asset) return null;

  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-mono">{asset.assetId}</DialogTitle>
          <DialogDescription>
            {asset.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className="aspect-video bg-gray-100 rounded-lg relative overflow-hidden">
            {asset.thumbnail ? (
              <ImageWithFallback
                src={asset.thumbnail}
                alt={asset.assetId}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <Icon className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-gray-500">{fileConfig.label}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Case Information */}
          <div>
            <h3 className="mb-4">Case Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg p-2 mt-0.5">
                  <Fingerprint className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Asset ID</p>
                  <p className="font-mono">{asset.assetId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-lg p-2 mt-0.5">
                  <Database className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Case ID</p>
                  <p className="font-mono">{asset.caseId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 rounded-lg p-2 mt-0.5">
                  <Shield className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">CAD ID</p>
                  <p className="font-mono">{asset.cadId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 rounded-lg p-2 mt-0.5">
                  <Tag className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p>{asset.category}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Asset Details */}
          <div>
            <h3 className="mb-4">Asset Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className={`${fileConfig.color} rounded-lg p-2 mt-0.5`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Asset Type</p>
                  <p>{fileConfig.label}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                  <HardDrive className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">File Size</p>
                  <p>{asset.assetSize}</p>
                </div>
              </div>

              {asset.assetDuration !== 'N/A' && (
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p>{asset.assetDuration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className={`${statusColors[asset.fileStatus]} rounded-lg p-2 mt-0.5 border`}>
                  <div className="w-4 h-4 rounded-full border-2 border-current"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={statusColors[asset.fileStatus]} variant="outline">
                    {statusLabels[asset.fileStatus]}
                  </Badge>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retention Span</p>
                  <p>{asset.retentionSpan}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timestamps */}
          <div>
            <h3 className="mb-4">Timeline</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-lg p-2 mt-0.5">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Captured On</p>
                  <p>{new Date(asset.capturedOn).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(asset.capturedOn).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg p-2 mt-0.5">
                  <Upload className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uploaded</p>
                  <p>{new Date(asset.uploaded).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(asset.uploaded).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Source Information */}
          <div>
            <h3 className="mb-4">Source Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                  <HardDrive className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Device</p>
                  <p>{asset.device}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                  <MapPin className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Station</p>
                  <p>{asset.station}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gray-200 rounded-lg p-2 mt-0.5">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">User</p>
                  <p>{asset.userName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
