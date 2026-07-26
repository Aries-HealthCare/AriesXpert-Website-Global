'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, User } from 'lucide-react';
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from '@/components/book-appointment-button';


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { openModal } = useRequestCallback();
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedBlogPosts(post.serviceTag, post.id);

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <article>
          {/* Header */}
          <header className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span>{post.readTime}</span>
                </div>
                <Badge variant="outline" className="text-primary border-primary">{post.serviceTag}</Badge>
            </div>
            <div className="relative aspect-video w-full mt-8 rounded-lg overflow-hidden glassmorphic">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                data-ai-hint={post.imageHint}
                priority
              />
            </div>
          </header>

          {/* Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none mx-auto mb-16 space-y-6 text-foreground/90">
            <p className="lead">{post.summary}</p>
            <p>{post.content}</p>
            <h2>Understanding the Core Problem</h2>
            <p>This section delves deeper into the core issues the blog post is addressing, providing valuable, SEO-rich content. It links to relevant medical studies or internal service pages.</p>
            <blockquote>
                "Expert care at home is not just a convenience; it's a critical component of a faster, more effective recovery journey." - Aries PhysioCare Clinical Team
            </blockquote>
            <ul>
                <li>Benefit one of seeking professional help.</li>
                <li>Benefit two, explained in detail.</li>
                <li>Benefit three for long-term wellness.</li>
            </ul>
            <p>Aries PhysioCare is dedicated to bringing this level of care to your doorstep. <Link href={`/services/${post.relatedServiceSlug}`}>Learn more about our {post.serviceTag} services.</Link></p>
          </div>
        </article>

        {/* CTA Section */}
        <section className="my-16">
            <div className="glassmorphic rounded-lg p-8 text-center">
                <h3 className="font-headline text-2xl md:text-3xl font-bold">Need expert care at home?</h3>
                <p className="mt-2 text-muted-foreground">Book a consultation with an Aries PhysioCare specialist today.</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <BookAppointmentButton size="lg" className="neon-accent-border">Book Appointment</BookAppointmentButton>
                    <Button size="lg" variant="outline" onClick={() => openModal()}>Request Call Back</Button>
                </div>
            </div>
        </section>

        {/* Related Blogs */}
        <section>
          <h2 className="font-headline text-3xl font-bold mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="glassmorphic hover:neon-primary-border transition-all duration-300">
                <CardHeader>
                    <Badge variant="secondary" className="w-fit">{relatedPost.serviceTag}</Badge>
                    <CardTitle className="font-headline text-xl mt-2">
                        <Link href={`/blogs/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.summary}</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0">
                        <Link href={`/blogs/${relatedPost.slug}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
