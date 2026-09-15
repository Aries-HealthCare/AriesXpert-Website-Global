import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchGrowthBlogBySlug } from '@/lib/growth-blog-posts';
import { GrowthBlogArticle } from './growth-blog-article';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchGrowthBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Aries PhysioCare',
      description: 'The requested health insights article could not be found.',
    };
  }

  return {
    title: `${post.title} | Aries PhysioCare Journal`,
    description:
      post.summary ||
      'Evidence-based clinical insights, post-stroke neurological rehabilitation protocols, and in-home recovery care from Aries PhysioCare.',
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.imageUrl || '/images/blog/stroke-rehab-hero.jpg'],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const growthPost = await fetchGrowthBlogBySlug(slug);

  if (!growthPost) notFound();

  return <GrowthBlogArticle post={growthPost} />;
}
