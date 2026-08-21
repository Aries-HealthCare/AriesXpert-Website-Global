'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Activity,
  ChevronRight,
  Plus,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  diagnosis: string;
  activePackage: string;
  completedSessions: number;
  totalSessions: number;
  lastVisit: string;
  city: string;
  pincode: string;
  recoveryStatus: 'Excellent Progress' | 'Stable' | 'Initial Stage';
}

const PATIENTS: PatientRecord[] = [
  {
    id: 'pat_01',
    name: 'Mrs. Meenakshi Rao',
    age: 68,
    gender: 'Female',
    phone: '+91 98201 44219',
    diagnosis: 'Post-TKR Left Knee Joint Replacement Rehab',
    activePackage: '10-Session Post-Surgical Package',
    completedSessions: 3,
    totalSessions: 10,
    lastVisit: 'Today',
    city: 'Borivali West, Mumbai',
    pincode: '400103',
    recoveryStatus: 'Excellent Progress',
  },
  {
    id: 'pat_02',
    name: 'Mr. Anil Kapoor',
    age: 54,
    gender: 'Male',
    phone: '+91 98190 88214',
    diagnosis: 'Right Hemiplegic Stroke Gait & Balance Protocol',
    activePackage: '15-Session Neuro Recovery Package',
    completedSessions: 6,
    totalSessions: 15,
    lastVisit: 'Today',
    city: 'Kandivali East, Mumbai',
    pincode: '400101',
    recoveryStatus: 'Stable',
  },
  {
    id: 'pat_03',
    name: 'Dr. Arvind Kulkarni',
    age: 71,
    gender: 'Male',
    phone: '+91 98204 11982',
    diagnosis: 'Lumbar Canal Stenosis & Sciatica Relief',
    activePackage: '10-Session Spine Rehab Package',
    completedSessions: 4,
    totalSessions: 10,
    lastVisit: '2 days ago',
    city: 'Malad West, Mumbai',
    pincode: '400064',
    recoveryStatus: 'Stable',
  },
  {
    id: 'pat_04',
    name: 'Ms. Sneha Varma',
    age: 32,
    gender: 'Female',
    phone: '+91 97690 12345',
    diagnosis: 'Cervical Radiculopathy & Tech Neck Syndrome',
    activePackage: '5-Session Postural Care Package',
    completedSessions: 1,
    totalSessions: 5,
    lastVisit: 'Yesterday',
    city: 'Goregaon East, Mumbai',
    pincode: '400063',
    recoveryStatus: 'Initial Stage',
  },
  {
    id: 'pat_05',
    name: 'Mr. Vikram Singhania',
    age: 48,
    gender: 'Male',
    phone: '+91 98200 77112',
    diagnosis: 'Rotator Cuff Supraspinatus Tendinitis Rehab',
    activePackage: '10-Session Sports Rehab Package',
    completedSessions: 10,
    totalSessions: 10,
    lastVisit: '3 days ago',
    city: 'Andheri West, Mumbai',
    pincode: '400053',
    recoveryStatus: 'Excellent Progress',
  },
];

export default function ProviderPatientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  const filtered = PATIENTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Patient Directory & Care Plans</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Access past treatment records, package session counters, and clinical notes.
          </p>
        </div>

        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search patient name or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((pat) => (
          <div
            key={pat.id}
            className="bg-card border border-border/80 rounded-3xl p-5 shadow-sm space-y-4 hover:border-primary/40 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-foreground">{pat.name}</h3>
                  <span className="text-xs text-muted-foreground font-mono">({pat.age}y, {pat.gender})</span>
                </div>
                <p className="text-xs font-bold text-primary mt-0.5">{pat.diagnosis}</p>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  pat.recoveryStatus === 'Excellent Progress'
                    ? 'bg-emerald-500/10 text-emerald-500'
                    : 'bg-primary/10 text-primary'
                }`}
              >
                {pat.recoveryStatus}
              </span>
            </div>

            {/* Session Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground font-medium">{pat.activePackage}</span>
                <span className="font-mono font-bold text-foreground">
                  {pat.completedSessions} / {pat.totalSessions} Sessions
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(pat.completedSessions / pat.totalSessions) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/60">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>{pat.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Last visit: {pat.lastVisit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`tel:${pat.phone}`}
                className="flex-1 py-2 px-3 rounded-xl bg-muted hover:bg-muted/80 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Call Patient</span>
              </a>
              <Button
                variant="outline"
                onClick={() => setSelectedPatient(pat)}
                className="flex-1 h-9 rounded-xl text-xs font-bold"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" />
                <span>View SOAP Notes</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border/80 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div>
                <h3 className="text-base font-extrabold text-foreground">{selectedPatient.name}</h3>
                <p className="text-xs text-primary font-bold">{selectedPatient.diagnosis}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPatient(null)}
                className="text-muted-foreground hover:text-foreground font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-muted/40 rounded-xl space-y-1">
                <div className="font-bold text-foreground">Latest Clinical Assessment (SOAP)</div>
                <p className="text-muted-foreground leading-relaxed">
                  Patient shows 70% functional mobility restoration. Quadriceps strength upgraded to Grade 4/5. Recommended progressive resistance bands for next 4 sessions.
                </p>
              </div>

              <div className="flex justify-between p-3 bg-muted/20 rounded-xl font-mono">
                <span>Total Sessions Done:</span>
                <strong className="text-foreground">{selectedPatient.completedSessions} of {selectedPatient.totalSessions}</strong>
              </div>
            </div>

            <Button
              onClick={() => setSelectedPatient(null)}
              className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs"
            >
              Close Record
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
