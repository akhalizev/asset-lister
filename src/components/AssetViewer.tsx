import { Asset } from '../types/asset';
import { X, ChevronLeft, ChevronRight, Download, Share2, ZoomIn, ZoomOut, Maximize2, Map as MapIcon, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FileText, Image, Video, Headphones, Calendar, Upload, HardDrive, Clock, User, Shield, Database, MapPin, Fingerprint, Tag, FolderOpen } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { AssetMap } from './AssetMap';

interface AssetViewerProps {
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
  expired: 'Expired',
  recoverable: 'Recoverable'
};

export function AssetViewer({ asset, allAssets, open, onClose, onNavigate }: AssetViewerProps) {
  const [showMapPanel, setShowMapPanel] = useState(false);
  
  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // Reset video state when asset changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [asset.assetId]);
  
  if (!open) return null;

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

  // Video player controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimelineChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (newMutedState) {
        videoRef.current.volume = 0;
        setVolume(0);
      } else {
        videoRef.current.volume = volume || 0.5;
        setVolume(volume || 0.5);
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className={`${fileConfig.color} rounded-lg p-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-mono">{asset.assetId}</h2>
                <p className="text-sm text-gray-500">{asset.category}</p>
              </div>
            </div>

            <Badge className={statusColors[asset.fileStatus]} variant="outline">
              {statusLabels[asset.fileStatus]}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant={showMapPanel ? "default" : "outline"} 
              size="sm"
              onClick={() => setShowMapPanel(!showMapPanel)}
            >
              <MapIcon className="h-4 w-4 mr-2" />
              {showMapPanel ? 'Hide Map' : 'Show Map'}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-81px)] flex">
        {/* Left - Thumbnails (Always Visible) */}
        <div className="bg-[#161419] border-r border-[#1c1a1f] overflow-y-auto flex-shrink-0" style={{ width: '146px' }}>
          <div className="bg-[#161419] h-full relative rounded-lg" style={{ width: '146px' }}>
            <div className="box-border flex flex-col gap-3 h-full items-center overflow-clip p-2 relative rounded-[inherit]">
              {/* Top section - Expand button */}
              <div className="flex flex-col gap-3 items-center shrink-0">
                <button className="bg-[#343454] flex items-center justify-center relative rounded-full shrink-0 size-6">
                  <div className="size-4 flex items-center justify-center">
                    <p className="text-[#eeeeee] text-xs">⬍</p>
                  </div>
                </button>
                
                {/* Asset type display */}
                <div className="flex gap-2 h-8 items-center justify-center px-1 py-0 relative rounded-sm shrink-0">
                  <p className="text-[#d1d2d4] text-sm text-center whitespace-nowrap">
                    {fileConfig.label}s ({totalAssets})
                  </p>
                  <div className="flex items-center justify-center">
                    <p className="text-[#d1d2d4] text-sm leading-none">▼</p>
                  </div>
                </div>
              </div>

              {/* Middle section - Thumbnail carousel */}
              <div className="flex-1 flex flex-col gap-4 items-center overflow-y-auto overflow-x-hidden w-full px-1">
                {sameTypeAssets.map((a, idx) => {
                  const isActive = a.assetId === asset.assetId;
                  const thumbFileConfig = fileTypeConfig[a.assetType];
                  const ThumbIcon = thumbFileConfig.icon;
                  
                  return (
                    <div key={a.assetId} className="bg-[#232128] relative rounded-sm shrink-0 w-full" style={{ minHeight: '103px' }}>
                      {isActive && (
                        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-0 pointer-events-none rounded-sm z-10" />
                      )}
                      <div className="flex items-center justify-center size-full">
                        <button
                          onClick={() => onNavigate(a)}
                          className={`flex flex-col gap-2.5 items-center justify-center p-0.5 relative w-full h-full min-h-[103px] transition-opacity ${
                            !isActive ? 'opacity-60 hover:opacity-100' : ''
                          }`}
                        >
                          {a.thumbnail ? (
                            <div className="relative rounded w-full h-full max-h-[99px]">
                              <ImageWithFallback
                                src={a.thumbnail}
                                alt={a.assetId}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          ) : (
                            <div className={`w-full h-[99px] ${thumbFileConfig.color} flex items-center justify-center rounded`}>
                              <ThumbIcon className="w-8 h-8 text-white" />
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom section - Up/Down navigation */}
              <div className="flex gap-4 items-start shrink-0">
                <button 
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="bg-[#343454] flex items-center justify-center relative rounded-full shrink-0 size-6 disabled:opacity-40"
                >
                  <div className="size-4 flex items-center justify-center rotate-180 scale-y-[-100%]">
                    <p className={`text-xs ${currentIndex === 0 ? 'text-[#979797]' : 'text-[#eeeeee]'}`}>▼</p>
                  </div>
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === totalAssets - 1}
                  className="bg-[#343454] flex items-center justify-center relative rounded-full shrink-0 size-6 disabled:opacity-40"
                >
                  <div className="size-4 flex items-center justify-center rotate-180 scale-y-[-100%]">
                    <p className={`text-xs ${currentIndex === totalAssets - 1 ? 'text-[#979797]' : 'text-[#eeeeee]'}`}>▲</p>
                  </div>
                </button>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#1c1a1f] border-solid inset-0 pointer-events-none rounded-lg" />
          </div>
        </div>

        {/* Right - Tabbed Content */}
        <Tabs defaultValue="player" className="flex-1 flex flex-col">
          <div className="border-b px-6 py-2 bg-white">
            <TabsList className="w-full max-w-2xl">
              <TabsTrigger value="player" className="flex-1">Player</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="metadata" className="flex-1">Metadata</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
            </TabsList>
          </div>

          {/* Player Tab */}
          <TabsContent value="player" className="flex-1 flex flex-col bg-gray-50 mt-0">
            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center p-8">
              {asset.assetType === 'video' ? (
                // Video player without native controls
                asset.thumbnail ? (
                  <video
                    ref={videoRef}
                    src={asset.thumbnail}
                    className="max-w-full max-h-full rounded-lg shadow-lg"
                    style={{ maxHeight: 'calc(100vh - 300px)' }}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-16 flex flex-col items-center justify-center">
                    <Icon className="w-32 h-32 text-gray-300 mb-6" />
                    <p className="text-xl text-gray-500">{fileConfig.label}</p>
                    <p className="text-sm text-gray-400 mt-2">No preview available</p>
                  </div>
                )
              ) : asset.assetType === 'audio' ? (
                // Audio player with controls
                asset.thumbnail ? (
                  <div className="w-full max-w-2xl">
                    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center gap-6">
                      <Icon className="w-32 h-32 text-gray-300" />
                      <audio
                        src={asset.thumbnail}
                        controls
                        className="w-full"
                      >
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-16 flex flex-col items-center justify-center">
                    <Icon className="w-32 h-32 text-gray-300 mb-6" />
                    <p className="text-xl text-gray-500">{fileConfig.label}</p>
                    <p className="text-sm text-gray-400 mt-2">No preview available</p>
                  </div>
                )
              ) : (
                // Image or document preview
                asset.thumbnail ? (
                  <div className="max-w-full max-h-full flex items-center justify-center">
                    <ImageWithFallback
                      src={asset.thumbnail}
                      alt={asset.assetId}
                      className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-lg p-16 flex flex-col items-center justify-center">
                    <Icon className="w-32 h-32 text-gray-300 mb-6" />
                    <p className="text-xl text-gray-500">{fileConfig.label}</p>
                    <p className="text-sm text-gray-400 mt-2">No preview available</p>
                  </div>
                )
              )}
            </div>

            {/* Preview Controls */}
            <div className="bg-white border-t px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  {currentIndex + 1} of {totalAssets}
                </span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleNext}
                  disabled={currentIndex === totalAssets - 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Video player controls */}
              {asset.assetType === 'video' && (
                <div className="flex items-center gap-4 flex-1 mx-6">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <span className="text-xs text-gray-600 min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                  
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={0.1}
                    onValueChange={handleTimelineChange}
                    className="flex-1"
                  />
                  
                  <span className="text-xs text-gray-600 min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                  
                  <Separator orientation="vertical" className="h-6" />
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={toggleMute}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-24"
                  />
                </div>
              )}

              {/* Show zoom controls only for images and documents */}
              {(asset.assetType === 'image' || asset.assetType === 'document') && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">100%</span>
                  <Button variant="outline" size="icon">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-6 mx-2" />
                  <Button variant="outline" size="icon">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Details Tab */}
          <TabsContent value="details" className="flex-1 overflow-y-auto px-6 py-4 space-y-6 mt-0 bg-white">
            {/* Description */}
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Description</h3>
              <p className="text-sm">{asset.description}</p>
            </div>

            <Separator />

            {/* Case Information */}
            <div>
              <h3 className="mb-3">Case Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Fingerprint className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Asset ID</p>
                    <p className="font-mono text-sm">{asset.assetId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-lg p-2">
                    <Database className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Case ID</p>
                    <p className="font-mono text-sm">{asset.caseId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 rounded-lg p-2">
                    <Shield className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">CAD ID</p>
                    <p className="font-mono text-sm">{asset.cadId}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 rounded-lg p-2">
                    <Tag className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Category</p>
                    <p className="text-sm">{asset.category}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Asset Details */}
            <div>
              <h3 className="mb-3">Asset Details</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className={`${fileConfig.color} rounded-lg p-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm">{fileConfig.label}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <HardDrive className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Size</p>
                    <p className="text-sm">{asset.assetSize}</p>
                  </div>
                </div>

                {asset.assetDuration !== 'N/A' && (
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-200 rounded-lg p-2">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm">{asset.assetDuration}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Retention Span</p>
                    <p className="text-sm">{asset.retentionSpan}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <h3 className="mb-3">Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Captured On</p>
                    <p className="text-sm">
                      {new Date(asset.capturedOn).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                      {' at '}
                      {new Date(asset.capturedOn).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Uploaded</p>
                    <p className="text-sm">
                      {new Date(asset.uploaded).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                      {' at '}
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
              <h3 className="mb-3">Source Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <HardDrive className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Device</p>
                    <p className="text-sm">{asset.device}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Station</p>
                    <p className="text-sm">{asset.station}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gray-200 rounded-lg p-2">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">User</p>
                    <p className="text-sm">{asset.userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Metadata Tab */}
          <TabsContent value="metadata" className="flex-1 overflow-y-auto px-6 py-4 space-y-4 mt-0 bg-white">
            <div className="space-y-2">
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Asset ID</span>
                <span className="text-sm font-mono">{asset.assetId}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Case ID</span>
                <span className="text-sm font-mono">{asset.caseId}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">CAD ID</span>
                <span className="text-sm font-mono">{asset.cadId}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Category</span>
                <span className="text-sm">{asset.category}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Type</span>
                <span className="text-sm">{fileConfig.label}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Status</span>
                <Badge className={statusColors[asset.fileStatus]} variant="outline">
                  {statusLabels[asset.fileStatus]}
                </Badge>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm">{asset.assetSize}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Duration</span>
                <span className="text-sm">{asset.assetDuration}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Retention</span>
                <span className="text-sm">{asset.retentionSpan}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Device</span>
                <span className="text-sm">{asset.device}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">Station</span>
                <span className="text-sm">{asset.station}</span>
              </div>
              <Separator />
              <div className="flex gap-8 py-2">
                <span className="text-sm text-gray-500">User</span>
                <span className="text-sm">{asset.userName}</span>
              </div>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="flex-1 overflow-y-auto px-6 py-4 mt-0 bg-white">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Asset uploaded</p>
                  <p className="text-xs text-gray-500">
                    {new Date(asset.uploaded).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">Asset captured</p>
                  <p className="text-xs text-gray-500">
                    {new Date(asset.capturedOn).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">by {asset.userName}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Map Panel (Right Side) */}
        {showMapPanel && (
          <div className="w-[500px] border-l bg-white flex-shrink-0">
            <AssetMap
              asset={asset}
              allAssets={allAssets}
              open={showMapPanel}
              onClose={() => setShowMapPanel(false)}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>
    </div>
  );
}
