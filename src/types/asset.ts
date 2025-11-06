export type AssetType = 'image' | 'video' | 'audio' | 'document';

export type FileStatus = 'available' | 'expired' | 'recoverable';

export interface Asset {
  id: string;
  assetId: string;
  category: string;
  caseId: string;
  cadId: string;
  description: string;
  capturedOn: string;
  uploaded: string;
  assetType: AssetType;
  device: string;
  station: string;
  userName: string;
  fileStatus: FileStatus;
  retentionSpan: string;
  assetDuration: string;
  assetSize: string;
  thumbnail?: string;
  unitId?: string;
}
