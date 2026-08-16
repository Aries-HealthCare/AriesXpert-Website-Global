import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TeleHealthSessionPage() {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="glassmorphic w-full max-w-xl border-primary/20">
        <CardContent className="space-y-6 p-10 text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-primary" />
          <h1 className="font-headline text-3xl font-bold">Secure session link required</h1>
          <p className="text-muted-foreground">
            A consultation cannot be started from a URL parameter. Submit a consultation request and use only the secure joining instructions confirmed by the Aries clinical team.
          </p>
          <Button asChild>
            <Link href="/free-tele-consultation">Return to consultation requests</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
