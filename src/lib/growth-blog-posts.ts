/**
 * Fetches AI-published blog articles from the Growth Engine public catalog.
 */

export interface GrowthBlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  contentId?: string;
  territory?: string;
  topic?: string;
  publishedAt?: string;
  url?: string;
  imageUrl?: string;
  cta?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://api.ariesxpert.com/api/v1';

const FALLBACK_CLINICAL_ARTICLES: GrowthBlogPost[] = [
  {
    id: 'post-lower-back-pain-rehab',
    slug: 'evidence-based-lower-back-pain-rehabilitation-at-home',
    title: 'Evidence-Based Lower Back Pain Rehabilitation: Modern Clinical Protocols at Home',
    summary: 'Discover how targeted core stabilization, Lumbar McKenzie mechanical diagnosis, and digital electrotherapy reduce disc herniation and sciatica pain without invasive surgery.',
    content: `# Evidence-Based Lower Back Pain Rehabilitation: Modern Clinical Protocols at Home

Lower back pain (LBP) remains the leading cause of activity limitation and work absence worldwide. Whether resulting from acute lumbar strain, lumbar disc herniation, spinal stenosis, or postural fatigue from prolonged desk work, comprehensive home-based physical rehabilitation has demonstrated superior long-term outcomes compared to passive rest alone.

## 1. Acute vs. Subacute Clinical Pathways
In the acute phase (0–4 weeks), our clinical priority focuses on inflammation reduction and directional preference identification:
- **Mechanical Diagnosis and Therapy (MDT / McKenzie Method):** Classifying symptoms into derangement, dysfunction, or postural syndromes to prescribe directional extension/flexion movements that promote centralization of radiating sciatic pain.
- **Electrotherapy & Modalities:** Deploying calibrated Interferential Therapy (IFT) and Class IV Laser to downregulate nociceptive nerve firing and alleviate severe muscle spasms.

## 2. Core Stability & Motor Control
Long-term spinal protection requires deep musculature reactivation:
- **Transversus Abdominis & Multifidus Recruitment:** Restoring neuromuscular timing before global mobilization.
- **Neutral Spine Loading:** Progressing from supine bridging to quadruped bird-dogs, side planks, and loaded hip hinges.

## 3. Ergonomics and Lifestyle Modification
Over 70% of recurrences stem from uncorrected workstation ergonomics. Our senior visiting physiotherapists conduct an on-site evaluation of chair lumbar support, monitor focal height, and daily sitting intervals to eliminate micro-trauma.

## Conclusion
With structured, doorstep clinical intervention, over 88% of patients achieve significant pain relief and functional restoration within 10–15 sessions.`,
    territory: 'Physiotherapy & Spine Care',
    topic: 'Back Pain & Spine',
    publishedAt: '2026-02-15T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=1600',
  },
  {
    id: 'post-knee-osteoarthritis-management',
    slug: 'managing-knee-osteoarthritis-quadriceps-strengthening-home-care',
    title: 'Managing Knee Osteoarthritis at Home: Joint Preservation & Advanced Biomechanics',
    summary: 'A complete clinical guide to non-surgical knee osteoarthritis care: isometric quad loading, patellar mobilization, hyaluronic joint offloading, and pain-free mobility.',
    content: `# Managing Knee Osteoarthritis at Home: Joint Preservation & Advanced Biomechanics

Osteoarthritis (OA) of the knee is a degenerative articular cartilage condition affecting millions of active adults and senior citizens. Modern clinical guidelines strongly emphasize that targeted physical therapy is first-line management for preserving joint space and postponing or avoiding surgical arthroplasty.

## 1. Targeted Quadriceps & Hamstring Conditioning
The knee joint absorbs up to 4x body weight during stair descent. By systematically strengthening the vastus medialis oblique (VMO) and gluteus medius:
- **Closed Kinetic Chain Exercises:** Wall squats with Swiss ball support and straight leg raises reduce tibiofemoral peak stress.
- **Range of Motion Optimization:** Gentle passive knee flexion and extension to circulate synovial fluid and nourish joint cartilage.

## 2. In-Home Therapeutic Modalities
- **High-Frequency Therapeutic Ultrasound:** Promotes deep tissue micro-massage to reduce intra-capsular effusion.
- **TENS & Cryotherapy Protocols:** Manages inflammatory flare-ups post-exertion without pharmacological reliance.

## 3. Gait Correction & Assisted Walking
Our therapists assess foot pronation, pelvic drop (Trendelenburg sign), and stride cadence to prescribe customized orthotics and walking aids that offload the medial knee compartment.`,
    territory: 'Orthopedic Rehabilitation',
    topic: 'Knee & Joint Pain',
    publishedAt: '2026-02-10T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1600',
  },
  {
    id: 'post-stroke-neuro-recovery-timeline',
    slug: 'post-stroke-neurological-rehabilitation-timeline-and-neuroplasticity',
    title: 'Post-Stroke Neurological Recovery: Harnessing Neuroplasticity with Home Rehabilitation',
    summary: 'Understand the critical golden window of post-stroke rehabilitation, Bobath concepts, task-oriented training, and how home-based care can activate neuroplasticity for meaningful recovery.',
    content: `# Post-Stroke Neurological Recovery: Harnessing Neuroplasticity with Home Rehabilitation

## 1. Introduction: Understanding Post-Stroke Recovery
A stroke occurs when the blood supply to a part of the brain is interrupted, either due to a blockage (ischemic stroke) or a bleed (hemorrhagic stroke). This can affect movement, balance, speech, cognition, and daily function. The good news is that the brain has an incredible ability to rewire itself — a process called neuroplasticity. With the right rehabilitation and home support, many individuals can regain significant independence and improve their quality of life.

## 2. Common Symptoms After Stroke
Symptoms vary depending on the area of the brain affected and may include:
- Weakness or paralysis on one side of the body
- Difficulty with balance and coordination
- Problems with speech or communication
- Cognitive or memory changes
- Difficulty with daily activities (bathing, dressing, walking)
- Emotional changes (mood swings, anxiety)
- Reduced coordination and fine motor control

## 3. Diagnosis and Clinical Assessment
Diagnosis typically involves a combination of neurological examination, brain imaging (CT or MRI), and functional assessments. At Aries PhysioCare, we also assess movement patterns, balance, muscle strength, and daily activity needs to design a personalized rehabilitation plan.

## 4. The Recovery Journey: Neuroplasticity in Action
Neuroplasticity is the brain's ability to form new connections and reorganize itself after injury. Clinical evidence confirms that intensive, repetitive, and task-specific rehabilitation in the patient's real-world environment significantly accelerates neurological retraining and functional recovery.

## 5. Basic Rehabilitation Protocols
- **Bobath & NDT Approaches:** Inhibiting abnormal synergies and spasticity while facilitating normal posture and movement.
- **Constraint-Induced Movement Therapy (CIMT):** Encouraging use of the affected upper limb to overcome learned non-use.
- **Task-Oriented Training:** Practice of real-life activities such as reaching, grasping, standing, and walking.
- **Balance & Coordination Drills:** To reduce fall risk and improve stability.

## 6. Home Rehabilitation Approach
Home-based rehabilitation bridges the gap between hospital and daily life. Our therapists train patients and caregivers in safe transfer techniques, home exercise programs, gait training, and positioning strategies — ensuring continuous progress in a familiar, comfortable environment.

## 7. When to Contact Us
If you or a loved one has experienced a stroke, early rehabilitation can make a meaningful difference. Contact Aries PhysioCare for a personalized assessment and home rehabilitation plan.`,
    territory: 'Neurological Care',
    topic: 'Stroke & Neuro Rehab',
    publishedAt: '2026-02-05T00:00:00.000Z',
    imageUrl: '/images/blog/stroke-rehab-hero.jpg',
  },
  {
    id: 'post-stroke-rehab-complete-guide',
    slug: 'stroke-rehabilitation-at-home-a-complete-guide',
    title: 'Stroke Rehabilitation at Home: A Complete Guide',
    summary: 'Practical tips, exercises and expert advice for continuous recovery at home.',
    content: `# Stroke Rehabilitation at Home: A Complete Guide
## 1. Introduction: Setting Up a Safe Home Environment
Preparing the home is the crucial first step for stroke rehabilitation. Removing fall hazards, installing grab bars, and optimizing lighting empowers patients to move with greater security.

## 2. Daily Range of Motion and Spasticity Control
Gentle passive and active-assisted range of motion exercises prevent contractures and reduce post-stroke hypertonia. Daily stretches for shoulder, wrist, knee, and ankle preserve full joint mobility.

## 3. Functional Task Repetition
Practicing essential everyday tasks—such as drinking from a cup, buttoning clothes, and sit-to-stand transitions—builds muscular endurance and neural connectivity.

## 4. Family and Caregiver Involvement
A consistent, supportive home atmosphere with trained caregivers accelerates milestone achievements and restores patient self-esteem.`,
    territory: 'Neurological Care',
    topic: 'Stroke & Neuro Rehab',
    publishedAt: '2026-02-01T00:00:00.000Z',
    imageUrl: '/images/blog/stroke-rehab-hero.jpg',
  },
  {
    id: 'post-understanding-neuroplasticity',
    slug: 'understanding-neuroplasticity-in-stroke-recovery',
    title: 'Understanding Neuroplasticity in Stroke Recovery',
    summary: 'How the brain adapts and rewires after a stroke, and how physiotherapy helps.',
    content: `# Understanding Neuroplasticity in Stroke Recovery
## 1. The Cellular Science of Rewiring
Following cerebral injury, intact neural tissue can recruit dormant synapses and construct alternate neural pathways to bypass damaged regions.

## 2. Intensity and Repetition as Catalysts
Research shows that targeted, high-repetition motor tasks are the primary stimulants for synaptogenesis and cortical reorganization.

## 3. Feedback Loops and Motor Learning
Real-time sensory feedback and progressive resistance training solidify newly forged connections into permanent functional recovery.`,
    territory: 'Neurological Care',
    topic: 'Brain & Neuroplasticity',
    publishedAt: '2026-01-28T00:00:00.000Z',
    imageUrl: '/images/blog/neuroplasticity-brain.jpg',
  },
  {
    id: 'post-balance-training-after-stroke',
    slug: 'balance-training-after-stroke-steps-to-safer-movement',
    title: 'Balance Training After Stroke: Steps to Safer Movement',
    summary: 'Effective balance exercises and strategies to prevent falls.',
    content: `# Balance Training After Stroke: Steps to Safer Movement
## 1. Restoring Center of Gravity Awareness
Post-stroke asymmetry often causes patients to favor their unaffected side. Postural retraining re-establishes equal bilateral weight distribution.

## 2. Progressive Balance Exercises
Advancing from seated weight shifts to standing balance drills and tandem stance exercises progressively challenges the vestibular and proprioceptive systems.

## 3. Assistive Devices and Community Ambulation
Transitioning from quad canes or rollator walkers to independent ambulation is guided by objective balance scoring and gait analysis.`,
    territory: 'Physiotherapy',
    topic: 'Gait & Balance',
    publishedAt: '2026-01-25T00:00:00.000Z',
    imageUrl: '/images/blog/balance-cane-walk.jpg',
  }
];

export async function fetchGrowthBlogPosts(): Promise<GrowthBlogPost[]> {
  try {
    const res = await fetch(`${API_BASE}/growth-engine/public/website/blogs`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Network or server error — return curated clinical articles
  }
  return FALLBACK_CLINICAL_ARTICLES;
}

export async function fetchGrowthBlogBySlug(
  slug: string,
): Promise<GrowthBlogPost | null> {
  const posts = await fetchGrowthBlogPosts();
  return posts.find((p) => p.slug === slug) ?? FALLBACK_CLINICAL_ARTICLES.find((p) => p.slug === slug) ?? null;
}
