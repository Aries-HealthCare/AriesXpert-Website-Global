# Admin Dashboard - Therapist View Quick Reference

## What's Now Visible in Admin Dashboard

### Personal Details Tab
Shows all personal information extracted from MongoDB:
- ✅ Name
- ✅ Age (calculated from DOB)
- ✅ Gender
- ✅ Date of Birth
- ✅ Email
- ✅ Phone Number
- ✅ Country Code (+91 for India)
- ✅ Full Address (assembled from components)
- ✅ Address Line 1, 2, City, State, Pincode, Country

### Professional Info Tab (NEW COMPREHENSIVE VIEW)
**Qualifications Card:**
- ✅ Profession/Role
- ✅ Qualification/Degree
- ✅ Specialization
- ✅ Experience (in years)
- ✅ License/Registration Number
- ✅ Service Types (array)
- ✅ Extra Certifications (array)

**Uploaded Documents Card** (Categorized):
- ✅ License/Registration Documents
- ✅ CV/Resume Documents
- ✅ Degree Certificate Documents
- ✅ PAN Card Documents
- ✅ Aadhaar Documents (including front & back)
- ✅ Bank Passbook Documents
- ✅ Cancelled Cheque Documents

Each document shows:
- 📄 File icon based on type
- 👁️ Preview button (for PDFs and images)
- 📥 Download button
- 🗑️ Delete button (for admin management)

**New Personal Documents Section:**
- ✅ Aadhar Number (masked)
- ✅ Aadhar Card Front (image preview)
- ✅ Aadhar Card Back (image preview)

**Approval Status Card:**
- ✅ Onboarding Status (pending/approved/rejected)
- ✅ Verification Status (Verified/Pending/Rejected)
- ✅ Approved By (admin ID)
- ✅ Approval Date/Time
- ✅ Rejection Reason (if applicable)

**Service Areas Card:**
- ✅ Service Area
- ✅ Service Pincodes (array)

**Banking Information Card:**
- ✅ Bank Name
- ✅ Account Number (masked - last 4 digits only)
- ✅ IFSC Code
- ✅ PAN Card (masked - last 4 digits only)
- ✅ UPI ID
- ✅ Account Holder Name

**Address Information Card:**
- ✅ Complete formatted address
- ✅ All address components
- ✅ Country information

## What Happens When Field is Empty

| Scenario | Display |
|----------|---------|
| Field exists in MongoDB with value | Shows the value |
| Field doesn't exist in MongoDB | Shows "N/A" |
| Field is null/undefined | Shows "N/A" |
| Field is empty string | Shows "N/A" |
| Array field is empty | Shows "N/A" or empty list |
| Document has no professional documents | Shows "No documents uploaded" |

## Data Source Strategy

The dashboard pulls data from ALL possible MongoDB field locations:

**For Single Fields:**
```
Checks in order:
1. Top-level field (e.g., "gender")
2. Nested in professionalInfo (e.g., "professionalInfo.gender")
3. Nested in personalInfo (e.g., "personalInfo.gender")
4. Nested in profile (e.g., "profile.personalDetails.gender")
→ Returns first value found, or "N/A"
```

**For Arrays (serviceTypes, extraCertifications):**
```
Checks locations:
1. professionalInfo.serviceTypes
2. serviceTypes (root)
3. services (root)
→ Returns array or empty array []
```

**For Documents:**
```
Extracts from:
- professionalInfo.license
- professionalInfo.cvResume
- professionalInfo.degreeCertificate
- bankInfo.panCard
- bankInfo.aadhaar
- aadharCard (root)
- aadharCardBack (root)
- bankInfo.bankPassbook
- bankInfo.cancelledCheque
→ Groups by type for display
```

## Important Notes

### Existing Therapists
- ✅ NO registration fees for re-verification
- ✅ Can see all their current data in admin dashboard
- ✅ Will update profile in AriesXpert app when they login
- ✅ App will show same fields for update/correction
- ✅ Documents can be re-uploaded in app if needed

### Missing Fields
- If a therapist hasn't updated certain fields yet
- They will appear as "N/A" in admin dashboard
- Therapist can fill them when logging into app
- No penalty or additional fees

### Data Integrity
- All data is read from MongoDB as-is
- No data transformation except:
  - Date formatting (DOB)
  - Number formatting (age, amounts)
  - Array flattening (service types)
  - URL validation (document URLs)
  - Field masking (sensitive info)

### Backend Support
The dashboard connects to:
- **GraphQL API** for real-time data
- **MongoDB** for persistent storage
- **S3/Cloud Storage** for document URLs
- **Auth API** for verification status

## Troubleshooting

### Field Shows "N/A" But Should Have Data

**Check:**
1. MongoDB document has the field:
   ```
   db.experts.findOne({_id: therapistId})
   // Look for: gender, dob, aadharNumber, etc.
   ```

2. Field is at correct location:
   ```
   // Top level
   {gender: "Male", ...}
   
   // Or nested
   {professionalInfo: {gender: "Male"}, ...}
   
   // Or root level with different path
   {personalInfo: {gender: "Male"}, ...}
   ```

3. Field value is not null/empty string/undefined:
   ```
   // BAD
   {gender: null}
   {gender: ""}
   {gender: undefined}
   
   // GOOD
   {gender: "Male"}
   {gender: "Female"}
   {gender: "Other"}
   ```

### Document Not Showing

**Check:**
1. Document URL exists in MongoDB:
   ```
   db.experts.findOne({
     _id: therapistId,
     "professionalInfo.license": {$exists: true}
   })
   ```

2. Document has both name and URL:
   ```
   // GOOD
   {license: {name: "license.pdf", url: "https://..."}}
   
   // BAD - missing URL
   {license: {name: "license.pdf"}}
   
   // BAD - missing name
   {license: {url: "https://..."}}
   ```

3. Document type is in mapping:
   ```
   Supported types:
   - license, cvResume, degreeCertificate
   - panCard (in bankInfo)
   - aadhaar, aadharCard, aadharCardBack
   - bankPassbook, cancelledCheque
   ```

## Next Steps

1. **For Admin/Manager:**
   - Review therapist data in dashboard
   - Contact therapists with missing critical fields
   - Plan re-verification timeline

2. **For Therapists:**
   - Login to AriesXpert app
   - Review their profile data
   - Update/correct any fields
   - Re-verify (no fees charged)
   - Upload any missing documents

3. **For System:**
   - Monitor data quality
   - Track verification completion
   - Generate reports on field completion rates

---

**Last Updated:** 17 February 2026  
**Status:** Live in Production
