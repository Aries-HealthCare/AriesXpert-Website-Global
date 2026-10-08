# PHASE 18 — MOBILE DUIX DEVICE ACCEPTANCE & RUNTIME REPORT

**Ecosystem:** AriesXpert Healthcare Multi-Platform Ecosystem  
**Target Mobile Subsystem:** AriesXpertV2 Flutter DUIX Mobile Avatar  
**Repository Paths:** `ariesxpertv2/`, `ariesxpertv2/packages/aries_duix/`  
**Release Candidate Branch:** `release-candidate-production-hardening`  
**Git Commit Hash:** `678f97c` (`ariesxpertv2`)  
**Audit Timestamp:** October 8, 2026 — 21:47:00 IST  
**Auditor:** Antigravity Autonomous Enterprise Engineering Agent  
**Certification Verdict:** **SOFTWARE VERIFIED PASS — PHYSICAL HARDWARE GATED (BLOCKED)**  

---

## 1. DEVICE LAB DISCOVERY & ENVIRONMENT AUDIT

In accordance with Phase 18 Priority 4 directives:
> *"Discover attached Android devices and available emulators. If an emulator with compatible graphics and architecture support is available, execute preliminary rendering and navigation tests. An emulator PASS must never replace required physical-device evidence. If devices are unavailable, record BLOCKED and continue all other safe verification work."*

### A. Physical Device Discovery (`adb devices -l`)
```text
$ adb devices -l
List of devices attached
(zero devices attached)
```
- **Physical Android Devices Connected:** **0**
- In compliance with the Truthful Hardware Verification Policy, hardware certification on physical Android devices is marked **BLOCKED**. Under no circumstances will software simulation be presented as physical device proof.

### B. Host System Resource Diagnostic (Emulator Constraints)
Inspection of local workstation resources:
- **Available Physical RAM:** **895.2 MB**
- **Available Local Disk Space:** **2.6 GB**
- **Available AVDs in Android SDK:** `Pixel_8_Pro`, `Pixel_9`, `Pixel_9_Pro_XL`, `Samsung_Galaxy_S24`.
- **Engineering Assessment:** Booting a modern Android 14/15 Google Play system image requires a minimum of 2.0 to 4.0 GB of unallocated RAM and 4.0 GB of disk space. Attempting to launch an emulator under current host constraints risks kernel memory thrashing and process termination. Furthermore, emulator software rendering does not validate hardware Vulkan drivers or physical microphone transducers.

### C. iOS TestFlight & Hardware Status
- **Signing Identities (`security find-identity -v -p codesigning`):** `0 valid identities found`.
- **Status:** **BLOCKED**. Distribution signing and TestFlight packaging remain gated behind installation of the enterprise Apple Developer Certificate by the release owner.

---

## 2. VERIFIED MOBILE DUIX SOFTWARE CONTRACTS

All 35 automated mobile tests executed and **PASSED (100%)**:

### A. `packages/aries_duix` Native Integration Tests (13/13 Pass)
1. `AvatarModelProfile is available with vendor Leo id`: **PASS**
2. `AvatarModelProfile is available with vendor Lily id`: **PASS**
3. `AvatarModelProfile resolveForLoad uses production profiles`: **PASS**
4. `AvatarModelProfile checksums match manifest`: **PASS**
5. `AvatarModelProfile byId resolves stable application ids`: **PASS**
6. `DuixModelValidator validates extracted audit package structure`: **PASS**
7. `DuixModelValidator missing package reports missingPackage`: **PASS**
8. `DuixModelManager modelIdForGender returns vendor id`: **PASS**
9. `DuixModelManager isDemoModelOnly is false for production profiles`: **PASS**
10. `DuixModelManager identity label includes vendor when mismatched`: **PASS**
11. `DuixViewRegistry allows only one active session`: **PASS**
12. `DuixViewRegistry higher priority can preempt`: **PASS**
13. `DuixViewRegistry release clears slot`: **PASS**

### B. Core Mobile UI & RBAC Tests (22/22 Pass)
1. `no_render_contract_test.dart`: Proves zero UI exceptions or blocking spinners on core screens when DUIX native rendering is offline. **PASS**
2. `avatar_production_certification_test.dart`: Validates avatar resolution, profile mappings, and fallback behavior. **PASS**
3. `delete_restrictions_test.dart`: Validates non-founder RBAC deletion restrictions across 7 sensitive areas. **PASS**
4. `aries_buddy_page_test.dart`: Validates buddy onboarding view mounting and interaction dispatch. **PASS**
5. `widget_test.dart`: Validates base widget architecture. **PASS**

---

## 3. PHYSICAL HARDWARE VERIFICATION CHECKLIST (19 GATES)

When an Android physical device is connected, the release engineer must execute the following 19 validation steps:

```bash
# 1. Install internal-test artifact using bundletool
java -jar /Volumes/Personal/bundletool.jar build-apks \
  --bundle=build/app/outputs/bundle/release/app-release.aab \
  --output=/Volumes/Personal/.tmp/app-release.apks \
  --ks=android/upload-keystore.jks \
  --ks-pass=file:android/key.properties \
  --ks-key-alias=upload \
  --key-pass=file:android/key.properties \
  --overwrite

java -jar /Volumes/Personal/bundletool.jar install-apks \
  --apks=/Volumes/Personal/.tmp/app-release.apks
```

| Step # | Verification Item | Target Behavior | Hardware Test Status |
|---|---|---|---|
| **1** | App Installation | Split APKs install without signature error | **GATED (Awaiting Device)** |
| **2** | Cold Launch | Splash screen to onboarding in <2.0s | **GATED (Awaiting Device)** |
| **3** | Authentication | Phone OTP login and session cache | **GATED (Awaiting Device)** |
| **4** | AI Buddy Screen | Navigate to AI Companion page | **GATED (Awaiting Device)** |
| **5** | Tanya 3D Loading | Loads canonical `Tanya.glb` (55 MB) | **GATED (Awaiting Device)** |
| **6** | Native GPU Rendering | GLES3/Vulkan surface rendering at 60 FPS | **GATED (Awaiting Device)** |
| **7** | Facial & Idle Animations | Natural breathing, blinking, and head sway | **GATED (Awaiting Device)** |
| **8** | Microphone Permission | Android runtime permission prompt & grant | **GATED (Awaiting Device)** |
| **9** | Speech Capture | Audio captured via `record` plugin | **GATED (Awaiting Device)** |
| **10** | Speech-to-Text | Real-time text tokens rendered on screen | **GATED (Awaiting Device)** |
| **11** | Backend AI Response | Gemini clinical response returned in <1.5s | **GATED (Awaiting Device)** |
| **12** | Speaker Playback | Clear audio played via device loudspeaker | **GATED (Awaiting Device)** |
| **13** | Lip Synchronization | Observable mouth visemes track audio peaks | **GATED (Awaiting Device)** |
| **14** | User Interruption | Speaking halts avatar playback immediately | **GATED (Awaiting Device)** |
| **15** | App Lifecycle | Background/foreground transitions preserve state | **GATED (Awaiting Device)** |
| **16** | Network Loss & Recovery | Offline banner shown; auto-reconnects on Wi-Fi | **GATED (Awaiting Device)** |
| **17** | Session Disposal | Exiting AI Buddy releases native GPU textures | **GATED (Awaiting Device)** |
| **18** | Memory Stability | 15-minute continuous chat; native heap <350 MB | **GATED (Awaiting Device)** |
| **19** | Evidence Collection | Capture `dumpsys meminfo` and screen recording | **GATED (Awaiting Device)** |
