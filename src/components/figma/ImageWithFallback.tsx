import React, { useState, useRef, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// Cache to track loaded images by normalized URL
const imageCache = new Set<string>()
const loadedImages = new Map<string, HTMLImageElement>()

// Normalize URL by removing query parameters that don't affect the image (like Supabase tokens)
function normalizeImageUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // Remove query params that might change but don't affect the image
    // Keep only essential params if any
    urlObj.search = ''
    return urlObj.toString()
  } catch {
    // If not a valid URL, return as-is
    return url
  }
}

// Preload image into browser cache
function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const normalizedSrc = normalizeImageUrl(src)
    
    // Check if already preloaded
    const cached = loadedImages.get(normalizedSrc)
    if (cached && cached.complete) {
      resolve(cached)
      return
    }

    const img = new Image()
    img.onload = () => {
      loadedImages.set(normalizedSrc, img)
      imageCache.add(normalizedSrc)
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

export const ImageWithFallback = React.memo(function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const { src, alt, style, className, loading, ...rest } = props

  const normalizedSrc = src ? normalizeImageUrl(src) : null

  // Reset error state when src changes
  useEffect(() => {
    if (normalizedSrc && imageCache.has(normalizedSrc)) {
      setDidError(false)
      // Image is already cached, no flicker needed
    } else {
      setDidError(false)
    }
  }, [normalizedSrc])

  // Preload image if not already cached
  useEffect(() => {
    if (!src || didError) return

    const checkAndPreload = async () => {
      const normalized = normalizeImageUrl(src)
      
      // If already in cache, image should load instantly
      if (imageCache.has(normalized)) {
        return
      }

      // Preload the image
      try {
        await preloadImage(src)
      } catch {
        // Error will be handled by onError handler
      }
    }

    checkAndPreload()
  }, [src, didError])

  const handleError = () => {
    setDidError(true)
    if (normalizedSrc) {
      imageCache.delete(normalizedSrc)
      loadedImages.delete(normalizedSrc)
    }
  }

  const handleLoad = () => {
    if (normalizedSrc) {
      imageCache.add(normalizedSrc)
      // Store the loaded image element if available
      if (imgRef.current) {
        loadedImages.set(normalizedSrc, imgRef.current)
      }
    }
  }

  // Check if image is already loaded on mount/remount - reset error state
  useEffect(() => {
    if (!normalizedSrc) return
    
    const img = imgRef.current
    if (img && img.complete && img.naturalWidth !== 0) {
      imageCache.add(normalizedSrc)
      loadedImages.set(normalizedSrc, img)
      setDidError(false) // Reset error state if image is already loaded
    } else {
      // Reset error state when component remounts
      setDidError(false)
    }
  }, [normalizedSrc])

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
        style={style}
      >
        <div className="flex items-center justify-center w-full h-full">
          <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
        </div>
      </div>
    )
  }

  // Check if image is already cached/loaded - render immediately to avoid flicker
  const isCached = normalizedSrc ? imageCache.has(normalizedSrc) : false
  const cachedImg = normalizedSrc ? loadedImages.get(normalizedSrc) : null

  // For cached images, use background-image for instant display without browser revalidation
  if (isCached && cachedImg && cachedImg.complete) {
    return (
      <div 
        className={`relative w-full h-full ${className || ''}`}
        style={{ 
          ...style, 
          contain: 'layout style paint',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label={alt}
      >
        {/* Hidden img for accessibility and to keep it in cache */}
        <img
          src={src}
          alt={alt}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div 
      className="relative w-full h-full" 
      style={{ 
        ...style, 
        contain: 'layout style paint',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden' // Prevent flicker during transforms
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{ 
          display: 'block',
          imageRendering: 'auto',
          transform: 'translateZ(0)', // Force GPU acceleration
          ...rest.style 
        }}
        onError={handleError}
        onLoad={handleLoad}
        loading={loading || "lazy"} // Allow parent to override, default to lazy
        decoding="async"
        {...(rest as any)}
      />
    </div>
  )
}, (prevProps, nextProps) => {
  // Only re-render if normalized src actually changes
  const prevNormalized = prevProps.src ? normalizeImageUrl(prevProps.src) : null
  const nextNormalized = nextProps.src ? normalizeImageUrl(nextProps.src) : null
  return prevNormalized === nextNormalized && 
         prevProps.className === nextProps.className &&
         prevProps.alt === nextProps.alt
})
