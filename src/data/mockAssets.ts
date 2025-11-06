import { Asset, AssetType, FileStatus } from '../types/asset';
// Import multiple thumbnail images for variety
import thumb1 from 'figma:asset/f7bdc7c3675a201b22e82f4db7988551fa4bd8e9.png';
import thumb2 from 'figma:asset/332b24b3de4e262662ba06ac0d355e3b046308be.png';
import thumb3 from 'figma:asset/410091be46419428c5e5c59d9da30f70a565cea7.png';
import thumb4 from 'figma:asset/4becfd878069c4df0ebfec7ffb57749b20f5c55f.png';
import thumb5 from 'figma:asset/69e64033d53d8fe3afeedc6660ce8adb3bb1b10a.png';
import thumb6 from 'figma:asset/747a27fe416ebfaf57b25beae190a98036e77d0e.png';
import thumb7 from 'figma:asset/9fcda7faf487ffa9a989ea8f44315905f0ff23fa.png';
import thumb8 from 'figma:asset/d032069d0e81c306f7036f6e92d6554c3a1b6eaa.png';
import thumb9 from 'figma:asset/d77ed8d07dbad509bd7ab5e286c6e31590bb0f69.png';
import thumb10 from 'figma:asset/f3364c7b257c0b3cc919414fdcfa749e50bbdc2f.png';
import thumb11 from 'figma:asset/f7eaa289a8ed2120f1d1130383a6e1c0725fc497.png';

// Array of thumbnails to cycle through for images and videos
const thumbnailImages = [
  thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, 
  thumb7, thumb8, thumb9, thumb10, thumb11
];

// Function to get a thumbnail for an asset based on its ID (for consistent assignment)
function getThumbnailForAsset(assetId: string, assetType: AssetType): string | undefined {
  if (assetType === 'image' || assetType === 'video') {
    // Use assetId to determine which thumbnail (for consistency)
    const hash = assetId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return thumbnailImages[hash % thumbnailImages.length];
  }
  return undefined;
}

const baseAssets: Asset[] = [
  {
    id: '1',
    assetId: 'SMG-AST-2024-001',
    category: 'Body Cam',
    caseId: 'CASE-2024-1523',
    cadId: 'CAD-45782',
    description: 'Routine traffic stop on Main Street, driver cited for speeding',
    capturedOn: '2024-10-14T14:30:00',
    uploaded: '2024-10-14T15:45:00',
    assetType: 'video',
    device: 'Axon Body 3',
    station: 'Station 01',
    userName: 'Officer J. Martinez',
    fileStatus: 'available',
    retentionSpan: '7 years',
    assetDuration: '00:12:34',
    assetSize: '245.8 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-001', 'video'),
    unitId: 'BWC-S01-042'
  },
  {
    id: '2',
    assetId: 'SMG-AST-2024-002',
    category: 'Crime Scene',
    caseId: 'CASE-2024-1501',
    cadId: 'CAD-45690',
    description: 'Interior photos of burglary scene at 456 Oak Avenue',
    capturedOn: '2024-10-12T09:15:00',
    uploaded: '2024-10-12T11:30:00',
    assetType: 'image',
    device: 'Canon EOS R5',
    station: 'Station 03',
    userName: 'Det. S. Rodriguez',
    fileStatus: 'available',
    retentionSpan: '10 years',
    assetDuration: 'N/A',
    assetSize: '8.4 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-002', 'image'),
    unitId: undefined
  },
  {
    id: '3',
    assetId: 'SMG-AST-2024-003',
    category: 'Interview',
    caseId: 'CASE-2024-1498',
    cadId: 'CAD-45623',
    description: 'Witness interview regarding incident at Central Park',
    capturedOn: '2024-10-10T16:20:00',
    uploaded: '2024-10-10T17:00:00',
    assetType: 'audio',
    device: 'Olympus WS-853',
    station: 'Station 02',
    userName: 'Det. M. Chen',
    fileStatus: 'available',
    retentionSpan: '5 years',
    assetDuration: '00:45:12',
    assetSize: '42.1 MB',
    thumbnail: undefined,
    unitId: 'AUD-2024-156'
  },
  {
    id: '4',
    assetId: 'SMG-AST-2024-004',
    category: 'Dash Cam',
    caseId: 'CASE-2024-1530',
    cadId: 'CAD-45801',
    description: 'High-speed pursuit on Highway 101 northbound',
    capturedOn: '2024-10-15T22:10:00',
    uploaded: '2024-10-16T08:15:00',
    assetType: 'video',
    device: 'Watchguard 4RE',
    station: 'Station 04',
    userName: 'Officer T. Johnson',
    fileStatus: 'available',
    retentionSpan: '7 years',
    assetDuration: '00:18:45',
    assetSize: '356.2 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-004', 'video'),
    unitId: 'ICV-0234'
  },
  {
    id: '5',
    assetId: 'SMG-AST-2024-005',
    category: 'Documentation',
    caseId: 'CASE-2024-1495',
    cadId: 'CAD-45598',
    description: 'Complete incident report with supporting documentation',
    capturedOn: '2024-10-08T19:30:00',
    uploaded: '2024-10-09T09:00:00',
    assetType: 'document',
    device: 'Records System',
    station: 'Station 01',
    userName: 'Officer K. Williams',
    fileStatus: 'available',
    retentionSpan: '5 years',
    assetDuration: 'N/A',
    assetSize: '2.3 MB',
    thumbnail: undefined,
    unitId: undefined
  },
  {
    id: '6',
    assetId: 'SMG-AST-2024-006',
    category: 'Body Cam',
    caseId: 'CASE-2024-1520',
    cadId: 'CAD-45765',
    description: 'Arrest of suspect for outstanding warrant',
    capturedOn: '2024-10-13T11:45:00',
    uploaded: '2024-10-13T14:20:00',
    assetType: 'video',
    device: 'Axon Body 3',
    station: 'Station 02',
    userName: 'Officer D. Brown',
    fileStatus: 'available',
    retentionSpan: '7 years',
    assetDuration: '00:08:23',
    assetSize: '165.4 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-006', 'video'),
    unitId: 'BWC-089'
  },
  {
    id: '7',
    assetId: 'SMG-AST-2024-007',
    category: 'Crime Scene',
    caseId: 'CASE-2024-1535',
    cadId: 'CAD-45820',
    description: 'Multi-angle photos of three-vehicle collision on I-95',
    capturedOn: '2024-10-16T07:20:00',
    uploaded: '2024-10-16T10:00:00',
    assetType: 'image',
    device: 'Nikon D850',
    station: 'Station 05',
    userName: 'Officer R. Garcia',
    fileStatus: 'expired',
    retentionSpan: '3 years',
    assetDuration: 'N/A',
    assetSize: '45.7 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-007', 'image'),
    unitId: undefined
  },
  {
    id: '8',
    assetId: 'SMG-AST-2024-008',
    category: 'Surveillance',
    caseId: 'CASE-2024-1512',
    cadId: 'CAD-45723',
    description: 'Store surveillance video showing armed robbery suspect',
    capturedOn: '2024-10-11T21:35:00',
    uploaded: '2024-10-12T08:00:00',
    assetType: 'video',
    device: 'Store CCTV',
    station: 'Station 03',
    userName: 'Det. A. Thompson',
    fileStatus: 'available',
    retentionSpan: '10 years',
    assetDuration: '00:03:47',
    assetSize: '128.9 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-008', 'video'),
    unitId: 'CCTV-S03-127'
  },
  {
    id: '9',
    assetId: 'SMG-AST-2024-009',
    category: 'Audio Recording',
    caseId: 'CASE-2024-1508',
    cadId: 'CAD-45705',
    description: 'Emergency call reporting suspicious activity',
    capturedOn: '2024-10-11T03:15:00',
    uploaded: '2024-10-11T03:20:00',
    assetType: 'audio',
    device: 'Dispatch Console',
    station: 'Dispatch Center',
    userName: 'Dispatcher L. Anderson',
    fileStatus: 'available',
    retentionSpan: '7 years',
    assetDuration: '00:04:32',
    assetSize: '5.2 MB',
    thumbnail: undefined,
    unitId: 'DVR-2024-089'
  },
  {
    id: '10',
    assetId: 'SMG-AST-2024-010',
    category: 'Documentation',
    caseId: 'CASE-2024-1501',
    cadId: 'CAD-45690',
    description: 'Complete evidence inventory from burglary investigation',
    capturedOn: '2024-10-12T12:00:00',
    uploaded: '2024-10-12T13:30:00',
    assetType: 'document',
    device: 'Evidence System',
    station: 'Station 03',
    userName: 'Evidence Tech P. Wilson',
    fileStatus: 'available',
    retentionSpan: '10 years',
    assetDuration: 'N/A',
    assetSize: '1.8 MB',
    thumbnail: undefined,
    unitId: undefined
  },
  {
    id: '11',
    assetId: 'SMG-AST-2024-011',
    category: 'Aerial',
    caseId: 'CASE-2024-1528',
    cadId: 'CAD-45795',
    description: 'Aerial drone footage of missing person search area',
    capturedOn: '2024-10-15T14:00:00',
    uploaded: '2024-10-15T16:45:00',
    assetType: 'video',
    device: 'DJI Mavic 3',
    station: 'Station 04',
    userName: 'Officer E. Davis',
    fileStatus: 'available',
    retentionSpan: '5 years',
    assetDuration: '00:32:18',
    assetSize: '892.3 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-011', 'video'),
    unitId: 'DRN-0045'
  },
  {
    id: '12',
    assetId: 'SMG-AST-2024-012',
    category: 'Body Cam',
    caseId: 'N/A',
    cadId: 'N/A',
    description: 'Community policing event at local school',
    capturedOn: '2024-10-09T10:30:00',
    uploaded: '2024-10-09T12:00:00',
    assetType: 'video',
    device: 'Axon Body 3',
    station: 'Station 01',
    userName: 'Officer J. Martinez',
    fileStatus: 'available',
    retentionSpan: '1 year',
    assetDuration: '01:15:22',
    assetSize: '478.6 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-012', 'video'),
    unitId: 'BWC-156'
  },
  {
    id: '13',
    assetId: 'SMG-AST-2024-013',
    category: 'Crime Scene',
    caseId: 'CASE-2024-1512',
    cadId: 'CAD-45723',
    description: 'Close-up forensic photos of recovered evidence',
    capturedOn: '2024-10-12T15:20:00',
    uploaded: '2024-10-12T16:00:00',
    assetType: 'image',
    device: 'Canon EOS R5',
    station: 'Crime Lab',
    userName: 'Forensic Tech M. Lee',
    fileStatus: 'available',
    retentionSpan: '10 years',
    assetDuration: 'N/A',
    assetSize: '12.6 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-013', 'image'),
    unitId: undefined
  },
  {
    id: '14',
    assetId: 'SMG-AST-2024-014',
    category: 'Training',
    caseId: 'N/A',
    cadId: 'N/A',
    description: 'Active shooter response training scenario',
    capturedOn: '2024-10-07T09:00:00',
    uploaded: '2024-10-07T11:30:00',
    assetType: 'video',
    device: 'Training Camera',
    station: 'Training Facility',
    userName: 'Sgt. C. Moore',
    fileStatus: 'expired',
    retentionSpan: '2 years',
    assetDuration: '02:45:00',
    assetSize: '1.2 GB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-014', 'video'),
    unitId: 'DVR-2024-234'
  },
  {
    id: '15',
    assetId: 'SMG-AST-2024-015',
    category: 'Dash Cam',
    caseId: 'CASE-2024-1540',
    cadId: 'CAD-45835',
    description: 'Standard patrol shift dash cam footage',
    capturedOn: '2024-10-16T18:00:00',
    uploaded: '2024-10-16T20:30:00',
    assetType: 'video',
    device: 'Watchguard 4RE',
    station: 'Station 02',
    userName: 'Officer L. Taylor',
    fileStatus: 'expired',
    retentionSpan: '90 days',
    assetDuration: '04:12:35',
    assetSize: '2.8 GB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-015', 'video'),
    unitId: 'CAR-S02-567'
  },
  {
    id: '16',
    assetId: 'SMG-AST-2024-016',
    category: 'Interview',
    caseId: 'CASE-2024-1520',
    cadId: 'CAD-45765',
    description: 'Formal interrogation of arrested suspect',
    capturedOn: '2024-10-13T16:00:00',
    uploaded: '2024-10-13T18:30:00',
    assetType: 'video',
    device: 'Interview Room Cam',
    station: 'Station 02',
    userName: 'Det. S. Rodriguez',
    fileStatus: 'available',
    retentionSpan: '7 years',
    assetDuration: '01:23:45',
    assetSize: '624.3 MB',
    thumbnail: getThumbnailForAsset('SMG-AST-2024-016', 'video'),
    unitId: 'CCTV-S02-009'
  }
];

// Configuration for generating large datasets
const categories = [
  'Body Cam', 'Crime Scene', 'Interview', 'Dash Cam', 'Documentation',
  'Surveillance', 'Audio Recording', 'Aerial', 'Training'
];

const devices = [
  'Axon Body 3', 'Canon EOS R5', 'Olympus WS-853', 'Watchguard 4RE',
  'Records System', 'Nikon D850', 'Store CCTV', 'Dispatch Console',
  'Evidence System', 'DJI Mavic 3', 'Training Camera', 'Interview Room Cam',
  'Axon Fleet 3', 'Panasonic HC-X2000', 'Sony A7R IV'
];

// Unit ID prefixes for different device types
const unitIdPrefixes = [
  'BWC',   // Body Worn Camera
  'CAR',   // Car/Vehicle Camera
  'FLT',   // Fleet Camera
  'ICV',   // In-Car Video
  'DVR',   // Digital Video Recorder
  'CCTV',  // Closed Circuit TV
  'DRN',   // Drone
  'AUD',   // Audio Recorder
  'UNIT',  // Generic Unit
  'VHC',   // Vehicle
  'PAT',   // Patrol
  'RES',   // Response Unit
];

// Station codes for unit IDs
const stationCodes = ['01', '02', '03', '04', '05', 'N', 'S', 'E', 'W', 'HQ'];

const stations = [
  'Station 01', 'Station 02', 'Station 03', 'Station 04', 'Station 05',
  'Crime Lab', 'Dispatch Center', 'Training Facility'
];

const officerNames = [
  'Officer J. Martinez', 'Det. S. Rodriguez', 'Det. M. Chen',
  'Officer T. Johnson', 'Officer K. Williams', 'Officer D. Brown',
  'Officer R. Garcia', 'Det. A. Thompson', 'Dispatcher L. Anderson',
  'Evidence Tech P. Wilson', 'Officer E. Davis', 'Forensic Tech M. Lee',
  'Sgt. C. Moore', 'Officer L. Taylor', 'Officer M. Anderson',
  'Det. K. Patel', 'Officer S. White', 'Sgt. J. Clark'
];

const descriptions = [
  'Routine traffic stop on Main Street, driver cited for speeding',
  'Interior photos of burglary scene',
  'Witness interview regarding incident',
  'High-speed pursuit on Highway 101 northbound',
  'Complete incident report with supporting documentation',
  'Arrest of suspect for outstanding warrant',
  'Multi-angle photos of three-vehicle collision',
  'Store surveillance video showing suspect',
  'Emergency call reporting suspicious activity',
  'Complete evidence inventory from investigation',
  'Aerial drone footage of search area',
  'Community policing event at local school',
  'Close-up forensic photos of recovered evidence',
  'Active shooter response training scenario',
  'Standard patrol shift footage',
  'Formal interrogation of arrested suspect',
  'Foot pursuit through residential area',
  'Weapons confiscation documentation',
  'Drug seizure evidence collection',
  'Field sobriety test recording'
];

const retentionSpans = ['90 days', '1 year', '2 years', '3 years', '5 years', '7 years', '10 years'];

function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const secs = Math.floor((minutes % 1) * 60);
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatSizeMB(mb: number): string {
  if (mb < 1) return `${(mb * 1024).toFixed(1)} KB`;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(1)} GB`;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateMockAsset(id: number): Asset {
  const assetType: AssetType = (['image', 'video', 'audio', 'document'] as const)[
    Math.floor(Math.random() * 4)
  ];
  const fileStatus: FileStatus = Math.random() > 0.85 ? 'expired' : 'available';
  const category = categories[Math.floor(Math.random() * categories.length)];
  const device = devices[Math.floor(Math.random() * devices.length)];
  const station = stations[Math.floor(Math.random() * stations.length)];
  const userName = officerNames[Math.floor(Math.random() * officerNames.length)];
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const retentionSpan = retentionSpans[Math.floor(Math.random() * retentionSpans.length)];
  
  const caseId = Math.random() > 0.1 
    ? `CASE-2024-${String(1500 + Math.floor(Math.random() * 100)).padStart(4, '0')}`
    : 'N/A';
  const cadId = Math.random() > 0.1 
    ? `CAD-${String(45500 + Math.floor(Math.random() * 350)).padStart(5, '0')}`
    : 'N/A';
  
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');
  const capturedOn = randomDate(startDate, endDate);
  const uploaded = new Date(capturedOn.getTime() + Math.random() * 24 * 60 * 60 * 1000);
  
  let assetDuration = 'N/A';
  let assetSize = '0 MB';
  
  if (assetType === 'video') {
    const minutes = Math.random() * 180 + 5; // 5 minutes to 3 hours
    assetDuration = formatDuration(minutes);
    assetSize = formatSizeMB(minutes * 15 + Math.random() * 100); // ~15 MB per minute + variance
  } else if (assetType === 'audio') {
    const minutes = Math.random() * 60 + 1; // 1 minute to 1 hour
    assetDuration = formatDuration(minutes);
    assetSize = formatSizeMB(minutes * 1.5 + Math.random() * 10); // ~1.5 MB per minute + variance
  } else if (assetType === 'image') {
    assetSize = formatSizeMB(Math.random() * 50 + 2); // 2-52 MB
  } else {
    assetSize = formatSizeMB(Math.random() * 5 + 0.5); // 0.5-5.5 MB
  }
  
  // Generate unitId with variety based on device type and category
  let unitId: string | undefined = undefined;
  
  // Determine if this asset should have a unit ID based on category and device
  const hasUnitId = 
    category === 'Body Cam' || 
    category === 'Dash Cam' || 
    category === 'Surveillance' ||
    category === 'Aerial' ||
    category === 'Audio Recording' ||
    device.includes('Body') || 
    device.includes('Dash') || 
    device.includes('Fleet') ||
    device.includes('CCTV') ||
    device.includes('Drone') ||
    device.includes('Mavic') ||
    device.includes('Video') ||
    device.includes('Camera');
  
  if (hasUnitId) {
    const prefix = unitIdPrefixes[Math.floor(Math.random() * unitIdPrefixes.length)];
    const stationCode = Math.random() > 0.5 ? stationCodes[Math.floor(Math.random() * stationCodes.length)] : null;
    
    // Create variety in unit ID formats
    const formatType = Math.floor(Math.random() * 4);
    let unitNumber: string;
    
    switch (formatType) {
      case 0:
        // Format: BWC-001
        unitNumber = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        unitId = `${prefix}-${unitNumber}`;
        break;
      case 1:
        // Format: BWC-S01-001 (with station code)
        unitNumber = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        unitId = stationCode ? `${prefix}-S${stationCode}-${unitNumber}` : `${prefix}-${unitNumber}`;
        break;
      case 2:
        // Format: BWC001 (no dash)
        unitNumber = String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0');
        unitId = `${prefix}${unitNumber}`;
        break;
      case 3:
        // Format: BWC-2024-001 (with year)
        unitNumber = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        unitId = `${prefix}-2024-${unitNumber}`;
        break;
      default:
        unitNumber = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        unitId = `${prefix}-${unitNumber}`;
    }
  }
  
  const assetId = `SMG-AST-2024-${String(id).padStart(6, '0')}`;
  
  return {
    id: String(id),
    assetId,
    category,
    caseId,
    cadId,
    description,
    capturedOn: capturedOn.toISOString(),
    uploaded: uploaded.toISOString(),
    assetType,
    device,
    station,
    userName,
    fileStatus,
    retentionSpan,
    assetDuration,
    assetSize,
    thumbnail: getThumbnailForAsset(assetId, assetType),
    unitId
  };
}

/**
 * Generate a large mock dataset for testing virtualization and lazy loading
 * @param count Number of assets to generate (default: 10000)
 */
export function generateMockAssets(count: number = 10000): Asset[] {
  return Array.from({ length: count }, (_, i) => generateMockAsset(i + 1));
}

// Export base assets for backward compatibility
export const mockAssets: Asset[] = baseAssets;
