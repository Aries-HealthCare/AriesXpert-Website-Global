'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Award, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import BookAppointmentButton from '@/components/book-appointment-button';
import { type TherapistCard as TherapistCardData } from '@/hooks/use-therapists';
import { useTherapists } from '@/hooks/use-therapists';
import { cn } from '@/lib/utils';

// ─── Single Card ──────────────────────────────────────────────────────────────

interface TherapistCardProps {
    therapist: TherapistCardData;
    compact?: boolean;
    onBook?: (therapist: TherapistCardData) => void;
    isBooking?: boolean;
}

export function TherapistCard({ therapist, compact, onBook, isBooking }: TherapistCardProps) {
    const t = therapist;
    const profileHref = `/therapist/${t.slug}`;

    return (
        <Card className={cn('group glassmorphic overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10', compact && 'flex flex-row')}>
            {/* Image */}
            <div className={cn('relative overflow-hidden bg-secondary/20 flex-shrink-0', compact ? 'w-24 h-full' : 'aspect-[4/3]')}>
                <Image
                    src={t.imageUrl}
                    alt={`${t.name} — ${t.specialization}`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Availability badge */}
                <div className={cn(
                    'absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold',
                    t.isAvailable ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'
                )}>
                    {t.isAvailable ? '✓ Available' : 'Booked'}
                </div>

                {/* Rating */}
                {!compact && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-xs font-bold">{t.rating}</span>
                        {t.reviewCount > 0 && <span className="text-white/60 text-xs">({t.reviewCount})</span>}
                    </div>
                )}

                {/* Verified badge */}
                {t.isVerified && (
                    <div className="absolute top-2 left-2">
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <CardContent className={cn('p-5 space-y-3 flex-1', compact && 'space-y-1.5 p-4')}>
                <div>
                    <h3 className="font-headline font-bold text-base group-hover:text-primary transition-colors leading-tight">
                        {t.name}
                    </h3>
                    <p className="text-xs text-primary font-semibold mt-0.5">{t.qualification}</p>
                    <p className="text-xs text-muted-foreground">{t.specialization}</p>
                </div>

                {!compact && (
                    <>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            {t.experience && (
                                <span className="flex items-center gap-1">
                                    <Award className="w-3 h-3 text-accent" />{t.experience}
                                </span>
                            )}
                            {t.city && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-primary" />{t.city}
                                </span>
                            )}
                        </div>

                        {t.areas.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {t.areas.slice(0, 3).map(area => (
                                    <Badge key={area} variant="secondary" className="text-[10px] px-2 py-0">{area}</Badge>
                                ))}
                                {t.areas.length > 3 && (
                                    <Badge variant="outline" className="text-[10px] px-2 py-0">+{t.areas.length - 3}</Badge>
                                )}
                            </div>
                        )}
                    </>
                )}

                <div className={cn('flex gap-2 pt-1', compact && 'pt-0')}>
                    {onBook ? (
                        <Button
                            size="sm"
                            className="flex-1 h-9 text-xs font-bold"
                            onClick={() => onBook(t)}
                            disabled={isBooking}
                        >
                            {isBooking ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Booking…</> : 'Book'}
                        </Button>
                    ) : (
                        <BookAppointmentButton size="sm" className="flex-1 h-9 text-xs font-bold">
                            Book
                        </BookAppointmentButton>
                    )}
                    <Button asChild variant="outline" size="sm" className="h-9 px-3 text-xs">
                        <Link href={profileHref}>
                            Profile <ChevronRight className="w-3 h-3 ml-0.5" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Grid with live fetch ──────────────────────────────────────────────────────

interface TherapistGridProps {
    city?: string;
    state?: string;
    area?: string;
    specialization?: string;
    limit?: number;
    title?: string;
    subtitle?: string;
    compact?: boolean;
    /** Fallback therapists for SSR / when no token configured */
    fallback?: TherapistCardData[];
    className?: string;
}

export function TherapistGrid({
    city, state, area, specialization, limit = 6,
    title, subtitle, compact, fallback = [], className,
}: TherapistGridProps) {
    const { therapists, isLoading, isError, source } = useTherapists({ city, state, area, specialization, limit });

    const list = therapists.length > 0 ? therapists : fallback;

    if (isLoading) {
        return (
            <div className={cn('py-10 text-center text-muted-foreground', className)}>
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
                <p className="text-sm">Loading specialists…</p>
            </div>
        );
    }

    if (list.length === 0) return null;

    return (
        <div className={className}>
            {(title || subtitle) && (
                <div className="mb-8 text-center">
                    {title && <h2 className="font-headline text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
                    {subtitle && <p className="text-muted-foreground text-sm max-w-lg mx-auto">{subtitle}</p>}
                </div>
            )}
            <div className={cn(
                'grid gap-6',
                compact
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            )}>
                {list.map(t => (
                    <TherapistCard key={t.id || t.slug} therapist={t} compact={compact} />
                ))}
            </div>
            {source === 'live' && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                    Showing {list.length} verified specialist{list.length !== 1 ? 's' : ''}
                    {city ? ` in ${city}` : ''}
                </p>
            )}
        </div>
    );
}
