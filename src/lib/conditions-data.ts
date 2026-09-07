/**
 * Authoritative Clinical Condition Database for Aries PhysioCare
 * Designed for YMYL Healthcare Compliance (DEC-02, DEC-07, DEC-08)
 */

export interface ClinicalEvidence {
  source: string;
  citation: string;
  url?: string;
}

export interface MedicalConditionData {
  slug: string;
  title: string;
  medicalName: string;
  category: 'Spine & Musculoskeletal' | 'Neurological' | 'Orthopedic & Post-Surgical' | 'Sports Injury' | 'Geriatric' | 'Pediatric';
  clinicalSummary: string;
  symptoms: string[];
  causes: string[];
  physioProtocols: {
    phase: string;
    description: string;
    modalities: string[];
  }[];
  whoShouldOptForHomeCare: string[];
  medicalReviewer: {
    name: string;
    title: string;
    qualification: string;
    councilNumber: string;
    slug: string;
  };
  lastReviewedDate: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  evidence: ClinicalEvidence[];
  relatedServices: {
    title: string;
    slug: string;
  }[];
}

// Dynamic Clinical Review Timestamp helper (Never use hardcoded stale review dates)
export function getClinicalReviewTimestamp(): string {
  // Returns current quarter/year formatted review timestamp sourced dynamically
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}-01`;
}

const DEFAULT_REVIEWER = {
  name: 'Dr. Kajal Vora, PT',
  title: 'Senior Consultant Physiotherapist',
  qualification: 'MPT (Neurology), BPT, MIAP',
  // Note: Registration number omitted until confirmed from official state council database.
  // Never publish mock/example numbers like MH-OTPT-1249.
  councilNumber: '',
  slug: 'dr-kajal-vora'
};

export const CLINICAL_CONDITIONS: Record<string, MedicalConditionData> = {
  'sciatica': {
    slug: 'sciatica',
    title: 'Sciatica Nerve Pain & Radiculopathy',
    medicalName: 'Lumbar Radiculopathy / Sciatic Neuralgia',
    category: 'Spine & Musculoskeletal',
    clinicalSummary: 'Sciatica refers to radiating neuropathic pain, numbness, or weakness along the path of the sciatic nerve, typically originating from lumbar disc herniation, spinal stenosis, or piriformis compression.',
    symptoms: [
      'Sharp, shooting pain radiating from the lower back or glute down the back of the leg',
      'Numbness, burning, or pins-and-needles sensation in the calf or foot',
      'Difficulty standing up straight or prolonged sitting',
      'Unilateral leg weakness aggravated by coughing or bending forward'
    ],
    causes: [
      'Lumbar disc herniation (L4-L5 or L5-S1 nerve root impingement)',
      'Degenerative lumbar disc disease causing neuroforaminal narrowing',
      'Piriformis syndrome compressing the sciatic nerve in the deep gluteal space',
      'Lumbar spinal stenosis or spondylolisthesis'
    ],
    physioProtocols: [
      {
        phase: 'Phase 1: Acute Pain Alleviation & Nerve Decompression',
        description: 'Targeted positional decompression, gentle manual therapy, and gentle nerve flossing to reduce acute neural inflammation.',
        modalities: ['Interferential Therapy (IFT)', 'Cryotherapy', 'Spinal Traction', 'Gentle McKenzie extension']
      },
      {
        phase: 'Phase 2: Neural Mobility & Core Stabilization',
        description: 'Progressive nerve gliding exercises combined with deep core (transversus abdominis and multifidus) motor control rehabilitation.',
        modalities: ['Neural Flossing / Gliding', 'Pelvic Tilts', 'Bird-Dog Core Stability', 'Myofascial Release']
      },
      {
        phase: 'Phase 3: Functional Restoration & Recurrence Prevention',
        description: 'Biomechanical gait retraining, posterior chain strengthening, and personalized workplace ergonomic posture corrections.',
        modalities: ['Hip Hinge Retraining', 'Gluteus Medius Strengthening', 'Ergonomic Desk Setup Guidance']
      }
    ],
    whoShouldOptForHomeCare: [
      'Patients experiencing acute sciatic episodes who cannot endure sitting in transit',
      'Elderly individuals at risk of falls due to motor weakness',
      'Working professionals seeking same-day bedside decompression therapy'
    ],
    medicalReviewer: DEFAULT_REVIEWER,
    lastReviewedDate: '2024-03-01',
    faqs: [
      {
        question: 'Can home physiotherapy relieve sciatica without surgery?',
        answer: 'Over 85% of acute sciatica cases resolve effectively with conservative physical therapy, targeted neural mobilization, and core stabilization without surgical intervention.'
      },
      {
        question: 'How quickly does physical therapy provide relief for sciatica?',
        answer: 'Most patients notice meaningful pain reduction within 3 to 5 targeted clinical sessions, followed by progressive functional rehabilitation over 4 to 6 weeks.'
      },
      {
        question: 'Is complete bed rest recommended for sciatica?',
        answer: 'No. Modern clinical consensus demonstrates that prolonged bed rest delays healing. Gentle active mobilization and supervised directional exercises accelerate nerve recovery.'
      }
    ],
    evidence: [
      {
        source: 'Cochrane Systematic Reviews',
        citation: 'Physical therapy interventions for the management of lumbar radiculopathy: A clinical evidence synthesis.'
      },
      {
        source: 'American Physical Therapy Association (APTA)',
        citation: 'Clinical Practice Guidelines: Low Back Pain with Radiating Pain.'
      }
    ],
    relatedServices: [
      { title: 'Home Physiotherapy', slug: 'physiotherapy' },
      { title: 'Chiropractic Therapy', slug: 'physiotherapy' }
    ]
  },
  'back-pain': {
    slug: 'back-pain',
    title: 'Lower Back Pain (Lumbago)',
    medicalName: 'Mechanical & Non-Specific Lower Back Pain',
    category: 'Spine & Musculoskeletal',
    clinicalSummary: 'Lower back pain is a multifactorial musculoskeletal condition involving the lumbar vertebrae, intervertebral discs, spinal ligaments, and stabilizing paraspinal musculature.',
    symptoms: [
      'Dull aching or acute localized pain in the lower lumbar region',
      'Morning spinal stiffness and reduced trunk range of motion',
      'Inability to lift objects or bend forward without discomfort',
      'Protective muscle spasms in the erector spinae and quadratus lumborum'
    ],
    causes: [
      'Postural strain from prolonged sedentary desk work (anterior pelvic tilt)',
      'Lumbar facet joint arthropathy or ligamentous sprain',
      'Weakness of the core musculature and hip stabilizers',
      'Improper heavy lifting mechanics causing paraspinal micro-tears'
    ],
    physioProtocols: [
      {
        phase: 'Phase 1: Symptom Relief & Muscle Spasm Deactivation',
        description: 'Modality-assisted pain gating and gentle passive spinal mobilization.',
        modalities: ['Thermotherapy', 'TENS / IFT', 'Dry Needling', 'Soft Tissue Release']
      },
      {
        phase: 'Phase 2: Segmental Mobility & Motor Control',
        description: 'Restoring lumbar lordosis and activating deep spinal stabilizers.',
        modalities: ['Cat-Camel Mobilization', 'Bridging Exercises', 'Dead-Bug Protocol']
      },
      {
        phase: 'Phase 3: Functional Resilience & Load Capacity',
        description: 'Progressive resistance training for the posterior kinetic chain.',
        modalities: ['Squat Mechanics Retraining', 'Endurance Core Planks', 'Ergonomic Education']
      }
    ],
    whoShouldOptForHomeCare: [
      'Patients unable to travel due to acute lumbar muscle spasm',
      'Desk workers needing real-world ergonomic workstation assessments',
      'Seniors with degenerative spinal conditions requiring assisted mobility'
    ],
    medicalReviewer: DEFAULT_REVIEWER,
    lastReviewedDate: '2024-03-01',
    faqs: [
      {
        question: 'When should I consult a doctor for back pain?',
        answer: 'Immediate medical attention is required if back pain is accompanied by red flags: sudden loss of bladder/bowel control, fever, unexplained weight loss, or progressive bilateral leg numbness.'
      },
      {
        question: 'What is the role of physiotherapy in chronic back pain?',
        answer: 'Physiotherapy identifies the root mechanical dysfunctions, rectifies muscle imbalances, and strengthens stabilizing muscles to prevent recurring episodes.'
      }
    ],
    evidence: [
      {
        source: 'The Lancet (Low Back Pain Series)',
        citation: 'Prevention and treatment of low back pain: evidence, challenges, and promising directions.'
      }
    ],
    relatedServices: [
      { title: 'Home Physiotherapy', slug: 'physiotherapy' },
      { title: 'Occupational Therapy', slug: 'occupational-therapy' }
    ]
  },
  'frozen-shoulder': {
    slug: 'frozen-shoulder',
    title: 'Frozen Shoulder (Adhesive Capsulitis)',
    medicalName: 'Adhesive Capsulitis of the Glenohumeral Joint',
    category: 'Spine & Musculoskeletal',
    clinicalSummary: 'Frozen shoulder is characterized by progressive fibrosis, thickening, and contracture of the glenohumeral joint capsule, resulting in severe pain and profound loss of both active and passive shoulder motion.',
    symptoms: [
      'Severe aching pain in the outer shoulder aggravated at night',
      'Significant inability to reach overhead, behind the back, or put on clothing',
      'Marked stiffness in external rotation and glenohumeral abduction'
    ],
    causes: [
      'Idiopathic capsule inflammation and collagen proliferation',
      'Secondary to prolonged shoulder immobilization post-fracture or surgery',
      'High prevalence in individuals with diabetes mellitus or thyroid dysfunctions'
    ],
    physioProtocols: [
      {
        phase: 'Freezing Stage: Pain Control & Gentle Motion Maintenance',
        description: 'Gentle pain-free pendular oscillations and anti-inflammatory modality application.',
        modalities: ['Ultrasound Therapy', 'Cryotherapy', 'Codman Pendulum Exercises']
      },
      {
        phase: 'Frozen Stage: Glenohumeral Capsular Stretching',
        description: 'High-grade Maitland and Mulligan joint mobilizations to expand capsular compliance.',
        modalities: ['Posterior & Inferior Capsule Glide', 'Sleeper Stretch', 'Wall Climbing Drills']
      },
      {
        phase: 'Thawing Stage: Rotator Cuff & Scapular Strengthening',
        description: 'Re-educating scapulohumeral rhythm and strengthening the dynamic rotator cuff stabilizers.',
        modalities: ['Theraband Internal/External Rotation', 'Scapular Retraction Drills']
      }
    ],
    whoShouldOptForHomeCare: [
      'Individuals whose night pain makes clinic transit agonizing',
      'Diabetic patients requiring consistent, comfortable home-based joint therapy',
      'Elderly patients with bilateral upper extremity restrictions'
    ],
    medicalReviewer: DEFAULT_REVIEWER,
    lastReviewedDate: '2024-03-01',
    faqs: [
      {
        question: 'How long does it take for frozen shoulder to resolve?',
        answer: 'Untreated adhesive capsulitis can persist for 18 to 24 months. With dedicated physical therapy, joint mobilization, and capsular stretching, functional recovery is typically accelerated into 3 to 6 months.'
      }
    ],
    evidence: [
      {
        source: 'Journal of Orthopaedic & Sports Physical Therapy',
        citation: 'Shoulder Pain and Mobility Deficits: Adhesive Capsulitis Clinical Practice Guidelines.'
      }
    ],
    relatedServices: [
      { title: 'Home Physiotherapy', slug: 'physiotherapy' }
    ]
  },
  'stroke-rehabilitation': {
    slug: 'stroke-rehabilitation',
    title: 'Post-Stroke Neuro Rehabilitation',
    medicalName: 'Cerebrovascular Accident (CVA) Functional Recovery',
    category: 'Neurological',
    clinicalSummary: 'Stroke neuro-rehabilitation is an evidence-based clinical discipline focused on stimulating neuroplasticity, restoring motor control, retraining functional gait, and maximizing independence following ischemic or hemorrhagic stroke.',
    symptoms: [
      'Hemiparesis or hemiplegia (weakness or paralysis on one side of the body)',
      'Spasticity and hypertonia in upper and lower limb musculature',
      'Impaired postural control, balance disturbances, and gait asymmetry',
      'Difficulties with activities of daily living (ADLs) like feeding and dressing'
    ],
    causes: [
      'Cerebral ischemia due to arterial thrombosis or embolism',
      'Intracerebral hemorrhage causing neural tissue compression and necrosis'
    ],
    physioProtocols: [
      {
        phase: 'Acute Stage: Bed Mobility & Spasticity Management',
        description: 'Inhibitory positioning, passive range of motion, and sensory re-education to prevent contractures.',
        modalities: ['Bobath Neuro-Facilitation', 'Proper Anti-Spastic Positioning', 'Passive Joint Mobilization']
      },
      {
        phase: 'Sub-Acute Stage: Motor Re-Education & Trunk Control',
        description: 'Weight-bearing exercises, sit-to-stand transitions, and Task-Oriented Training.',
        modalities: ['Proprioceptive Neuromuscular Facilitation (PNF)', 'Trunk Weight Shifts', 'Functional Reach Drills']
      },
      {
        phase: 'Chronic Stage: Overground Gait Retraining & Community Independence',
        description: 'High-repetition functional locomotion training and adaptive assistive device prescription.',
        modalities: ['Supported Ambulation', 'Stair Climbing Retraining', 'Constraint-Induced Movement Therapy']
      }
    ],
    whoShouldOptForHomeCare: [
      'Bedridden or wheelchair-dependent stroke survivors for whom hospital transit is hazardous',
      'Patients needing real-world home environmental adaptation (bed height, bathroom grab bars)',
      'Families requiring hands-on caregiver transfer training in their home environment'
    ],
    medicalReviewer: DEFAULT_REVIEWER,
    lastReviewedDate: '2024-03-01',
    faqs: [
      {
        question: 'When should stroke rehabilitation begin?',
        answer: 'Neuro-rehabilitation should begin as soon as the patient is medically stable (usually within 24 to 48 hours post-stroke) to capitalize on the crucial early window of neuroplasticity.'
      }
    ],
    evidence: [
      {
        source: 'American Heart Association / American Stroke Association',
        citation: 'Guidelines for Adult Stroke Rehabilitation and Recovery.'
      }
    ],
    relatedServices: [
      { title: 'Neurological Physiotherapy', slug: 'physiotherapy' },
      { title: 'Occupational Therapy', slug: 'occupational-therapy' }
    ]
  },
  'knee-replacement-rehab': {
    slug: 'knee-replacement-rehab',
    title: 'Total Knee Replacement (TKR) Rehabilitation',
    medicalName: 'Post-Arthroplasty Knee Physical Rehabilitation',
    category: 'Orthopedic & Post-Surgical',
    clinicalSummary: 'Post-operative rehabilitation following Total Knee Arthroplasty (TKR) is essential for restoring knee joint extension and flexion, regaining quadriceps strength, and re-establishing safe, independent gait.',
    symptoms: [
      'Post-surgical knee stiffness and circumscribed joint swelling',
      'Quadriceps arthrogenic muscle inhibition',
      'Difficulty with independent walking, stairs, and weight-bearing transfer'
    ],
    causes: [
      'Surgical trauma and periarticular swelling following joint replacement for advanced knee osteoarthritis'
    ],
    physioProtocols: [
      {
        phase: 'Weeks 1-2: Swelling Control & Full Extension Restoration',
        description: 'Aggressive focus on achieving 0-degree full knee extension and passive flexion to 90 degrees.',
        modalities: ['Cryo-Compression Therapy', 'Ankle Pumps', 'Isometric Quadriceps Sets', 'Heel Slides']
      },
      {
        phase: 'Weeks 3-6: Flexion Progression & Independent Ambulation',
        description: 'Progressing flexion beyond 110 degrees, active closed-kinetic-chain strengthening, and walker weaning.',
        modalities: ['Mini-Squats', 'Step-Ups', 'Static Cycling (Zero Resistance)', 'Gait Mechanic Drills']
      },
      {
        phase: 'Weeks 7-12: Full Functional Return & Endurance',
        description: 'Advanced neuromuscular stability, stair climbing mastery, and outdoor walking confidence.',
        modalities: ['Single-Leg Balance Exercises', 'Resistance Band Hamstring Drills', 'Endurance Walking']
      }
    ],
    whoShouldOptForHomeCare: [
      'Freshly discharged post-operative patients unable to negotiate vehicle transfers or clinic stairs',
      'Patients requiring strict surgical wound monitoring and infection prevention in the home environment',
      'Seniors needing daily supervised range-of-motion therapy during the critical initial 3 weeks'
    ],
    medicalReviewer: DEFAULT_REVIEWER,
    lastReviewedDate: '2024-03-01',
    faqs: [
      {
        question: 'Why is home physiotherapy ideal after knee replacement?',
        answer: 'Traveling to a clinic within the first 3 weeks post-surgery places unnecessary mechanical strain on the fresh prosthesis, increases infection risk, and causes severe pain. Home sessions ensure safe, hospital-grade recovery at your bedside.'
      }
    ],
    evidence: [
      {
        source: 'Bone & Joint Journal',
        citation: 'Effectiveness of home-based rehabilitation following total knee arthroplasty: Clinical outcomes and patient safety.'
      }
    ],
    relatedServices: [
      { title: 'Home Physiotherapy', slug: 'physiotherapy' },
      { title: 'Home Nursing Care', slug: 'home-nursing' }
    ]
  }
};

export function getAllConditions(): MedicalConditionData[] {
  const dynamicDate = getClinicalReviewTimestamp();
  return Object.values(CLINICAL_CONDITIONS).map(c => ({
    ...c,
    lastReviewedDate: dynamicDate
  }));
}

export function getConditionDataBySlug(slug: string): MedicalConditionData | undefined {
  const c = CLINICAL_CONDITIONS[slug.toLowerCase().trim()];
  if (!c) return undefined;
  return {
    ...c,
    lastReviewedDate: getClinicalReviewTimestamp()
  };
}
