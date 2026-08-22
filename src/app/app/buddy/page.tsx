'use client';

import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Stethoscope,
  ShieldCheck,
  User,
  Lightbulb,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useProviderAuth } from '@/services/provider-auth-context';

interface ChatMessage {
  id: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  'Post-TKR Day 10 range-of-motion exercise progressions',
  'Red flags checklist for acute lumbar radiculopathy & cauda equina',
  'Differential diagnosis for acute lateral knee pain in a runner',
  'Dry needling safety precautions for upper trapezius trigger points',
];

export default function ProviderAIBuddyPage() {
  const { user } = useProviderAuth();
  const therapistName = user?.fullName || user?.name || 'Doctor';
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm_01',
      sender: 'buddy',
      text: `Hello ${therapistName}! I am your Aries AI Clinical Copilot. I can assist with differential diagnoses, evidence-based exercise progressions, red flag screenings, and SOAP note synthesis. What clinical case are we managing today?`,
      timestamp: 'Just Now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/app/ai-copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          therapistName,
        }),
      });
      const data = await res.json();
      const replyText = data.reply || `Hello ${therapistName}! How can I assist with your patient cases or doorstep exercise prescriptions today?`;

      const buddyMsg: ChatMessage = {
        id: 'msg_b_' + Date.now(),
        sender: 'buddy',
        text: replyText,
        timestamp: 'Just Now',
      };

      setMessages((prev) => [...prev, buddyMsg]);
    } catch {
      const buddyMsg: ChatMessage = {
        id: 'msg_b_' + Date.now(),
        sender: 'buddy',
        text: `Hello ${therapistName}! I'm ready to assist with your clinical cases. Could you please share the diagnosis or rehabilitation protocol you would like to discuss?`,
        timestamp: 'Just Now',
      };
      setMessages((prev) => [...prev, buddyMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">Aries AI Clinical Copilot</h1>
            <p className="text-[11px] text-muted-foreground">Doorstep Diagnostic Assistant & Exercise Prescription Engine</p>
          </div>
        </div>

        <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full">
          AI Clinical Engine Online
        </span>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 bg-card border border-border/80 rounded-3xl p-4 sm:p-6 overflow-y-auto space-y-4 shadow-sm">
        {messages.map((m) => {
          const isBuddy = m.sender === 'buddy';
          return (
            <div key={m.id} className={`flex items-start gap-3 ${isBuddy ? '' : 'flex-row-reverse'}`}>
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  isBuddy ? 'bg-accent/10 text-accent' : 'bg-primary text-white'
                }`}
              >
                {isBuddy ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isBuddy
                    ? 'bg-muted/40 text-foreground border border-border/60'
                    : 'bg-primary text-white font-medium shadow-md'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div className={`text-[9px] mt-1 font-mono ${isBuddy ? 'text-muted-foreground' : 'text-white/70'}`}>
                  {m.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/20 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-accent" />
            <span>Aries Copilot analyzing clinical literature...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {SAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all truncate max-w-xs"
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2 shrink-0"
      >
        <Input
          placeholder="Ask AI Copilot regarding diagnosis, red flags, or exercise protocols..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-12 rounded-2xl text-xs bg-card"
        />
        <Button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="h-12 px-6 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
