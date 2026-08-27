import Link from "next/link";
import Image from "next/image";
import { fetchGrowthBlogPosts } from "@/lib/growth-blog-posts";
import { services } from "@/lib/placeholder-data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Clock, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const metadata = {
    title: "Health Insights Blog | Aries PhysioCare",
    description: "Expert advice, evidence-based care, and home healthcare guidance from the Aries PhysioCare clinical team. Stay informed on physiotherapy, recovery, and wellness.",
    keywords: "Healthcare Blog, Physiotherapy Tips, Home Care, Wellness, Aries PhysioCare, Recovery Advice"
};

function getBlogCover(topic?: string, territory?: string, title?: string) {
  const query = `${topic || ''} ${territory || ''} ${title || ''}`.toLowerCase();
  if (query.includes('back') || query.includes('spine') || query.includes('sciatica') || query.includes('lumbar')) {
    return 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('knee') || query.includes('joint') || query.includes('arthritis') || query.includes('ligament')) {
    return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('sport') || query.includes('runner') || query.includes('athlet') || query.includes('fitness')) {
    return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('neck') || query.includes('postur') || query.includes('desk') || query.includes('ergo')) {
    return 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('neuro') || query.includes('stroke') || query.includes('brain') || query.includes('paralysis')) {
    return 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('diet') || query.includes('nutrit') || query.includes('food') || query.includes('diabetes')) {
    return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('senior') || query.includes('elder') || query.includes('geriatric') || query.includes('fall')) {
    return 'https://images.unsplash.com/photo-1576765608535-5f04c18459e4?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('child') || query.includes('pediatric') || query.includes('sensory') || query.includes('baby')) {
    return 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=85&w=1600';
  }
  if (query.includes('nurse') || query.includes('wound') || query.includes('surg') || query.includes('icu')) {
    return 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=85&w=1600';
  }
  return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1600';
}

export default async function BlogsPage() {
  const growthPosts = await fetchGrowthBlogPosts();
  // Only real, backend-sourced posts from the Growth Engine CMS feed are
  // shown — the legacy static placeholder posts have been removed (P2-09).
  const allPosts = growthPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    serviceTag: p.territory || p.topic || 'Clinical Insights',
    readTime: `${Math.max(3, Math.ceil((p.content?.length || 400) / 900))} min read`,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
      : 'Recently',
    author: 'Aries Clinical Board',
    imageUrl: p.imageUrl || getBlogCover(p.topic, p.territory, p.title),
    imageHint: `${p.topic || 'medical'} healthcare blog cover`,
    isGrowth: true,
  }));

  return (
    <div className="bg-background min-h-screen">
      {/* Elegant Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="outline" className="text-primary border-primary/30 px-4 py-1 uppercase tracking-widest text-[10px] font-bold">
              Expert Insights & Recovery
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              The Aries <span className="text-primary">Health Journal</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Scientific guidance, clinical excellence, and recovery protocols curated by the Aries PhysioCare specialist team.
            </p>
          </div>
        </div>
      </section>

      {/* Discovery & Filter Bar */}
      <section className="py-8 sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glassmorphic rounded-2xl p-2 md:p-3 shadow-sm border-primary/5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search articles by condition or symptom..." 
                  className="pl-11 h-12 bg-background/50 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary/20" 
                />
              </div>
              <div className="md:col-span-4">
                <Select>
                  <SelectTrigger className="h-12 bg-background/50 border-none shadow-none focus:ring-1 focus:ring-primary/20">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.slug}>{service.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Button className="w-full h-12 font-bold shadow-lg hover:shadow-primary/20 transition-all">
                  Search Journal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {allPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No articles are published yet — check back soon for expert insights from our clinical team.
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {allPosts.map((post) => (
              <Card key={post.id} className="group border-none bg-transparent shadow-none flex flex-col">
                <CardHeader className="p-0 mb-6">
                  <Link href={`/blogs/${post.slug}`} className="block relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      data-ai-hint={post.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 dark:bg-black/80 text-foreground dark:text-white backdrop-blur-sm border-none shadow-sm font-bold text-[10px] uppercase tracking-wider px-3">
                        {post.serviceTag}
                      </Badge>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-0 flex-grow space-y-4">
                  <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <h3 className="font-headline text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm">
                    {post.summary}
                  </p>
                </CardContent>
                <CardFooter className="p-0 pt-6 mt-auto border-t border-border/5">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-bold text-foreground/80">{post.author.split(' ')[0]}</span>
                    </div>
                    <Button asChild variant="ghost" className="p-0 h-auto hover:bg-transparent text-primary font-bold text-sm group/btn">
                      <Link href={`/blogs/${post.slug}`} className="flex items-center">
                        Read Article 
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="py-20 bg-primary/5 border-y">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="font-headline text-3xl font-bold">Never Miss a Recovery Update</h2>
            <p className="text-muted-foreground">Subscribe to our newsletter for clinical tips, new recovery protocols, and exclusive home healthcare updates.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="h-12 bg-background border-primary/10" />
              <Button className="h-12 px-8 font-bold">Subscribe</Button>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">A division of Aries HealthCare International Pvt Ltd</p>
          </div>
        </div>
      </section>
    </div>
  );
}
