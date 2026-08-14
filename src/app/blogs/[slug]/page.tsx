import { notFound } from 'next/navigation';
import { fetchGrowthBlogBySlug } from '@/lib/growth-blog-posts';
import { getBlogPostBySlug } from '@/lib/placeholder-data';
import PlaceholderBlogPostClient from './placeholder-blog-post-client';
import { GrowthBlogArticle } from './growth-blog-article';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const growthPost = await fetchGrowthBlogBySlug(slug);
  if (growthPost) {
    return <GrowthBlogArticle post={growthPost} />;
  }

  const placeholder = getBlogPostBySlug(slug);
  if (!placeholder) notFound();

  return <PlaceholderBlogPostClient />;
}
