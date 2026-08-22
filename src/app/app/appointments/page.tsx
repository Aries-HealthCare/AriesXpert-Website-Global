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
  const [dateFilter, setDateFilter] = useState<'ALL' | 'Today' | 'Tomorrow'>('ALL');
  const [reschedulingApt, setReschedulingApt] = useState<AppointmentItem | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('Tomorrow');
  const [rescheduleTime, setRescheduleTime] = useState('02:00 PM - 03:00 PM');

  const filtered = appointments.filter((a) => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (dateFilter !== 'ALL' && a.date !== dateFilter) return false;
    return true;
  });

  const handleSaveReschedule = () => {
    if (!reschedulingApt) return;
    setAppointments(
      appointments.map((a) =>
        a.id === reschedulingApt.id ? { ...a, date: rescheduleDate, timeSlot: rescheduleTime } : a
      )
    );
    alert(`Appointment for ${reschedulingApt.patientName} rescheduled to ${rescheduleDate} at ${rescheduleTime}. Notification sent.`);
    setReschedulingApt(null);
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm('Are you sure you want to cancel this scheduled appointment?')) {
      setAppointments(
        appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a))
      );
    }
  };

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

      {/* Filter Tabs & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {(['ALL', 'Scheduled', 'Completed'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                statusFilter === tab
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'ALL' ? `All Appointments (${appointments.length})` : tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'Today', 'Tomorrow'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDateFilter(d)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                dateFilter === d ? 'bg-muted text-foreground border border-border' : 'text-muted-foreground'
              }`}
            >
              {d === 'ALL' ? 'All Dates' : d}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filtered.map((apt) => {
          const isCompleted = apt.status === 'Completed';
          const isScheduled = apt.status === 'Scheduled';
          const isCancelled = apt.status === 'Cancelled';
          return (
            <div
              key={apt.id}
              className={`bg-card border rounded-3xl p-5 sm:p-6 shadow-sm transition-all ${
                isScheduled
                  ? 'border-primary/40 bg-gradient-to-r from-card to-primary/5'
                  : isCancelled
                  ? 'border-border/40 opacity-60'
                  : 'border-border/80'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCompleted
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : isCancelled
                          ? 'bg-destructive/10 text-destructive'
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
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setReschedulingApt(apt)}
                        className="h-10 px-3 rounded-xl text-xs font-bold"
                      >
                        Reschedule
                      </Button>
                      <Link href="/app/visits" prefetch={false}>
                        <Button className="h-10 px-5 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5">
                          <Play className="w-4 h-4 fill-white" />
                          <span>Launch Visit</span>
                        </Button>
                      </Link>
                    </div>
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

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setReschedulingApt(null)}
        >
          <div
            className="bg-card border border-border rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="text-base font-outfit font-extrabold text-foreground">Reschedule Appointment</h3>
              <button onClick={() => setReschedulingApt(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            <p className="text-xs text-muted-foreground">
              Patient: <strong className="text-foreground">{reschedulingApt.patientName}</strong>
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-foreground block mb-1">Select New Date</label>
                <select
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-input rounded-xl text-xs font-bold"
                >
                  <option value="Today">Today</option>
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="In 2 Days">In 2 Days</option>
                  <option value="Next Monday">Next Monday</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-foreground block mb-1">Select Time Slot</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-input rounded-xl text-xs font-bold"
                >
                  <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                  <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                  <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  <option value="04:30 PM - 05:30 PM">04:30 PM - 05:30 PM</option>
                  <option value="06:00 PM - 07:00 PM">06:00 PM - 07:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  handleCancelAppointment(reschedulingApt.id);
                  setReschedulingApt(null);
                }}
                className="flex-1 h-11 rounded-2xl text-destructive border-destructive/30 text-xs font-bold"
              >
                Cancel Slot
              </Button>
              <Button
                onClick={handleSaveReschedule}
                className="flex-1 h-11 rounded-2xl bg-primary text-white text-xs font-bold shadow-md"
              >
                Save Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
