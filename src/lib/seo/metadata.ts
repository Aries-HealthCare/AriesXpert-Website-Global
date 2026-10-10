import type { Metadata } from 'next';
import { getCanonicalUrl, getSiteUrl, getAbsoluteUrl } from './urls';

export interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  ogImage?: string;
  noIndex?: boolean;
  robots?: Metadata['robots'];
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'website' | 'article';
  ogType?: 'website' | 'article';
}

/**
 * Reusable metadata builder adhering to modern Next.js App Router conventions.
 * Automatically injects single-source-of-truth canonical URLs, OpenGraph tags,
 * Twitter cards, and robots directives.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  ogImage,
  noIndex = false,
  robots,
  publishedTime,
  modifiedTime,
  type = 'website',
  ogType,
}: PageMetadataProps): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const resolvedImage = ogImage || image;
  const imageUrl = resolvedImage ? getAbsoluteUrl(resolvedImage) : getAbsoluteUrl('/og-image.jpg');
  const resolvedType = ogType || type;

  const robotsDirective: Metadata['robots'] = robots
    ? robots
    : noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        };

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsDirective,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Aries PhysioCare',
      locale: 'en_IN',
      type: resolvedType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@ariesphysiocare',
      creator: '@ariesphysiocare',
      images: [imageUrl],
    },
  };
}
