/**
 * Centralized Domain & URL Configuration for Aries PhysioCare
 * 
 * Single source of truth for production canonical domain, app subdomains,
 * and canonical URL normalization across the entire application.
 */

// Default canonical domain is .in (target production domain)
const DEFAULT_SITE_URL = 'https://ariesphysiocare.in';

/**
 * Returns the configured production site base URL (e.g. 'https://ariesphysiocare.in').
 * Trims any trailing slashes and ensures https protocol.
 */
export function getSiteUrl(): string {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL;

  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, '');
}

/**
 * Returns the raw hostname of the site (e.g. 'ariesphysiocare.in' or 'www.ariesphysiocare.in').
 */
export function getSiteHostname(): string {
  try {
    const parsed = new URL(getSiteUrl());
    return parsed.hostname;
  } catch {
    return 'ariesphysiocare.in';
  }
}

/**
 * Returns the base root domain without 'www.' (e.g. 'ariesphysiocare.in').
 */
export function getBaseDomain(): string {
  return getSiteHostname().replace(/^www\./, '');
}

/**
 * Returns the App subdomain URL (e.g. 'https://app.ariesphysiocare.in' or configured override).
 */
export function getAppUrl(path: string = ''): string {
  const overrideAppDomain = process.env.NEXT_PUBLIC_APP_DOMAIN;
  const baseDomain = getBaseDomain();
  const appDomain = overrideAppDomain || `app.${baseDomain}`;
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';

  return `https://${appDomain}${cleanPath}`;
}

/**
 * Normalizes a URL path:
 * - Ensures leading slash
 * - Eliminates accidental double slashes
 * - Strips trailing slashes (except root '/')
 * - Lowercases the path segment
 * - Strips query parameters and hashes for canonical URLs
 */
export function normalizePath(path: string = '/'): string {
  if (!path || path === '/') return '/';

  // Strip query strings and hash anchors
  const cleanPath = path.split('?')[0].split('#')[0];

  // Ensure leading slash and remove multiple slashes
  let normalized = cleanPath.replace(/\/+/g, '/');
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  // Remove trailing slash if longer than 1 character
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }

  return normalized.toLowerCase();
}

/**
 * Returns the fully qualified, normalized canonical URL for a given path.
 * Always utilizes the single source of truth base URL.
 * 
 * Example:
 * getCanonicalUrl('/services/physiotherapy/') -> 'https://ariesphysiocare.in/services/physiotherapy'
 */
export function getCanonicalUrl(path: string = '/'): string {
  const baseUrl = getSiteUrl();
  const normalized = normalizePath(path);

  if (normalized === '/') {
    return baseUrl;
  }

  return `${baseUrl}${normalized}`;
}

/**
 * Returns an absolute URL for assets, schemas, or links on the site domain.
 */
export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = getSiteUrl();
  if (!path) return baseUrl;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
