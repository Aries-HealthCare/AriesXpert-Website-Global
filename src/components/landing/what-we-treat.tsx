'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Microscope } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { cn } from "@/lib/utils";

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const treatmentAreas = [
  {
    title: "Condition",
    basePath: "/services/physiotherapy/conditions",
    items: [
      { name: "Lumbar Spondylosis" }, { name: "Ankle Dislocation" }, { name: "Tarsal Tunnel Syndrome" }, { name: "Ankle Instability" }, { name: "Posterior Tibial Tendon Dysfunction (Pttd)" }, { name: "Metatarsalgia" }, { name: "Herniated Disk Or Slipped Disc" }, { name: "Clubfoot Or Congenital Talipes Equinovarus Or Ctev" }, { name: "Ankle Bone Spur" }, { name: "Total Hip Replacement (thr)" }, { name: "Swan Neck Deformity" }, { name: "Erb’s Palsy" }, { name: "Sprengel's Shoulder" }, { name: "Meralgia Paresthetica" }, { name: "Tendinitis" }, { name: "Sciatica" }, { name: "Guillain-barré Syndrome" }, { name: "Fecal Incontinence" }, { name: "Radial Nerve Injury" }, { name: "Sacralization" }, { name: "Shoulder Impingement" }, { name: "Disc Bulge" }, { name: "Dyslexia" }, { name: "Genu Valgus" }, { name: "Genu Varum" }, { name: "Cauda Equina Syndrome" }, { name: "Wartenberg’s Syndrome" }, { name: "Shoulder Arthropathy" }, { name: "Cuboid Syndrome" }, { name: "Median Nerve Injury" }, { name: "Hemangioma" }, { name: "Raynaud’s Disease" }, { name: "Urinary Incontinence" }, { name: "Pelvic Organ Prolapse" }, { name: "Motor Neuron Disease (mnd)" }, { name: "Complex Regional Pain Syndrome (crps)" }, { name: "Cervicogenic Headache" }, { name: "Infantile Hemiparesis" }, { name: "Galeazzi Fracture" }, { name: "Lymphedema" }, { name: "Wrist Drop" }, { name: "Trigger Finger" }, { name: "Retrolisthesis" }, { name: "Klumpke's Palsy" }, { name: "Supraspinatus Tendinitis" }, { name: "Lumbarization" }, { name: "Foot Drop" }, { name: "Smith Fracture" }, { name: "Gastrocnemius Rupture" }, { name: "Osgood-schlatter Disease" }, { name: "Hill-sachs Lesion" }, { name: "Hemiplegia" }, { name: "Myositis Ossification (mo)" }, { name: "Huntington's Disease (hd)" }, { name: "Systemic Lupus Erythematosus (sle)" }, { name: "Reiter's Syndrome" }, { name: "Peripheral Artery Disease (pad)" }, { name: "Lipedema" }, { name: "Cervical Spondylosis" }, { name: "Frozen Shoulder" }, { name: "Vertigo" }, { name: "Achilles Tendon Rupture" }, { name: "Carpal Tunnel Syndrome (cts)" }, { name: "Arthritis" }, { name: "Chondromalacia Patella" }, { name: "Knee Bursitis" }, { name: "Anterior Cruciate Ligament Tear(acl)" }, { name: "Ankle Sprain" }, { name: "Cerebral Palsy" }, { name: "Parkinson's Disease" }, { name: "Tennis Elbow" }, { name: "Baastrup Syndrome" }, { name: "Osteoarthritis" }, { name: "Cervical Myelopathy" }, { name: "Osteoporosis" }, { name: "Whiplash" }, { name: "Rotator Cuff Injury" }, { name: "Scoliosis" }, { name: "Bell's Palsy Or Facial Palsy" }, { name: "Dementia" }, { name: "Plantar Fasciitis" }, { name: "Concussion" }, { name: "Spinal Stenosis" }, { name: "Rheumatoid Arthritis" }, { name: "Tailbone Pain/coccydynia" }, { name: "Piriformis Syndrome" }, { name: "Myasthenia Gravis (mg)" }, { name: "Diabetic Neuropathy" }, { name: "Degenerative Disc Disease" }, { name: "Distal Muscular Dystrophy" }, { name: "Asthma" }, { name: "Temporomandibular Joint (tmj)" }, { name: "Stroke Or Cerebrovascular Accident (cva)" }, { name: "Hamstring Strain" }, { name: "Fibromyalgia Syndrome" }, { name: "Total Knee Replacement(tkr)" }, { name: "Meniscal Injury" }, { name: "Spina Bifida" }, { name: "Down Syndrome" }, { name: "Torticollis" }, { name: "Shoulder Dislocation" }, { name: "Shoulder And Arm Fractures" }, { name: "Elbow Fractures" }, { name: "Forearm Fractures" }, { name: "Wrist Fracture" }, { name: "Hand Fractures" }, { name: "Mallet Finger" }, { name: "Boutonniere Deformity" }, { name: "Ganglion Cyst" }, { name: "Burns" }, { name: "De Quervain's Tenosynovitis" }, { name: "Cubital Tunnel Syndrome" }, { name: "Biceps Tendonitis" }, { name: "Radial Tunnel Syndrome" }, { name: "Hip Fracture" }, { name: "Trochanteric Bursitis" }, { name: "Hip Labral Tear" }, { name: "Hip Impingement" }, { name: "Hip Osteoarthritis" }, { name: "Patellar Fracture" }, { name: "Patella Dislocation" }, { name: "Medial Collateral Ligament (mcl) Injury" }, { name: "Lateral Collateral Ligament(lcl) Injury" }, { name: "Posterior Cruciate Ligament(pcl) Injury" }, { name: "Popliteal (baker's) Cyst" }, { name: "Varicose Veins" }, { name: "White Matter Disease" }, { name: "Patellar Tendonitis" }, { name: "Deep Venous Thrombosis" }, { name: "Knee Fracture" }, { name: "Flat Foot" }, { name: "Ankle Fracture" }, { name: "Ankle Syndesmosis Ligament Injury" }, { name: "Bunion Or Hallux Valgus" }, { name: "Hammer Toe" }, { name: "Knee Osteoarthritis" }, { name: "Golfer's Elbow" }, { name: "Spondylolisthesis" }, { name: "Ankylosing Spondylitis (as)" }, { name: "Discectomy" }, { name: "Laminectomy" }, { name: "Autism" }, { name: "Spinal Fusion" }, { name: "Spinal Cord Injury" }, { name: "Leprosy" }, { name: "Migraine" }, { name: "Multiple Sclerosis" }, { name: "Quadriplegia" }, { name: "Ulnar Nerve Injury" }, { name: "Transverse Myelitis (tm)" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Symptoms",
    basePath: "/services/physiotherapy/symptoms",
    items: [
      { name: "Muscle Stiffness" }, { name: "Muscle Spasm" }, { name: "Crepitus - Cracking Joints" }, { name: "Numbness And Tingling" }, { name: "Neck Pain" }, { name: "Foot Pain" }, { name: "Tremors" }, { name: "Back Pain" }, { name: "Myalgia (muscle Pain)" }, { name: "Knee Pain" }, { name: "Joint Pain" }, { name: "Shoulder Pain" }, { name: "Loss Of Balance" }, { name: "Inflammation" }, { name: "Headache" }, { name: "Shortness Of Breath" }, { name: "Sprains And Strains" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Therapies Offered",
    basePath: "/services/physiotherapy/therapies-offered",
    items: [
      { name: "Interferential Therapy (ift)" }, { name: "Chiropractic Therapy" }, { name: "Ultrasound Therapy" }, { name: "Laser Therapy" }, { name: "Cupping Therapy" }, { name: "Wax Therapy" }, { name: "Kinesio Taping / Taping Therapy" }, { name: "Dry Needling Therapy" }, { name: "Thermotherapy(heat Therapy)" }, { name: "Transcutaneous Electrical Nerve Stimulation(tens) Therapy" }, { name: "Lymphatic Drainage Massage" }, { name: "Overhead Track Harness Therapy" }, { name: "Traction Therapy" }, { name: "Spinal Decompression / Traction Therapy" }, { name: "Tecar / Cret Therapy" }, { name: "Cryotherapy(cold Therapy)" }, { name: "Dynamic Compression Therapy" }, { name: "Shockwave Therapy" }, { name: "Robotic Spinal Decompression Therapy" }, { name: "Manual Therapy" }, { name: "Myofascial Release (mfr)" }, { name: "Soft Tissue Mobilization" }, { name: "Pelvic Floor Physical Therapy" }, { name: "Chest Physiotherapy" }, { name: "Shortwave Diathermy (swd)" },
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Services Offered",
    basePath: "/services/physiotherapy/services-offered",
    items: [
      { name: "Chiropractor Treatment" }, { name: "Sports Physiotherapy" }, { name: "Pediatric Physiotherapy" }, { name: "Home Care Physiotherapy" }, { name: "Neuro Physiotherapy - Rehab" }, { name: "Pre And Post Surgery Rehabilitation" }, { name: "Geriatric Physiotherapy" }, { name: "Sports Massage Therapy" }, { name: "Strength Training" }, { name: "Advanced Physiotherapy" }, { name: "Women's Health Physiotherapy" }, { name: "Physical Therapy" }, { name: "Musculoskeletal Physiotherapy" }, { name: "Vestibular Rehabilitation (vr)" }, { name: "Workplace Ergonomics : Assessment & Training" }, { name: "Tele-physiotherapy" }, { name: "Cardiac Rehabilitation" }, { name: "Spinal Injury Rehabilitation" }, { name: "Occupational Therapy" }, { name: "Dietician" }, { name: "Home Nursing" }, { name: "Care Takers" }, { name: "Speech Therapy" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
];

export default function WhatWeTreat() {
  return (
    <section className="py-10 md:py-14 relative overflow-hidden bg-background">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16 space-y-6 flex flex-col items-center animate-reveal-up">
          <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight uppercase">
            <span className="premium-gradient-text">WHAT WE TREAT</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light">
            We provide specialized physiotherapy treatments for neurological, orthopedic, musculoskeletal, pediatric, geriatric, and sports-related conditions — addressing a wide range of symptoms and recovery needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {treatmentAreas.map((area, index) => (
            <Card
              key={`${area.title}-${index}`}
              className={cn(
                "group premium-card transition-all duration-500 flex flex-col relative overflow-hidden h-[420px] rounded-3xl border-0",
                "animate-reveal-up fill-mode-both",
                index < 2 ? "stagger-1" : "stagger-2"
              )}
            >
              {/* Internal Glow on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.05)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <CardHeader className="text-center relative z-10 pt-10 pb-6">
                <CardTitle className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-primary group-hover:text-primary/80 transition-colors">
                  {area.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow relative z-10 px-8 md:px-12 overflow-hidden">
                <ScrollArea className="h-full pr-4 custom-scrollbar">
                  <ul className="space-y-4">
                    {area.items.map((item) => (
                      <li key={`${area.title}-${item.slug}`} className="group/item">
                        <Link
                          href={`${area.basePath}/${item.slug}`}
                          className="flex items-center gap-4 py-1 transition-all duration-300"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-md group-hover/item:scale-110 transition-transform">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-base font-bold text-foreground/80 group-hover/item:text-primary transition-colors leading-tight">
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>

              <div className="h-10 shrink-0" /> {/* Spacer for visual balance */}
            </Card>
          ))}
        </div>

        {/* Global Registry Summary */}
        <div className="mt-20 text-center animate-reveal-up stagger-3">
          <p className="text-[10px] font-bold text-muted-foreground/80 uppercase tracking-[0.3em] mb-4 drop-shadow-sm">
            A Division of Aries HealthCare International Pvt Ltd
          </p>
          <div className="h-px w-24 bg-primary/20 mx-auto" />
        </div>
      </div>
    </section>
  );
}