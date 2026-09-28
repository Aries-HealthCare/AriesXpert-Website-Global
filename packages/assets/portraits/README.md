# Aries HealthCare — Expert Portraits Asset Catalog

This directory contains the master source high-resolution portrait photographs of verified Aries HealthCare clinical practitioners (physiotherapists, occupational therapists, speech therapists, nurses, and care coordinators).

---

## Technical Specifications
- **Format**: PNG (Master Source), 32-bit RGBA
- **Typical Resolution**: ~1024x1024 to ~2048x2048
- **Average Size**: ~1.5MB - ~2.0MB per image
- **Uniform Requirement**: Navy Blue / Burgundy Aries uniform with embroidered crest

## Optimization & Distribution Pipeline
These high-resolution source images are processed into optimized WebP thumbnails via the batch portrait optimization tool:
- Script: `ariesxpert-backend/scripts/batch_process_therapist_portraits.ts`
- Destination: `public/images/expert-portraits/`
- Output Format: WebP (`<therapistId>.webp`, quality 85, dimensions 400x400)
- Master Manifest: `public/images/expert-portraits/manifest.json`

## Compatibility
For backward compatibility with legacy scripts, a root symlink is maintained:
`Portrait Expert Images -> packages/assets/portraits`
