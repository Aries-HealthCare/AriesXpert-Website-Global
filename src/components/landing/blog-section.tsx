import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/placeholder-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function BlogSection() {
  // Take top 3 for the home page display
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-6 md:py-10 relative overflow-hidden bg-background">
      {/* Atmospheric Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6 flex flex-col items-center animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <BookOpen className="w-4 h-4" /> Clinical Insights
          </div>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            The Aries <span className="premium-gradient-text">Health Journal</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Scientific guidance, clinical excellence, and recovery protocols curated by our specialist team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={cn(
                "animate-reveal-up fill-mode-both p-2",
                index === 0 && "stagger-1",
                index === 1 && "stagger-2",
                index === 2 && "stagger-3"
              )}
            >
              <Card className="group premium-card overflow-hidden h-full flex flex-col relative rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                <CardHeader className="p-0 relative overflow-hidden w-full">
                  <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/95 dark:bg-black/95 backdrop-blur-xl text-foreground dark:text-white border-none shadow-md font-bold text-[10px] uppercase tracking-[0.1em] px-4 py-1.5 rounded-full">
                        {post.serviceTag}
                      </Badge>
                    </div>
                  </Link>
                </CardHeader>

                <CardContent className="p-6 pb-0 flex-grow space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-[9px] font-black text-primary/60 uppercase tracking-[0.2em]">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} • {post.date}</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 leading-relaxed text-sm font-medium">
                    {post.summary}
                  </p>
                </CardContent>

                <CardFooter className="p-6 pt-4 mt-auto relative z-10">
                  <Button asChild variant="link" className="p-0 h-auto text-primary font-black text-[9px] uppercase tracking-[0.3em] group/btn hover:no-underline">
                    <Link href={`/blogs/${post.slug}`} className="flex items-center gap-2">
                      Read Analysis
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-reveal-up stagger-4 opacity-0 [animation-fill-mode:forwards]">
          <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border-primary/10 hover:border-primary/30 transition-all shadow-sm">
            <Link href="/blogs">Explore Full Archive</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
