'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error('About page client error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-purple-100 dark:border-purple-900/50 shadow-xl space-y-5">
        <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center mx-auto shadow-xs">
          <RefreshCw className="w-6 h-6 animate-spin-slow" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold font-headline text-foreground">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground">
            We encountered a temporary loading issue. Please refresh or return to home.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={() => {
              // Attempt to recover by resetting or reloading
              try {
                reset();
              } catch {
                window.location.reload();
              }
            }}
            className="rounded-full bg-purple-700 hover:bg-purple-800 text-white font-semibold"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            variant="outline"
            asChild
            className="rounded-full border-purple-200 dark:border-purple-800"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
