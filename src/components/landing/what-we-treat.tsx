'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Microscope, Crosshair, Activity, Stethoscope, HeartPulse } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const treatmentAreas = [
  {
    title: "Conditions & Pathologies",
    badge: "Clinical Pathologies",
    icon: Stethoscope,
    basePath: "/services/physiotherapy/conditions",
    items: [
      { name: "Lumbar Spondylosis" }, { name: "Ankle Dislocation" }, { name: "Tarsal Tunnel Syndrome" }, { name: "Ankle Instability" }, { name: "Posterior Tibial Tendon Dysfunction (Pttd)" }, { name: "Metatarsalgia" }, { name: "Herniated Disk Or Slipped Disc" }, { name: "Clubfoot Or Congenital Talipes Equinovarus Or Ctev" }, { name: "Ankle Bone Spur" }, { name: "Total Hip Replacement (thr)" }, { name: "Swan Neck Deformity" }, { name: "Erb’s Palsy" }, { name: "Sprengel's Shoulder" }, { name: "Meralgia Paresthetica" }, { name: "Tendinitis" }, { name: "Sciatica" }, { name: "Guillain-barré Syndrome" }, { name: "Fecal Incontinence" }, { name: "Radial Nerve Injury" }, { name: "Sacralization" }, { name: "Shoulder Impingement" }, { name: "Disc Bulge" }, { name: "Dyslexia" }, { name: "Genu Valgus" }, { name: "Genu Varum" }, { name: "Cauda Equina Syndrome" }, { name: "Wartenberg’s Syndrome" }, { name: "Shoulder Arthropathy" }, { name: "Cuboid Syndrome" }, { name: "Median Nerve Injury" }, { name: "Hemangioma" }, { name: "Raynaud’s Disease" }, { name: "Urinary Incontinence" }, { name: "Pelvic Organ Prolapse" }, { name: "Motor Neuron Disease (mnd)" }, { name: "Complex Regional Pain Syndrome (crps)" }, { name: "Cervicogenic Headache" }, { name: "Infantile Hemiparesis" }, { name: "Galeazzi Fracture" }, { name: "Lymphedema" }, { name: "Wrist Drop" }, { name: "Trigger Finger" }, { name: "Retrolisthesis" }, { name: "Klumpke's Palsy" }, { name: "Supraspinatus Tendinitis" }, { name: "Lumbarization" }, { name: "Foot Drop" }, { name: "Smith Fracture" }, { name: "Gastrocnemius Rupture" }, { name: "Osgood-schlatter Disease" }, { name: "Hill-sachs Lesion" }, { name: "Hemiplegia" }, { name: "Myositis Ossification (mo)" }, { name: "Huntington's Disease (hd)" }, { name: "Systemic Lupus Erythematosus (sle)" }, { name: "Reiter's Syndrome" }, { name: "Peripheral Artery Disease (pad)" }, { name: "Lipedema" }, { name: "Cervical Spondylosis" }, { name: "Frozen Shoulder" }, { name: "Vertigo" }, { name: "Achilles Tendon Rupture" }, { name: "Carpal Tunnel Syndrome (cts)" }, { name: "Arthritis" }, { name: "Chondromalacia Patella" }, { name: "Knee Bursitis" }, { name: "Anterior Cruciate Ligament Tear(acl)" }, { name: "Ankle Sprain" }, { name: "Cerebral Palsy" }, { name: "Parkinson's Disease" }, { name: "Tennis Elbow" }, { name: "Baastrup Syndrome" }, { name: "Osteoarthritis" }, { name: "Cervical Myelopathy" }, { name: "Osteoporosis" }, { name: "Whiplash" }, { name: "Rotator Cuff Injury" }, { name: "Scoliosis" }, { name: "Bell's Palsy Or Facial Palsy" }, { name: "Dementia" }, { name: "Plantar Fasciitis" }, { name: "Concussion" }, { name: "Spinal Stenosis" }, { name: "Rheumatoid Arthritis" }, { name: "Tailbone Pain/coccydynia" }, { name: "Piriformis Syndrome" }, { name: "Myasthenia Gravis (mg)" }, { name: "Diabetic Neuropathy" }, { name: "Degenerative Disc Disease" }, { name: "Distal Muscular Dystrophy" }, { name: "Asthma" }, { name: "Temporomandibular Joint (tmj)" }, { name: "Stroke Or Cerebrovascular Accident (cva)" }, { name: "Hamstring Strain" }, { name: "Fibromyalgia Syndrome" }, { name: "Total Knee Replacement(tkr)" }, { name: "Meniscal Injury" }, { name: "Spina Bifida" }, { name: "Down Syndrome" }, { name: "Torticollis" }, { name: "Shoulder Dislocation" }, { name: "Shoulder And Arm Fractures" }, { name: "Elbow Fractures" }, { name: "Forearm Fractures" }, { name: "Wrist Fracture" }, { name: "Hand Fractures" }, { name: "Mallet Finger" }, { name: "Boutonniere Deformity" }, { name: "Ganglion Cyst" }, { name: "Burns" }, { name: "De Quervain's Tenosynovitis" }, { name: "Cubital Tunnel Syndrome" }, { name: "Biceps Tendonitis" }, { name: "Radial Tunnel Syndrome" }, { name: "Hip Fracture" }, { name: "Trochanteric Bursitis" }, { name: "Hip Labral Tear" }, { name: "Hip Impingement" }, { name: "Hip Osteoarthritis" }, { name: "Patellar Fracture" }, { name: "Patella Dislocation" }, { name: "Medial Collateral Ligament (mcl) Injury" }, { name: "Lateral Collateral Ligament(lcl) Injury" }, { name: "Posterior Cruciate Ligament(pcl) Injury" }, { name: "Popliteal (baker's) Cyst" }, { name: "Varicose Veins" }, { name: "White Matter Disease" }, { name: "Patellar Tendonitis" }, { name: "Deep Venous Thrombosis" }, { name: "Knee Fracture" }, { name: "Flat Foot" }, { name: "Ankle Fracture" }, { name: "Ankle Syndesmosis Ligament Injury" }, { name: "Bunion Or Hallux Valgus" }, { name: "Hammer Toe" }, { name: "Knee Osteoarthritis" }, { name: "Golfer's Elbow" }, { name: "Spondylolisthesis" }, { name: "Ankylosing Spondylitis (as)" }, { name: "Discectomy" }, { name: "Laminectomy" }, { name: "Autism" }, { name: "Spinal Fusion" }, { name: "Spinal Cord Injury" }, { name: "Leprosy" }, { name: "Migraine" }, { name: "Multiple Sclerosis" }, { name: "Quadriplegia" }, { name: "Ulnar Nerve Injury" }, { name: "Transverse Myelitis (tm)" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Clinical Symptoms",
    badge: "Symptom Diagnosis",
    icon: Activity,
    basePath: "/services/physiotherapy/symptoms",
    items: [
      { name: "Muscle Stiffness" }, { name: "Muscle Spasm" }, { name: "Crepitus - Cracking Joints" }, { name: "Numbness And Tingling" }, { name: "Neck Pain" }, { name: "Foot Pain" }, { name: "Tremors" }, { name: "Back Pain" }, { name: "Myalgia (muscle Pain)" }, { name: "Knee Pain" }, { name: "Joint Pain" }, { name: "Shoulder Pain" }, { name: "Loss Of Balance" }, { name: "Inflammation" }, { name: "Headache" }, { name: "Shortness Of Breath" }, { name: "Sprains And Strains" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Therapies & Modalities",
    badge: "Electro & Manual Gear",
    icon: HeartPulse,
    basePath: "/services/physiotherapy/therapies-offered",
    items: [
      { name: "Interferential Therapy (ift)" }, { name: "Chiropractic Therapy" }, { name: "Ultrasound Therapy" }, { name: "Laser Therapy" }, { name: "Cupping Therapy" }, { name: "Wax Therapy" }, { name: "Kinesio Taping / Taping Therapy" }, { name: "Dry Needling Therapy" }, { name: "Thermotherapy(heat Therapy)" }, { name: "Transcutaneous Electrical Nerve Stimulation(tens) Therapy" }, { name: "Lymphatic Drainage Massage" }, { name: "Overhead Track Harness Therapy" }, { name: "Traction Therapy" }, { name: "Spinal Decompression / Traction Therapy" }, { name: "Tecar / Cret Therapy" }, { name: "Cryotherapy(cold Therapy)" }, { name: "Dynamic Compression Therapy" }, { name: "Shockwave Therapy" }, { name: "Robotic Spinal Decompression Therapy" }, { name: "Manual Therapy" }, { name: "Myofascial Release (mfr)" }, { name: "Soft Tissue Mobilization" }, { name: "Pelvic Floor Physical Therapy" }, { name: "Chest Physiotherapy" }, { name: "Shortwave Diathermy (swd)" },
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Clinical Services",
    badge: "Full Care Portfolio",
    icon: Microscope,
    basePath: "/services/physiotherapy/services-offered",
    items: [
      { name: "Chiropractor Treatment" }, { name: "Sports Physiotherapy" }, { name: "Pediatric Physiotherapy" }, { name: "Home Care Physiotherapy" }, { name: "Neuro Physiotherapy - Rehab" }, { name: "Pre And Post Surgery Rehabilitation" }, { name: "Geriatric Physiotherapy" }, { name: "Sports Massage Therapy" }, { name: "Strength Training" }, { name: "Advanced Physiotherapy" }, { name: "Women's Health Physiotherapy" }, { name: "Physical Therapy" }, { name: "Musculoskeletal Physiotherapy" }, { name: "Vestibular Rehabilitation (vr)" }, { name: "Workplace Ergonomics : Assessment & Training" }, { name: "Tele-physiotherapy" }, { name: "Cardiac Rehabilitation" }, { name: "Spinal Injury Rehabilitation" }, { name: "Occupational Therapy" }, { name: "Dietician" }, { name: "Home Nursing" }, { name: "Care Takers" }, { name: "Speech Therapy" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
];

export default function WhatWeTreat() {
  return (
    <section className="py-18 md:py-28 lg:py-32 relative overflow-hidden bg-[#02050e] text-white">
      {/* ── Precision Telemetry Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── Fluid Widescreen Container (Zero Side Margins) ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Microscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clinical Pathology Index</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            What We <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Treat & Restore
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Comprehensive clinical interventions for neurological, orthopedic, post-surgical, pediatric, geriatric, and athletic conditions directly in your home.
          </p>
        </motion.div>

        {/* 4 Directory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          {treatmentAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[28px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 flex flex-col h-[460px]"
              >
                <div className="rounded-[26px] bg-[#070c1a]/95 border border-white/10 p-6 flex flex-col h-full space-y-4 overflow-hidden">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-headline text-base font-black text-white">
                          {area.title}
                        </h3>
                        <span className="text-[10px] text-cyan-400 font-mono uppercase">{area.badge}</span>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable list */}
                  <ScrollArea className="flex-1 pr-3">
                    <div className="space-y-1.5">
                      {area.items.map((item, itemIdx) => (
                        <Link
                          key={itemIdx}
                          href={`${area.basePath}/${item.slug}`}
                          className="flex items-center justify-between p-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors group"
                        >
                          <span className="truncate max-w-[220px]">{item.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}