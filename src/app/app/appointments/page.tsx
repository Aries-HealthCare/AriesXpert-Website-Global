'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  AlertCircle,
  Play,
  Calendar as CalendarIcon,
  Navigation,
  FileText,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentItem {
  id: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  phone: string;
  condition: string;
  serviceType: 'Home Visit' | 'Clinic Visit';
  date: string;
  timeSlot: string;
  address: string;
  pincode: string;
  status: 'Scheduled' | 'InProgress' | 'Completed' | 'Cancelled';
  sessionNumber: number;
  totalSessions: number;
  fee: number;
}

const INITIAL_APPOINTMENTS: AppointmentItem[] = [
  {
    id: 'apt_101',
    patientName: 'Mrs. Meenakshi Rao',
    patientAge: 68,
    patientGender: 'Female',
    phone: '+91 98201 44219',
    condition: 'Post-TKR Knee Joint Mobilization (Left Knee)',
    serviceType: 'Home Visit',
    date: 'Today',
    timeSlot: '09:30 AM - 10:20 AM',
    address: 'Flat 402, Sea Green Heights, IC Colony, Borivali West',
    pincode: '400103',
    status: 'Completed',
    sessionNumber: 3,
    totalSessions: 10,
    fee: 1200,
  },
  {
    id: 'apt_102',
    patientName: 'Mr. Anil Kapoor',
    patientAge: 54,
    patientGender: 'Male',
    phone: '+91 98190 88214',
    condition: 'Stroke Hemiplegia Lower Limb Neuro Gait Training',
    serviceType: 'Home Visit',
    date: 'Today',
    timeSlot: '11:30 AM - 12:25 PM',
    address: 'B-12, Lokhandwala Complex, Kandivali East',
    pincode: '400101',
    status: 'Completed',
    sessionNumber: 6,
    totalSessions: 15,
    fee: 1500,
  },
  {
    id: 'apt_103',
    patientName: 'Dr. Arvind Kulkarni',
    patientAge: 71,
    patientGender: 'Male',
    phone: '+91 98204 11982',
    condition: 'Lumbar Canal Stenosis & Balance Therapy',
    serviceType: 'Home Visit',
    date: 'Today',
    timeSlot: '05:00 PM - 06:00 PM',
    address: 'Bungalow 7, Evershine Nagar, Malad West',
    pincode: '400064',
    status: 'Scheduled',
    sessionNumber: 4,
    totalSessions: 10,
    fee: 1200,
  },
  {
    id: 'apt_104',
    patientName: 'Ms. Sneha Varma',
    patientAge: 32,
    patientGender: 'Female',
    phone: '+91 97690 12345',
    condition: 'Cervical Radiculopathy & Ergonomic Postural Rehab',
    serviceType: 'Home Visit',
    date: 'Tomorrow',
    timeSlot: '10:00 AM - 11:00 AM',
    address: '702, Raheja Palms, Goregaon East',
    pincode: '400063',
    status: 'Scheduled',
    sessionNumber: 1,
    totalSessions: 5,
    fee: 1200,
  },
];

export default function ProviderAppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>(INITIAL_APPOINTMENTS);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Scheduled' | 'InProgress' | 'Completed'>('ALL');

  const filtered = appointments.filter((a) => {
    if (statusFilter === 'ALL') return true;
    return a.status === statusFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Appointments & Treatment Schedule</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your daily patient slots, package tracking, and clinical visits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/app/visits" prefetch={false}>
            <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              <span>Doorstep Visit Engine</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3">
        {(['ALL', 'Scheduled', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setStatusFilter(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              statusFilter === tab
                ? 'bg-primary text-white shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'ALL' ? `All Appointments (${appointments.length})` : tab}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filtered.map((apt) => {
          const isCompleted = apt.status === 'Completed';
          const isScheduled = apt.status === 'Scheduled';
          return (
            <div
              key={apt.id}
              className={`bg-card border rounded-3xl p-5 sm:p-6 shadow-sm transition-all ${
                isScheduled ? 'border-primary/40 bg-gradient-to-r from-card to-primary/5' : 'border-border/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-primary text-white'
                      }`}
                    >
                      {apt.status}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-muted-foreground">
                      Session {apt.sessionNumber} of {apt.totalSessions}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                      {apt.serviceType}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground">
                    {apt.patientName} <span className="text-xs text-muted-foreground font-normal">({apt.patientAge}y, {apt.patientGender})</span>
                  </h3>

                  <p className="text-xs font-bold text-primary">
                    {apt.condition}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span><strong>{apt.date}</strong> at {apt.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{apt.address} ({apt.pincode})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-foreground" />
                      <span className="font-mono">{apt.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Right CTA */}
                <div className="flex items-center gap-2 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
                  {isScheduled && (
                    <Link href="/app/visits" prefetch={false}>
                      <Button className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5">
                        <Play className="w-4 h-4 fill-white" />
                        <span>Launch Visit</span>
                      </Button>
                    </Link>
                  )}
                  {isCompleted && (
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-500">✓ Session Recorded</div>
                      <div className="text-[11px] text-muted-foreground font-mono">₹{apt.fee * 0.6} Payout Credited</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
