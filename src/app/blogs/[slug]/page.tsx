import { notFound } from 'next/navigation';
import { fetchGrowthBlogBySlug } from '@/lib/growth-blog-posts';
import { GrowthBlogArticle } from './growth-blog-article';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const growthPost = await fetchGrowthBlogBySlug(slug);
  // Only real, backend-sourced Growth Engine posts are served — the legacy
  // static placeholder fallback (with fake "Full long-form content..." body
  // text) has been removed (P2-09).
  if (!growthPost) notFound();

  return <GrowthBlogArticle post={growthPost} />;
}
