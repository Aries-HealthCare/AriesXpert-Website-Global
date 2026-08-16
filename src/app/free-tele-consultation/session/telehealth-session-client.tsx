'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';
import { ShieldAlert, Mic, MicOff, Video, VideoOff, PhoneOff, Loader2, PhoneMissed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// The Agora App ID is not secret (it identifies the project, not a
// credential) but it still must come from the environment — never
// hardcode a real project's App ID in source.
const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || '';

type CallState = 'missing-link' | 'connecting' | 'permission-denied' | 'in-call' | 'ended' | 'error';

function InfoScreen({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <Card className="glassmorphic w-full max-w-xl border-primary/20">
        <CardContent className="space-y-6 p-10 text-center">
          {icon}
          <h1 className="font-headline text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          {action}
        </CardContent>
      </Card>
    </main>
  );
}

export default function TelehealthSessionClient() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  const token = searchParams.get('token');
  const therapistName = searchParams.get('therapist');

  const [callState, setCallState] = useState<CallState>('connecting');
  const [errorMessage, setErrorMessage] = useState('');
  const [remoteUser, setRemoteUser] = useState<IAgoraRTCRemoteUser | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
  const localVideoElRef = useRef<HTMLDivElement | null>(null);
  const remoteVideoElRef = useRef<HTMLDivElement | null>(null);

  const cleanup = useCallback(async () => {
    try {
      localAudioTrackRef.current?.close();
      localVideoTrackRef.current?.close();
    } catch {
      // no-op — tracks may already be closed
    }
    try {
      await clientRef.current?.leave();
    } catch {
      // no-op — client may already be disconnected
    }
    clientRef.current = null;
    localAudioTrackRef.current = null;
    localVideoTrackRef.current = null;
  }, []);

  useEffect(() => {
    if (!roomId || !token) {
      setCallState('missing-link');
      return;
    }

    if (!AGORA_APP_ID) {
      setCallState('error');
      setErrorMessage('Video calling is not configured on this server yet. Please contact support.');
      return;
    }

    let cancelled = false;

    async function join() {
      try {
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default;
        const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        clientRef.current = client;

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === 'video') {
            setRemoteUser(user);
            setTimeout(() => {
              if (remoteVideoElRef.current) {
                user.videoTrack?.play(remoteVideoElRef.current);
              }
            }, 0);
          }
          if (mediaType === 'audio') {
            user.audioTrack?.play();
          }
        });

        client.on('user-unpublished', (user, mediaType) => {
          if (mediaType === 'video') {
            setRemoteUser((current) => (current?.uid === user.uid ? null : current));
          }
        });

        client.on('user-left', (user) => {
          setRemoteUser((current) => (current?.uid === user.uid ? null : current));
        });

        // uid 2 matches the patient uid the backend issues the RTC token
        // for (see appointment.controller.ts startTelehealth — uid 1 is
        await client.join(AGORA_APP_ID, roomId as string, token as string, 2);

        const [audioTrack, videoTrack] = await Promise.all([
          AgoraRTC.createMicrophoneAudioTrack(),
          AgoraRTC.createCameraVideoTrack(),
        ]);

        if (cancelled) {
          audioTrack.close();
          videoTrack.close();
          await client.leave();
          return;
        }

        localAudioTrackRef.current = audioTrack;
        localVideoTrackRef.current = videoTrack;

        if (localVideoElRef.current) {
          videoTrack.play(localVideoElRef.current);
        }

        await client.publish([audioTrack, videoTrack]);

        if (!cancelled) {
          setCallState('in-call');
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        const isPermissionError = /permission|notallowed|devicesnotfound/i.test(message);
        if (isPermissionError) {
          setCallState('permission-denied');
        } else {
          setCallState('error');
          setErrorMessage('This consultation link could not connect — it may have expired or already ended.');
        }
      }
    }

    join();

    return () => {
      cancelled = true;
      cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token]);

  // Call timer
  useEffect(() => {
    if (callState !== 'in-call') return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const toggleMic = async () => {
    const next = !isMicMuted;
    await localAudioTrackRef.current?.setEnabled(!next);
    setIsMicMuted(next);
  };

  const toggleCamera = async () => {
    const next = !isCameraOff;
    await localVideoTrackRef.current?.setEnabled(!next);
    setIsCameraOff(next);
  };

  const hangUp = async () => {
    // The website joins as the patient and has no authenticated session, so
    // it cannot call the therapist-only /end-telehealth backend endpoint —
    // that call is made from the therapist's app when they close out the
    // clinical record. Here we honestly just leave the Agora channel.
    await cleanup();
    setCallState('ended');
  };

  if (callState === 'missing-link') {
    return (
      <InfoScreen
        icon={<ShieldAlert className="mx-auto h-12 w-12 text-primary" />}
        title="Secure session link required"
        description="This page opens a video consultation from the secure link sent to you by WhatsApp or email once your therapist starts the session. Please use that link, or submit a new consultation request."
        action={
          <Button asChild>
            <Link href="/free-tele-consultation">Return to consultation requests</Link>
          </Button>
        }
      />
    );
  }

  if (callState === 'permission-denied') {
    return (
      <InfoScreen
        icon={<VideoOff className="mx-auto h-12 w-12 text-destructive" />}
        title="Camera and microphone access needed"
        description="Please allow camera and microphone permissions in your browser to join the video consultation, then reload this page."
        action={
          <Button onClick={() => window.location.reload()}>Try again</Button>
        }
      />
    );
  }

  if (callState === 'error') {
    return (
      <InfoScreen
        icon={<PhoneMissed className="mx-auto h-12 w-12 text-destructive" />}
        title="Unable to connect"
        description={errorMessage || 'Something went wrong connecting to your consultation.'}
        action={
          <Button asChild>
            <Link href="/free-tele-consultation">Return to consultation requests</Link>
          </Button>
        }
      />
    );
  }

  if (callState === 'ended') {
    return (
      <InfoScreen
        icon={<PhoneOff className="mx-auto h-12 w-12 text-primary" />}
        title="Call ended"
        description="You have left the video consultation. Your therapist will follow up with any notes or next steps."
        action={
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
        }
      />
    );
  }

  // 'connecting' or 'in-call'
  return (
    <main className="relative min-h-screen bg-[#020617]">
      {/* Remote video — full screen */}
      <div ref={remoteVideoElRef} className="absolute inset-0 h-full w-full bg-[#080C14]" />

      {!remoteUser && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {callState === 'connecting' ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-cyan-400 mb-4" />
              <p className="text-white/70 text-sm font-semibold">Connecting to your secure session…</p>
            </>
          ) : (
            <>
              <div className="h-24 w-24 rounded-full border border-cyan-400/30 flex items-center justify-center mb-6">
                <Video className="h-10 w-10 text-cyan-300" />
              </div>
              <p className="text-white text-lg font-bold">
                {therapistName ? decodeURIComponent(therapistName) : 'Your therapist'}
              </p>
              <p className="text-cyan-300 text-sm mt-2">Waiting for your therapist to join…</p>
            </>
          )}
        </div>
      )}

      {/* Local self-view PiP */}
      <div className="absolute top-6 right-6 w-28 h-36 md:w-36 md:h-48 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-[#0F172A]">
        {isCameraOff ? (
          <div className="flex h-full items-center justify-center">
            <VideoOff className="h-6 w-6 text-white/40" />
          </div>
        ) : (
          <div ref={localVideoElRef} className="h-full w-full" />
        )}
      </div>

      {/* Header */}
      <div className="absolute top-6 left-6">
        <Badge className="bg-black/50 text-white border-white/10 backdrop-blur-sm font-mono text-xs">
          {callState === 'in-call' ? formatTimer(elapsedSeconds) : '--:--'}
        </Badge>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full bg-[#0F172A]/85 border border-white/10 px-6 py-4 shadow-xl">
        <button
          onClick={toggleMic}
          className={`h-12 w-12 rounded-full flex items-center justify-center border ${isMicMuted ? 'bg-red-500/25 border-red-400/50 text-red-400' : 'bg-white/5 border-white/10 text-white'}`}
          aria-label={isMicMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
        <button
          onClick={toggleCamera}
          className={`h-12 w-12 rounded-full flex items-center justify-center border ${isCameraOff ? 'bg-red-500/25 border-red-400/50 text-red-400' : 'bg-white/5 border-white/10 text-white'}`}
          aria-label={isCameraOff ? 'Turn camera on' : 'Turn camera off'}
        >
          {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
        </button>
        <button
          onClick={hangUp}
          className="h-12 w-12 rounded-full flex items-center justify-center bg-red-500 text-white shadow-lg shadow-red-500/30"
          aria-label="Leave call"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </main>
  );
}
