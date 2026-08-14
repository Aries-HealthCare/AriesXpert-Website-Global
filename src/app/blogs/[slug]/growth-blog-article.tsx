import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookAppointmentButton from '@/components/book-appointment-button';
import type { GrowthBlogPost } from '@/lib/growth-blog-posts';

export function GrowthBlogArticle({ post }: { post: GrowthBlogPost }) {
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <article>
          <header className="mb-12">
            <Badge variant="outline" className="mb-4 text-primary border-primary">
              {post.territory || post.topic || 'Local SEO'}
            </Badge>
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-6">
              {post.title}
            </h1>
            {date ? (
              <p className="text-muted-foreground text-sm">Published {date}</p>
            ) : null}
          </header>

          <div className="prose dark:prose-invert prose-lg max-w-none mx-auto mb-16 whitespace-pre-wrap text-foreground/90">
            {post.summary ? <p className="lead">{post.summary}</p> : null}
            <div>{post.content}</div>
            {post.cta ? <p className="font-semibold text-primary">{post.cta}</p> : null}
          </div>
        </article>

        <section className="my-16">
          <div className="glassmorphic rounded-lg p-8 text-center">
            <h3 className="font-headline text-2xl md:text-3xl font-bold">Need expert care at home?</h3>
            <p className="mt-2 text-muted-foreground">
              Book a consultation with an Aries PhysioCare specialist today.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <BookAppointmentButton size="lg" className="neon-accent-border">
                Book Appointment
              </BookAppointmentButton>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
