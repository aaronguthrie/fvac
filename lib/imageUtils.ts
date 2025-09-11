import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function createImageUrlBuilder(projectId: string | undefined, dataset: string | undefined) {
  return (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;
}

export function getOptimizedImageUrl(
  urlFor: ReturnType<typeof createImageUrlBuilder>,
  source: SanityImageSource,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png' | 'pjpg' | 'gif';
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'clip' | 'min';
    crop?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'focalpoint';
  } = {}
) {
  const {
    width = 800,
    height = 400,
    quality = 85,
    format = 'webp', // Default to webp for best compression
    fit = 'crop',
    crop = 'center'
  } = options;

  const imageBuilder = urlFor(source);
  if (!imageBuilder) return null;

  // Start with basic sizing
  return imageBuilder
    .width(width)
    .height(height)
    .format(format)
    .quality(quality)
    .fit(fit)
    .crop(crop)
    .url();
}

// Preset configurations for common image types
export const imagePresets = {
  eventCard: { width: 400, height: 200, quality: 85 },
  eventHero: { width: 800, height: 400, quality: 85 },
  newsHero: { width: 800, height: 400, quality: 85 },
  thumbnail: { width: 200, height: 200, quality: 80 },
  banner: { width: 1200, height: 400, quality: 90 },
} as const;