'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Search, X, ArrowRight, ChevronRight, Compass } from 'lucide-react';
import { CityHubDetail } from '@/lib/clinics-hubs-data';
import { Button } from '@/components/ui/button';

interface CityAreasDirectoryProps {
  hubDetail: CityHubDetail;
}

export default function CityAreasDirectory({ hubDetail }: CityAreasDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return hubDetail.areas;

    return hubDetail.areas
      .map((area) => {
        const areaMatches = area.name.toLowerCase().includes(q);
        const matchedSubAreas = area.subAreas.filter((sa) =>
          sa.name.toLowerCase().includes(q)
        );
        if (areaMatches) return area;
        if (matchedSubAreas.length > 0) {
          return {
            ...area,
            subAreas: matchedSubAreas,
          };
        }
        return null;
      })
      .filter(Boolean) as typeof hubDetail.areas;
  }, [hubDetail.areas, searchQuery]);

  const filteredSubAreasCount = useMemo(() => {
    return filteredAreas.reduce((acc, a) => acc + a.subAreas.length, 0);
  }, [filteredAreas]);

  return (
    <div className="space-y-6">
      {/* Search & Counter Bar */}
      <div className="bg-card border border-border/60 rounded-2xl p-4 md:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Filter areas or sub-areas in ${hubDetail.city}...`}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-secondary/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-semibold text-muted-foreground self-start sm:self-auto">
            Showing <span className="text-primary font-bold">{filteredAreas.length}</span> Primary Zones &amp;{' '}
            <span className="text-primary font-bold">{filteredSubAreasCount}</span> Sub-Areas
          </div>
        </div>
      </div>

      {/* Grid of Areas & Sub-Areas */}
      {filteredAreas.length === 0 ? (
        <div className="text-center py-16 px-4 bg-card border border-border/60 rounded-2xl space-y-3">
          <MapPin className="w-10 h-10 text-primary/60 mx-auto" />
          <h4 className="text-base font-bold text-foreground">
            No neighborhoods matching &quot;{searchQuery}&quot;
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Try searching another area name, or reset the filter to view all coverage in {hubDetail.city}.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSearchQuery('')}
            className="rounded-full text-xs font-bold"
          >
            Clear Filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAreas.map((area) => (
            <div
              key={area.slug}
              className="rounded-2xl border border-border/60 bg-card p-5 flex flex-col justify-between hover:border-primary/50 shadow-2xs hover:shadow-md transition-all duration-200 group/card"
            >
              <div className="space-y-3">
                {/* Area Header Link */}
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={area.landingUrl}
                    className="font-headline text-base font-bold text-foreground group-hover/card:text-primary transition-colors flex items-center gap-1.5"
                    title={`Open ${area.name} Landing Page`}
                  >
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="underline-offset-2 group-hover/card:underline">{area.name}</span>
                  </Link>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border shrink-0">
                    {area.subAreas.length > 0 ? `${area.subAreas.length} Sub-Areas` : 'Primary Zone'}
                  </span>
                </div>

                {/* Sub-Areas Pill Cloud */}
                {area.subAreas.length > 0 ? (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                      Sub-Areas &amp; Localities:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {area.subAreas.map((sa) => (
                        <Link
                          key={sa.slug}
                          href={sa.landingUrl}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary/60 text-secondary-foreground border border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-150 hover:scale-[1.02] shadow-2xs group/sub"
                          title={`Open ${sa.name} Landing Page`}
                        >
                          <span>{sa.name}</span>
                          <ArrowRight className="w-3 h-3 opacity-40 group-hover/sub:opacity-100 group-hover/sub:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground italic pt-1">
                    Full home physiotherapy coverage across all residential sectors of {area.name}.
                  </p>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between">
                <Link
                  href={area.landingUrl}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 transition-colors"
                >
                  Visit {area.name} Page
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Same-Day Dispatch
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
