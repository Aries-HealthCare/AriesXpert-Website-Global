'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Download,
  FileText,
  Award,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderTrainingPage() {
  const [activeTab, setActiveTab] = useState<'MODULES' | 'SOP'>('MODULES');

  const modules = [
    {
      id: 'mod_01',
      title: 'Aries Clinical SOP: Doorstep Safety & Infection Control Protocol',
      duration: '25 mins',
      status: 'Completed',
      category: 'Mandatory SOP',
      lessons: 4,
    },
    {
      id: 'mod_02',
      title: 'Post-Total Knee Arthroplasty (TKA) Fast-Track Rehabilitation Pathways',
      duration: '40 mins',
      status: 'Completed',
      category: 'Orthopedic',
      lessons: 6,
    },
    {
      id: 'mod_03',
      title: 'Clinical Red Flags: Recognizing Acute Cauda Equina & Stroke Emergencies at Home',
      duration: '35 mins',
      status: 'Completed',
      category: 'Emergency Triage',
      lessons: 5,
    },
    {
      id: 'mod_04',
      title: 'Modern Shoulder Rotator Cuff Tendinopathy & Scapular Dyskinesis Management',
      duration: '50 mins',
      status: 'In Progress',
      category: 'Sports & Musculoskeletal',
      lessons: 8,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Aries Clinical Academy & SOPs</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Evidence-based continuing education, hospital-grade clinical protocols, and SOP certifications.
          </p>
        </div>
      </div>

      {/* Module Grid */}
      <div className="space-y-4">
        {modules.map((mod) => {
          const isDone = mod.status === 'Completed';
          return (
            <div
              key={mod.id}
              className="bg-card border border-border/80 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/40 transition-all"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground uppercase">
                    {mod.category}
                  </span>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> {mod.duration} • {mod.lessons} Lessons
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-extrabold text-foreground">{mod.title}</h3>

                <div className="text-xs">
                  {isDone ? (
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Certified ✓
                    </span>
                  ) : (
                    <span className="text-primary font-bold">In Progress (50% Completed)</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant={isDone ? 'outline' : 'default'}
                  className="h-10 px-4 rounded-xl text-xs font-bold"
                >
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  <span>{isDone ? 'Review SOP' : 'Resume Module'}</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
