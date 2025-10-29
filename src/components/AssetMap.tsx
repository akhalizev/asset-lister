import { Asset } from '../types/asset';
import { ChevronLeft, ChevronRight, MapPin as MapPinIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface AssetMapProps {
  asset: Asset;
  allAssets: Asset[];
  open: boolean;
  onClose: () => void;
  onNavigate: (asset: Asset) => void;
}

const fileTypeConfig = {
  document: { icon: FileText, color: 'bg-red-500', label: 'Document' },
  image: { icon: Image, color: 'bg-blue-500', label: 'Image' },
  video: { icon: Video, color: 'bg-purple-500', label: 'Video' },
  audio: { icon: Headphones, color: 'bg-green-500', label: 'Audio' }
};

const statusColors = {
  available: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800'
};

const statusLabels = {
  available: 'Available',
  expired: 'Expired'
};

// Mock location data for assets - in a real app, this would come from the asset data
const getAssetLocation = (assetId: string): [number, number] => {
  // Generate consistent but varied locations around a central point
  const hash = assetId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lat = 37.7749 + (hash % 100) / 1000 - 0.05; // San Francisco area
  const lng = -122.4194 + (hash % 100) / 1000 - 0.05;
  return [lat, lng];
};

export function AssetMap({ asset, allAssets, open, onClose, onNavigate }: AssetMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  const fileConfig = fileTypeConfig[asset.assetType];
  const Icon = fileConfig.icon;

  // Filter assets of the same type
  const sameTypeAssets = allAssets.filter(a => a.assetType === asset.assetType);
  const currentIndex = sameTypeAssets.findIndex(a => a.assetId === asset.assetId);
  const totalAssets = sameTypeAssets.length;

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(sameTypeAssets[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalAssets - 1) {
      onNavigate(sameTypeAssets[currentIndex + 1]);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!open || !mapRef.current) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Clear existing map
      if (map) {
        map.remove();
      }

      // Create map instance
      const newMap = L.map(mapRef.current!).setView([37.7749, -122.4194], 13);

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(newMap);

      setMap(newMap);

      // Create custom icon for markers
      const createMarkerIcon = (color: string, isActive: boolean) => {
        return L.divIcon({
          className: 'custom-marker',
          html: `<div style="background-color: ${color}; width: ${isActive ? '32px' : '24px'}; height: ${isActive ? '32px' : '24px'}; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); ${isActive ? 'transform: scale(1.2);' : ''}"></div>`,
          iconSize: [isActive ? 32 : 24, isActive ? 32 : 24],
          iconAnchor: [isActive ? 16 : 12, isActive ? 16 : 12]
        });
      };

      // Add markers for all assets
      const newMarkers = sameTypeAssets.map((a) => {
        const [lat, lng] = getAssetLocation(a.assetId);
        const isActive = a.assetId === asset.assetId;
        const assetConfig = fileTypeConfig[a.assetType];
        const markerColor = assetConfig.color.replace('bg-', '').replace('-500', '');
        
        // Map Tailwind color names to hex values
        const colorMap: { [key: string]: string } = {
          'red': '#ef4444',
          'blue': '#3b82f6',
          'purple': '#a855f7',
          'green': '#10b981'
        };

        const marker = L.marker([lat, lng], {
          icon: createMarkerIcon(colorMap[markerColor] || '#3b82f6', isActive)
        }).addTo(newMap);

        marker.on('click', () => {
          onNavigate(a);
        });

        // Add popup
        marker.bindPopup(`
          <div style="min-width: 200px;">
            <p style="font-weight: 600; margin-bottom: 4px; font-family: monospace;">${a.assetId}</p>
            <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${a.category}</p>
            <p style="font-size: 12px;"><strong>Station:</strong> ${a.station}</p>
            <p style="font-size: 12px;"><strong>Device:</strong> ${a.device}</p>
          </div>
        `);

        if (isActive) {
          newMap.setView([lat, lng], 15);
          marker.openPopup();
        }

        return marker;
      });

      setMarkers(newMarkers);

      // Cleanup
      return () => {
        newMap.remove();
      };
    });
  }, [open, asset.assetId]);

  if (!open) return null;

  return (
    <div className="flex flex-col h-full">


      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Only */}
        <div className="flex-1 flex flex-col w-full">
          {/* Map Area */}
          <div className="flex-1 relative">
            <div ref={mapRef} className="absolute inset-0" />
            {/* Add Leaflet CSS */}
            <style>{`
              @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
              .leaflet-container {
                width: 100%;
                height: 100%;
              }
              .custom-marker {
                background: transparent;
                border: none;
              }
            `}</style>
          </div>


        </div>
      </div>
    </div>
  );
}
