'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/app');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-[#0D1A2A]/80 border border-[#0088FF]/30 backdrop-blur-xl">
        <Loader2 className="w-8 h-8 text-[#0088FF] animate-spin" />
        <span className="text-xs font-mono text-slate-300">Loading AriesXpert Dashboard...</span>
      </div>
    </div>
  );
}
