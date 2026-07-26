
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/firebase';
import { initiateAnonymousSignIn, initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      initiateEmailSignIn(auth, email, password);
      // Auth state listener in Provider handles redirection or updates
      router.push('/portal');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    initiateAnonymousSignIn(auth);
    router.push('/portal');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md glassmorphic">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
            <HeartPulse className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Login to your Aries PhysioCare patient portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
            </Button>
          </form>
        </CardContent>
        <div className="relative px-6 py-2">
          <div className="absolute inset-0 flex items-center px-6">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue as guest</span>
          </div>
        </div>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="outline" className="w-full neon-accent-border" onClick={handleGuestLogin} disabled={isLoading}>
            <Sparkles className="mr-2 h-4 w-4" /> Explore Portal as Guest
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            Don't have an account? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to get started.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
