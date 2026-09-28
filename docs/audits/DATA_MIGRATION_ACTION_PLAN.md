# Data Mapping Action Plan & Implementation Guide

**Purpose**: Specific steps to fix data mapping issues and ensure proper migration
**Date**: 17 February 2026
**Urgency**: 🔴 HIGH - Some data loss risks

---

## Overview

Based on the comprehensive analysis in `COMPLETE_DATA_MAPPING_ANALYSIS.md`, this document provides:
1. Specific problems to fix
2. Step-by-step solutions
3. Testing procedures
4. Rollback procedures

---

## SECTION A: CRITICAL FIXES (Do Immediately)

### PROBLEM 1: Area Information Lost During Migration
**Risk Level**: 🔴 HIGH
**Impact**: Therapists can no longer specify service areas by name
**Affected Data**: `areaOfServiceInfo.areas[]`

#### Current State
```typescript
// OLD SYSTEM (STILL IN MONGODB)
{
  areaOfServiceInfo: {
    city: "Mumbai",
    cityId: "12345",
    areas: ["Bandra", "Andheri", "Dadar"]  // ← SPECIFIC AREA NAMES
  }
}

// NEW SYSTEM (MISSING AREAS)
{
  pincodes: ["400001", "400002", "400003"]  // ← ONLY PINCODES
}
```

#### Solution
**Option A: Create Migration Script** (Recommended)

```javascript
// Migration script: migrate-areas-to-pincodes.js
const mapping = {
  // MUMBAI
  "Bandra": ["400050"],
  "Andheri": ["400058", "400061"],
  "Dadar": ["400014", "400028"],
  "Powai": ["400076"],
  "Borivali": ["400091", "400103"],
  // Add more as needed
};

db.therapists.updateMany(
  { "areaOfServiceInfo.areas": { $exists: true } },
  [
    {
      $set: {
        pincodes: {
          $reduce: {
            input: "$areaOfServiceInfo.areas",
            initialValue: [],
            in: { $concatArrays: ["$$value", { $ifNull: [{ $arrayElemAt: [Object.values(mapping), { $indexOfArray: [Object.keys(mapping), "$$this"] }] }, []] }] }
          }
        }
      }
    }
  ]
);

// After migration, verify
db.therapists.find({ "areaOfServiceInfo.areas": { $exists: true } }, { pincodes: 1 })
```

**Option B: Store Both (Most Compatible)**

```typescript
// Update schema to support both
// In new backend: Add areasOfService back
@Prop([String])
areas: string[];  // Keep for backward compatibility

@Prop([String])
pincodes: string[];  // New pincode-based areas

// Both are populated during migration
```

**Recommended**: Option A (cleaner, one source of truth)

---

### PROBLEM 2: Qualification vs Specialization Confusion
**Risk Level**: 🟡 MEDIUM
**Impact**: Wrong fields being displayed for each value
**Status**: 🟡 PARTIALLY FIXED (transformer correct, but need to verify data)

#### Current State (FIXED in Transformer)
```typescript
// Transformer now correctly extracts:
qualification: toString(
  getNestedValue(mongoDoc, "professionalInfo.qualification") ||
  getNestedValue(mongoDoc, "qualification") ||
  getNestedValue(mongoDoc, "professionalInfo.degree") ||
  ""
),
specialization: toString(
  getNestedValue(mongoDoc, "professionalInfo.specialization") ||
  getNestedValue(mongoDoc, "specialization") ||
  ""
),
```

#### Action Required
**Verify MongoDB data structure**:
```javascript
// Check a sample therapist
db.therapists.findOne({ _id: ObjectId("...") }, {
  "professionalInfo.qualification": 1,
  "professionalInfo.specialization": 1,
  "qualification": 1,
  "specialization": 1
})

// Result should show:
// ✅ qualification: "BPTH" or "MPTH"
// ✅ specialization: "Neurology" or "Women's Health"

// If qualification shows combined value like "BPTH - Neurology"
// Need to split it
```

#### If Data Needs Splitting
```javascript
// Script to split combined qualification/specialization
db.therapists.updateMany(
  { "professionalInfo.qualification": /\s*-\s*/ },
  [
    {
      $set: {
        "professionalInfo.qualification": {
          $arrayElemAt: [{ $split: ["$professionalInfo.qualification", " - "] }, 0]
        },
        "professionalInfo.specialization": {
          $arrayElemAt: [{ $split: ["$professionalInfo.qualification", " - "] }, 1]
        }
      }
    }
  ]
);
```

---

### PROBLEM 3: Service Types & Extra Certifications Arrays
**Risk Level**: 🟡 MEDIUM
**Impact**: Multiple values shown as single string in old dashboard
**Status**: ✅ FIXED in transformer (now correctly handles arrays)

#### Verification Required
```javascript
// Check data format
db.therapists.find({}, { 
  "professionalInfo.serviceTypes": 1,
  "professionalInfo.extraCertifications": 1 
}).limit(5)

// Should show arrays like:
// serviceTypes: ["Home Visit", "Online Consultation"]
// extraCertifications: ["Taping", "IASTM"]

// If showing as strings:
// serviceTypes: "Home Visit, Online Consultation"
// Then need to convert
```

#### Conversion Script (If Needed)
```javascript
// Convert comma-separated strings to arrays
db.therapists.updateMany(
  { "professionalInfo.serviceTypes": { $type: "string" } },
  [
    {
      $set: {
        "professionalInfo.serviceTypes": {
          $split: ["$professionalInfo.serviceTypes", ","]
        }
      }
    }
  ]
);

db.therapists.updateMany(
  { "professionalInfo.extraCertifications": { $type: "string" } },
  [
    {
      $set: {
        "professionalInfo.extraCertifications": {
          $split: ["$professionalInfo.extraCertifications", ","]
        }
      }
    }
  ]
);
```

---

## SECTION B: HIGH PRIORITY FIXES (Do This Week)

### PROBLEM 4: Establishment Data Lost
**Risk Level**: 🔴 HIGH
**Impact**: Self-employed therapists' business setup lost
**Affected Data**: isEstablishment, establishmentName, establishmentDuration

#### Check How Much Data Affected
```javascript
// Count therapists with establishment data
db.therapists.countDocuments({ "isEstablishment": true })

// If count > 0, need to decide:
// Option 1: Add back to schema (preserve data)
// Option 2: Document as deprecated (accept loss)
```

#### If Preserving (Option 1)
**Add to schema**:
```typescript
// In ariesxpert-backend/src/modules/therapists/schemas/therapist.schema.ts
@Prop({ type: Boolean, default: false })
isEstablishment: boolean;

@Prop()
establishmentName: string;

@Prop()
establishmentDuration: string;
```

**Update transformer**:
```typescript
// In therapist-transformer.ts
establishment: {
  isEstablishment: toBooleanDefaultTrue(
    getNestedValue(mongoDoc, "isEstablishment")
  ),
  establishmentName: toString(
    getNestedValue(mongoDoc, "establishmentName") ||
    getNestedValue(mongoDoc, "professionalInfo.establishmentName") ||
    ""
  ),
  establishmentDuration: toString(
    getNestedValue(mongoDoc, "establishmentDuration") ||
    getNestedValue(mongoDoc, "professionalInfo.establishmentDuration") ||
    ""
  ),
}
```

#### If Documenting as Deprecated (Option 2)
Create documentation:
```markdown
# Deprecated Fields

The following fields were removed during migration:
- isEstablishment
- establishmentName
- establishmentDuration

Reason: New system structure changed
Data: Preserved in MongoDB but not accessible via new API
Recovery: Available if needed via direct database query

Count affected: [RUN QUERY TO GET COUNT]
```

---

### PROBLEM 5: Certifications Array Structure Changed
**Risk Level**: 🟡 MEDIUM
**Impact**: Separate certification documents not accessible
**Affected Data**: `professionalInfo.certifications[]`

#### Current Issue
```typescript
// OLD STRUCTURE
professionalInfo: {
  certifications: [
    { name: "Advanced Taping.pdf", url: "..." },
    { name: "IASTM Certificate.pdf", url: "..." },
    { name: "Dry Needling.pdf", url: "..." }
  ]
}

// NEW STRUCTURE
professionalInfo: {
  documents: [
    { type: "Certificate", name: "...", url: "..." },
    // Only certain types, not flexible
  ]
}
```

#### Solution: Merge Into Documents
**Create migration**:
```javascript
// Migrate certifications to documents array
db.therapists.updateMany(
  { "professionalInfo.certifications": { $exists: true, $ne: [] } },
  [
    {
      $set: {
        documents: {
          $concatArrays: [
            { $ifNull: ["$documents", []] },
            {
              $map: {
                input: "$professionalInfo.certifications",
                as: "cert",
                in: {
                  type: "Additional Certificate",
                  name: "$$cert.name",
                  url: "$$cert.url",
                  uploadedAt: null
                }
              }
            }
          ]
        }
      }
    }
  ]
);
```

**Verify migration**:
```javascript
// Check that certifications are now in documents
db.therapists.findOne({}, { documents: 1 }).documents
// Should show objects with type: "Additional Certificate"
```

---

### PROBLEM 6: Aadhar Card - Dual Images
**Risk Level**: 🟡 MEDIUM
**Impact**: Back side of Aadhar card not stored
**Affected Data**: aadharCardBack

#### Current Issue
```typescript
// OLD
aadharCard: string;           // Front
aadharCardBack: string;       // Back (LOST)

// NEW
nationalId: {
  docUrl: string              // Only one URL
}
```

#### Solution Options

**Option A: Use Array** (Recommended)
```typescript
// Update NationalId schema
@Schema({ _id: false })
export class NationalId {
  @Prop()
  type: string;               // "aadhaar"
  
  @Prop()
  number: string;             // Aadhar number
  
  @Prop([String])
  docUrls: string[];          // Array of images
  
  @Prop()
  secondaryType: string;      // For dual IDs
  
  @Prop()
  secondaryNumber: string;
  
  @Prop([String])
  secondaryDocUrls: string[]; // Secondary doc images
}
```

**Option B: Flatten** (Simpler)
```typescript
@Prop()
aadharCardFront: string;

@Prop()
aadharCardBack: string;
```

**Recommended**: Option A (more flexible for future)

---

## SECTION C: MEDIUM PRIORITY (Do In Next Sprint)

### PROBLEM 7: Experience Unit Clarity
**Risk Level**: 🟡 MEDIUM
**Impact**: Unclear if experience is in years or months

#### Verification
```javascript
// Check sample values
db.therapists.find({}, { 
  "professionalInfo.experience": 1,
  "professionalInfo.experienceInMonth": 1 
}).limit(5)

// If shows:
// experience: "5"
// experienceInMonth: "60"
// Then: experience is in years, months is separate

// Transformer currently shows:
// experience: "5 years"
```

#### Action
**In transformer** (Currently FIXED):
```typescript
experience: formatYears(
  getNestedValue(mongoDoc, "professionalInfo.experience")
)
// Outputs: "5 years", "10+ years", etc.
```

**Decision needed**: Keep months data or convert all to years?

---

### PROBLEM 8: Country Code Preservation
**Risk Level**: 🟢 LOW
**Impact**: International phone formatting lost
**Affected Data**: countryCode

#### Options
1. **Store in User.phone**: "+91-9876543210"
2. **Add to therapist**: Keep countryCode field
3. **Accept loss**: Not critical for new system

#### Recommended
Store in User phone field directly as "+CC-PHONE":
```javascript
// Migration script
db.users.updateMany(
  { phone: { $exists: true } },
  [
    {
      $set: {
        phone: {
          $concat: ["+91-", "$phone"]  // Assuming +91 for India
        }
      }
    }
  ]
);
```

---

## SECTION D: TESTING PROCEDURE

### Test Plan: Data Mapping Validation

#### Test 1: Basic Field Extraction
```javascript
// Select a therapist with full profile
const therapist = db.therapists.findOne({
  "professionalInfo.qualification": { $exists: true },
  "professionalInfo.specialization": { $exists: true },
  "professionalInfo.license.licenseNumber": { $exists: true }
});

// Expected: All fields populated
console.log({
  qualification: therapist.professionalInfo.qualification,
  specialization: therapist.professionalInfo.specialization,
  license: therapist.professionalInfo.license.licenseNumber
});
```

#### Test 2: Array Handling
```javascript
// Check arrays extracted correctly
const therapist = db.therapists.findOne({
  "professionalInfo.serviceTypes.0": { $exists: true }
});

console.log({
  serviceTypes: Array.isArray(therapist.professionalInfo.serviceTypes),
  extraCerts: Array.isArray(therapist.professionalInfo.extraCertifications)
});
// Should both be true
```

#### Test 3: Document Transformation
```javascript
// Verify documents have type field
const therapist = db.therapists.findOne({
  "professionalInfo.license.url": { $exists: true }
});

// After transformation, should show:
console.log({
  licenseDoc: {
    type: "License/Registration",
    name: "license_certificate.pdf",
    url: "https://..."
  }
});
```

#### Test 4: Dashboard Display
```typescript
// In Next.js dev console, fetch and check:
const therapist = await fetch('/api/therapists/[id]').then(r => r.json());

console.log({
  profession: therapist.profile.professionalInfo.profession,
  qualification: therapist.profile.professionalInfo.qualification,
  specialization: therapist.profile.professionalInfo.specialization,
  licenseNumber: therapist.profile.professionalInfo.licenseNumber,
  serviceTypes: therapist.profile.professionalInfo.serviceTypes,
  documents: therapist.profile.professionalInfo.documents
});
```

---

## SECTION E: DATA VALIDATION QUERIES

### Run These Queries to Find Problem Data

```javascript
// 1. Find therapists with combined qualification/specialization
db.therapists.find({
  "professionalInfo.qualification": /\s*-\s/
}).count()

// 2. Find therapists with string serviceTypes (should be array)
db.therapists.find({
  "professionalInfo.serviceTypes": { $type: "string" }
}).count()

// 3. Find therapists with missing pincodes (old area format only)
db.therapists.find({
  "areaOfServiceInfo.areas": { $exists: true },
  "pincodes": { $exists: false }
}).count()

// 4. Find therapists with establishment data
db.therapists.find({
  "isEstablishment": true
}).count()

// 5. Find therapists with separate certifications array
db.therapists.find({
  "professionalInfo.certifications": { $exists: true, $ne: [] }
}).count()

// 6. Find therapists with dual aadhar cards
db.therapists.find({
  "aadharCardBack": { $exists: true }
}).count()

// 7. Find therapists with experience in months
db.therapists.find({
  "professionalInfo.experienceInMonth": { $exists: true }
}).count()

// 8. Find therapists with countryCode
db.therapists.find({
  "countryCode": { $exists: true }
}).count()
```

### Create Summary Report
```javascript
// Run all counts to get complete picture
const report = {
  total_therapists: db.therapists.countDocuments({}),
  with_combined_qual: db.therapists.countDocuments({ "professionalInfo.qualification": /\s*-\s/ }),
  with_string_services: db.therapists.countDocuments({ "professionalInfo.serviceTypes": { $type: "string" } }),
  with_old_areas: db.therapists.countDocuments({ "areaOfServiceInfo.areas": { $exists: true }, "pincodes": { $exists: false } }),
  with_establishment: db.therapists.countDocuments({ "isEstablishment": true }),
  with_certifications: db.therapists.countDocuments({ "professionalInfo.certifications": { $exists: true, $ne: [] } }),
  with_dual_aadhar: db.therapists.countDocuments({ "aadharCardBack": { $exists: true } }),
  with_experience_months: db.therapists.countDocuments({ "professionalInfo.experienceInMonth": { $exists: true } })
};

console.log(report);
```

---

## SECTION F: ROLLBACK PROCEDURE

### If Migration Goes Wrong

```bash
# 1. Stop application
docker stop ariesxpert-admin-dashboard
docker stop ariesxpert-backend

# 2. Restore backup
mongorestore --uri="mongodb://..." /backup/therapists_backup

# 3. Revert code
git revert [migration-commit-hash]

# 4. Rebuild and redeploy
npm run build
docker-compose up

# 5. Verify restoration
curl http://localhost:3000/api/therapists/[test-id]
```

---

## SECTION G: IMPLEMENTATION CHECKLIST

### Phase 1: Pre-Migration (Day 1-2)
- [ ] Run data validation queries (Section E)
- [ ] Generate data integrity report
- [ ] Create MongoDB backups
- [ ] Document all problem areas with counts
- [ ] Get stakeholder approval for data loss items
- [ ] Prepare rollback plan

### Phase 2: Schema Updates (Day 3-4)
- [ ] Update therapist schema if needed
- [ ] Update NationalId schema for dual docs
- [ ] Create migration scripts
- [ ] Test migrations on staging data
- [ ] Prepare all MongoDB update scripts

### Phase 3: Data Migration (Day 5-6)
- [ ] Run area to pincode migration
- [ ] Run qualification/specialization split
- [ ] Convert array strings
- [ ] Merge certifications to documents
- [ ] Verify each migration with counts
- [ ] Document any manual fixes needed

### Phase 4: Code Updates (Day 7-8)
- [ ] Update transformer extraction logic
- [ ] Update UI components if needed
- [ ] Add validation logging
- [ ] Test with sample data
- [ ] Run full build: `npm run build`

### Phase 5: Testing (Day 9-10)
- [ ] Run Test Plan (Section D)
- [ ] Check dashboard displays correctly
- [ ] Validate all document types show
- [ ] Test edge cases (missing data)
- [ ] Performance testing
- [ ] User acceptance testing

### Phase 6: Deployment (Day 11-12)
- [ ] Deploy to staging
- [ ] Run full validation suite
- [ ] Deploy to production
- [ ] Monitor error logs
- [ ] Document lessons learned

---

## SUMMARY TABLE

| Problem | Risk | Status | Action | Timeline |
|---|---|---|---|---|
| Area information | 🔴 HIGH | Not migrated | Migration script | ASAP |
| Qual/Specialization | 🟡 MED | Partially fixed | Verify data | This week |
| Service types arrays | 🟡 MED | Fixed in transformer | Convert strings | This week |
| Establishment data | 🔴 HIGH | Lost | Decide: keep/drop | This week |
| Certifications array | 🟡 MED | Lost | Merge to documents | Next sprint |
| Dual Aadhar | 🟡 MED | Partial | Schema update | Next sprint |
| Experience units | 🟡 MED | Unclear | Clarify format | Next sprint |
| Country code | 🟢 LOW | Lost | Accept/document | Post-launch |

---

## CONTACT & ESCALATION

If you encounter issues:
1. Check `COMPLETE_DATA_MAPPING_ANALYSIS.md` for detailed analysis
2. Run appropriate validation query from Section E
3. Document the issue and affected count
4. Follow rollback procedure if needed
5. Escalate to data team if migration fails

---

**Document Version**: 1.0
**Status**: Ready for Implementation
**Last Updated**: 17 Feb 2026
