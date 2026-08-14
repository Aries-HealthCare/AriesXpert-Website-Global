/**
 * Fetches AI-published blog articles from the Growth Engine public catalog.
 */

export interface GrowthBlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  contentId?: string;
  territory?: string;
  topic?: string;
  publishedAt?: string;
  url?: string;
  cta?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://api.ariesxpert.com/api/v1';

export async function fetchGrowthBlogPosts(): Promise<GrowthBlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}/growth-engine/public/website/blogs`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.data) ? json.data : [];
  } catch {
    return [];
  }
}

export async function fetchGrowthBlogBySlug(
  slug: string,
): Promise<GrowthBlogPost | null> {
  const posts = await fetchGrowthBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
