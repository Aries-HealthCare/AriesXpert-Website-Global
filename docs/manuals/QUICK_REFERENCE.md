# Quick Reference - Understanding Data Flow in AriesXpert Admin Dashboard

**TL;DR**: Don't copy old backend into admin project. Instead, use these docs to understand data mapping.

---

## Why NOT Copy Old Backend Folder?

| Aspect | Impact |
|---|---|
| **Project Size** | Admin dashboard stays focused (smaller git history) |
| **Dependencies** | Avoids duplication and version conflicts |
| **Clarity** | Clear separation: Backend logic vs. Frontend transformation |
| **Maintenance** | Single source of truth (ariesxpert-backend folder) |
| **Navigation** | Easier to find code (one location per concern) |

✅ **Better Approach**: Use the reference documentation you now have

---

## What You Have Now

### 📄 Reference Documents (In Admin Dashboard)
```
AriesXpert-Admin-dashboard/
├── DATA_MAPPING_REFERENCE.md          # Field-by-field mapping guide
├── MIGRATION_EXAMPLES.md              # Real MongoDB document examples
└── src/
    ├── core/transformers/
    │   ├── therapist-transformer.ts   # Extraction logic with comments
    │   └── transform-utils.ts         # Helper functions
    └── modules/therapists/
        └── components/
            └── ProfessionalInfoTab.tsx # UI display logic
```

### 📂 External References (In Other Folders)
```
ariesxpert-backend/
└── src/modules/therapists/
    ├── therapists.service.ts          # API logic
    ├── therapists.controller.ts       # Endpoints
    └── schemas/
        ├── therapist.schema.ts        # Current schema
        └── therapist_legacy.schema.ts # Legacy schema
```

---

## 3-Step Data Flow

```
MongoDB Document
        ↓
   [TRANSFORMER]
   (therapist-transformer.ts)
        ↓
   Transformed Schema
   (profile.professionalInfo)
        ↓
   [UI COMPONENT]
   (ProfessionalInfoTab.tsx)
        ↓
    Admin Dashboard Display
```

---

## Quick Links to Key Sections

### Understanding Field Extraction
👉 **File**: `DATA_MAPPING_REFERENCE.md`
- Personal Information (lines 20-45)
- Professional Information (lines 48-105)
- Documents (lines 108-155)

### Seeing Real Examples
👉 **File**: `MIGRATION_EXAMPLES.md`
- Example 1: Basic profile (lines 20-60)
- Example 2: Full new schema (lines 63-180)
- Example 3: Partially migrated (lines 183-220)

### Understanding the Code
👉 **File**: `src/core/transformers/therapist-transformer.ts`
- Lines 130-210: Personal info extraction
- Lines 165-275: Professional info extraction
- Line 276+: Document transformation

---

## How to Verify Data is Correct

### Step 1: Check MongoDB
```javascript
// Open MongoDB Compass or mongosh
db.therapists.findOne({ _id: ObjectId("your_id") })

// Check if fields exist:
// ✓ professionalInfo.qualification
// ✓ professionalInfo.specialization (not extraCertifications!)
// ✓ professionalInfo.license.licenseNumber (not license.name!)
```

### Step 2: Check Transformer
```typescript
// In therapist-transformer.ts around line 260
// Verify extraction logic checks multiple paths for each field
qualification: toString(
  getNestedValue(mongoDoc, "professionalInfo.qualification") ||
  getNestedValue(mongoDoc, "qualification") ||
  getNestedValue(mongoDoc, "professionalInfo.degree") ||
  ""
)
```

### Step 3: Check UI
```typescript
// In ProfessionalInfoTab.tsx
// Verify component displays the field
<InfoRow label="Qualification" value={profInfo.qualification || 'N/A'} />
```

---

## Common Questions Answered

**Q: Where is the API that fetches therapist data?**
A: Backend at `ariesxpert-backend/src/modules/therapists/therapists.service.ts`. Frontend fetches at `/api/therapists/:id` and the response is automatically transformed.

**Q: How does migration work?**
A: Transformer checks multiple field paths (old → new). If old data still exists at `profession` or `specialization`, it will be found via fallback paths.

**Q: What if a field doesn't exist in MongoDB?**
A: Transformer returns empty string `""` or empty array `[]`, and UI displays `"N/A"`.

**Q: Should I modify the transformer?**
A: Yes! When you find new fields to extract, add them to the transformer with multi-path fallbacks for robustness.

**Q: How do I add a new field to the dashboard?**
A: 
1. Identify the MongoDB field path
2. Add to transformer (with fallbacks)
3. Add to UI component
4. Build and test: `npm run build`

---

## Field Extraction Best Practices

### Always Use Multi-Path Extraction
```typescript
// ❌ DON'T - Single path, fragile
qualification: getNestedValue(mongoDoc, "professionalInfo.qualification")

// ✅ DO - Multiple paths, robust
qualification: toString(
  getNestedValue(mongoDoc, "professionalInfo.qualification") ||
  getNestedValue(mongoDoc, "qualification") ||
  getNestedValue(mongoDoc, "professionalInfo.degree") ||
  ""
)
```

### Always Provide Defaults
```typescript
// ❌ DON'T - Can cause errors if missing
experience: mongoDoc.experience

// ✅ DO - Safe with default
experience: toString(
  getNestedValue(mongoDoc, "professionalInfo.experience") ||
  getNestedValue(mongoDoc, "experience") ||
  ""
)
```

### Use Helper Functions
```typescript
// Use these from transform-utils.ts:
toString()              // Convert to string safely
toNumber()              // Convert to number safely
joinArray()             // Join array to string
formatYears()           // Format "8" → "8 years"
validateUrl()           // Validate and return URL
getAgeFromDob()         // Calculate age from birth date
```

---

## Testing Changes

After modifying transformer or component:

```bash
# Build (checks TypeScript)
npm run build

# Should see:
# ✓ Compiled successfully in ~6 seconds
# ✓ Generating static pages (88/88)

# No errors should appear
```

---

## Document Types Currently Supported

| Type | MongoDB Path | UI Display |
|---|---|---|
| License/Registration | `professionalInfo.license` | ✅ With preview |
| Degree Certificate | `professionalInfo.degreeCertificate` | ✅ With preview |
| CV/Resume | `professionalInfo.cvResume` | ✅ With preview |
| PAN Card | `bankInfo.panCard` | ✅ With preview |
| Aadhaar | `bankInfo.aadhaar` | ✅ With preview |
| Bank Passbook | `bankInfo.bankPassbook` | ✅ With preview |
| Cancelled Cheque | `bankInfo.cancelledCheque` | ✅ With preview |

**File Type Support**:
- ✅ PDF (embedded viewer)
- ✅ Images (JPG, PNG, GIF, WebP)
- ✅ Documents (DOC, DOCX)
- ✅ All other types (download only)

---

## Current Status ✅

| Component | Status | Last Update |
|---|---|---|
| Qualification extraction | ✅ Fixed | This session |
| Specialization extraction | ✅ Fixed | This session |
| License/Registration display | ✅ Fixed | This session |
| Extra certifications field | ✅ Added | This session |
| Document type headers | ✅ Added | This session |
| File preview support | ✅ Enhanced | This session |
| Gender & DOB display | ✅ Fixed | Previous session |
| Service types display | ✅ Working | Previous session |

---

## Quick Debugging Checklist

When data doesn't show up in dashboard:

1. **Check MongoDB**
   ```javascript
   db.therapists.findOne() // Do the fields exist?
   ```

2. **Check Transformer**
   - Is the extraction logic correct?
   - Does it check multiple paths?
   - Is the field added to return object?

3. **Check Component**
   - Is the field in the interface?
   - Is it displayed in JSX?
   - Is there a null check (`|| 'N/A'`)?

4. **Build & Test**
   ```bash
   npm run build  # Any TypeScript errors?
   ```

5. **Check Browser Console**
   - Any JavaScript errors?
   - Check Network tab for API response

---

## Going Further

For deeper understanding, read in this order:

1. **START HERE**: `DATA_MAPPING_REFERENCE.md` - Understand field mapping
2. **THEN**: `MIGRATION_EXAMPLES.md` - See real MongoDB documents
3. **THEN**: Read transformer code with comments
4. **FINALLY**: Check backend schema files for field definitions

---

## Key Takeaway

✅ **You don't need the old backend in this project**
- Reference docs explain everything
- Transformer handles both old and new data
- Clear separation of concerns
- Easier to maintain and debug

Instead of copying code around:
- Use these docs as your reference
- The ariesxpert-backend folder is always available
- Focus on understanding the transformation logic
- Write clear code with multi-path fallbacks

---

## Questions?

If a field isn't showing:
1. Find it in `DATA_MAPPING_REFERENCE.md` (field table)
2. Check the MongoDB path listed
3. Verify extraction in `therapist-transformer.ts`
4. Confirm display in `ProfessionalInfoTab.tsx`

The answer is always in the documentation or the code with comments. 📚
