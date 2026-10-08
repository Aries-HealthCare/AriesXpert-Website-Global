# PHASE 18 — MOBILE ASSET DELIVERY ARCHITECTURAL DECISION

**Ecosystem:** AriesXpert Healthcare Multi-Platform Ecosystem  
**Target Mobile Subsystem:** AriesXpertV2 Digital Human Avatar Delivery  
**Release Candidate Branch:** `release-candidate-production-hardening`  
**Git Commit Hash:** `678f97c` (`ariesxpertv2`)  
**Audit Timestamp:** October 8, 2026 — 21:48:00 IST  
**Auditor:** Antigravity Autonomous Enterprise Engineering Agent  
**Architectural Verdict:** **RETAIN CURRENT BUNDLED ARCHITECTURE (ZERO BENEFIT TO PAD REFRACTORING)**  

---

## 1. EVALUATION OF MOBILE ASSET DELIVERY STRATEGIES

In accordance with Phase 18 Priority 3 directives:
> *"Do not introduce Google Play Asset Delivery unless it provides a demonstrable benefit and preserves mobile DUIX reliability. If PAD is evaluated, compare: 1. Current bundled model. 2. Install-time delivery. 3. Fast-follow delivery. 4. On-demand delivery. Calculate actual initial download, total bytes transferred, offline behavior, update behavior, and runtime availability. Remember that install-time asset packs are included with initial installation. Maintain the canonical Tanya model and native dependencies."*

To evaluate whether refactoring `assets/3D AVATAR/Tanya/Tanya.glb` (54.96 MB) into Google Play Asset Delivery (PAD) is warranted, we conducted a rigorous comparative analysis across all four distribution modes:

| Dimension | Strategy 1: Current Bundled Model | Strategy 2: PAD Install-Time Delivery | Strategy 3: PAD Fast-Follow Delivery | Strategy 4: PAD On-Demand Delivery |
|---|---|---|---|---|
| **Base APK Size** | **81.74 MB** | ~26.78 MB | ~26.78 MB | ~26.78 MB |
| **Initial Download Size (arm64)** | **160.99 MB** | **160.99 MB** (Base + Arm64 + Pack) | ~106.03 MB (Base + Arm64) | ~106.03 MB (Base + Arm64) |
| **Total Install Bytes Transferred** | **160.99 MB** | **160.99 MB** (Mathematically Identical) | 160.99 MB (Post-install sync) | 106 MB initial + 55 MB on tap |
| **Offline First Launch Behavior** | **100% Functional** (Avatar renders immediately) | **100% Functional** (Pack included at install) | **DEGRADED** (Avatar missing if launched offline) | **DEGRADED** (Avatar cannot load offline) |
| **Play Console Size Compliance** | **COMPLIANT** (<200 MB App Bundle Limit) | **COMPLIANT** (<200 MB Base Limit) | **COMPLIANT** (<200 MB Base Limit) | **COMPLIANT** (<200 MB Base Limit) |
| **Update Delta Efficiency** | **High** (Google Play bsdiff patches only changed bytes) | **High** (Asset packs updated independently) | **High** | **High** |
| **Runtime Failure Modes** | **Zero Network Risk** (Local filesystem asset) | Low (Requires Play Core AssetPackManager API) | **High** (Download stalls on cellular/low data) | **High** (Network timeout when user taps Buddy) |
| **Implementation Complexity** | **Zero** (Standard Flutter AssetPipeline) | High (Separate Gradle module, Play Core SDK) | High | Extreme (Requires download UI & error retry) |
| **Simulator / Sideload Support** | **Full** (Standard APK & test harness support) | Broken without bundletool APK set generation | Broken | Broken |

---

## 2. KEY ARCHITECTURAL FINDINGS

### A. The "Install-Time" Equivalence Reality
A common misconception in mobile engineering is that moving an asset into an `install-time` asset pack reduces the user's initial download size.
- **The Reality:** Google Play downloads all `install-time` asset packs **during the initial installation** before the app is opened.
- Therefore, the user downloads `81.74 MB (base) + 79.25 MB (native) + 54.96 MB (pack) = 160.99 MB`.
- The user transfers the exact same **160.99 MB** over the network regardless of whether `Tanya.glb` is bundled in the base module or in an install-time asset pack.

### B. Clinical & Reliability Risks of Fast-Follow and On-Demand
For a healthcare application delivering telehealth consultations and distress management:
- An offline patient in a rural or clinical setting with poor connectivity must never be greeted by a spinning wheel or broken avatar when seeking AI assistance.
- Fast-follow and on-demand delivery introduce a critical dependency on Google Play Services background download workers. If the download stalls, the companion avatar fails to load.

### C. Compliance with Modern Google Play Limits
As confirmed in Phase 18 Priority 2, Google Play's modern compressed download limit for Android App Bundles is **200 MB**.
- At **160.99 MB**, the current AriesXpertV2 arm64 delivery package is **39 MB below Google Play's ceiling**.
- There is no technical or policy requirement from Google Play forcing PAD adoption.

---

## 3. ARCHITECTURAL DECISION & COMMITMENT

### Final Decision: RETAIN CURRENT BUNDLED ARCHITECTURE
1. **Preserve Canonical Assets:** Retain `assets/3D AVATAR/Tanya/Tanya.glb` (54.96 MB) and native DUIX libraries (`libgjduix.so`, `libonnxruntime.so`, `libncnn.so`) bundled in the primary application.
2. **Reject Unnecessary PAD Refactoring:** Reject introducing Google Play Asset Delivery modules for Phase 18 production release.
3. **Guaranteed Offline Reliability:** Guarantee that every installed instance of AriesXpertV2 possesses 100% offline companion avatar rendering capability without network delays.
4. **Honest Avatar Contract:** Never silently substitute a 2D simulated fallback for the promised native 3D avatar when hardware capabilities are present.
