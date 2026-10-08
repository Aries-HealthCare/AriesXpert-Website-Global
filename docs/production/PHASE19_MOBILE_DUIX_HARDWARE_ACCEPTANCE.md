# PHASE 19 — MOBILE DUIX HARDWARE LAB & DEVICE ACCEPTANCE REPORT

**Ecosystem:** AriesXpert Healthcare Multi-Platform Ecosystem  
**Target Avatar:** AriesXpertV2 Flutter DUIX Mobile Avatar (Tanya 3D Canonical GLB)  
**Strict Avatar Scope:** ONLY AriesXpertV2 Flutter DUIX Mobile Avatar is in scope. Web avatar renderers, Admin Avatar Studio, remote GPU render server (`157.173.218.56:8080`), and HeyGem remain **DEFERRED**.  
**Audit Timestamp:** October 8, 2026 — 22:22:00 IST  
**Hardware Acceptance Verdict:** **SOFTWARE VERIFIED PASS — PHYSICAL HARDWARE BLOCKED**

---

## 1. HARDWARE DISCOVERY & LAB ENVIRONMENT STATUS

In accordance with Phase 19 Priority 1 directives:
> *"Check for connected physical devices. If available, install the approved release artifact and execute the 19-gate hardware test plan from Phase 18... Measure real performance. Do not substitute controller unit tests for hardware verification. If devices remain unavailable, mark PHYSICAL HARDWARE BLOCKED and do not claim Android public-release readiness. Keep iOS distribution separately blocked until signing, TestFlight and device verification are completed."*

### A. Physical Device Discovery
Executed `adb devices -l` across local USB buses:
```bash
adb devices -l
List of devices attached
(No devices detected)
```
- **Physical Device Count:** 0 connected devices.
- **AVD Emulation Feasibility:** The host machine currently has constrained available memory (< 900 MB free RAM), precluding the safe execution of a hardware-accelerated Android 15 Virtual Device (AVD with GLES 3.0 / Vulkan rendering) without risking kernel thrashing or out-of-memory crashes.

### B. Truthful Reporting Policy
In compliance with release integrity rules:
- An emulator or controller test must **never** be misrepresented as physical device verification.
- Because 0 physical Android devices are connected, the Physical Hardware Gate is explicitly marked **BLOCKED**.
- **Public Android store rollout cannot and will not be claimed as ready** until physical hardware execution has been validated by human test engineers.

---

## 2. AUTOMATED SOFTWARE & CONTROLLER TEST PROOF

While hardware execution is blocked on attached devices, the software logic and native DUIX companion state machine were thoroughly validated in code:

| Test Harness | Target Module | Scope | Status |
|---|---|---|---|
| `flutter test test/network_security_test.dart` | Network & Environment | Zero-cleartext, HTTPS, WSS | **6/6 PASSED** |
| `flutter test` (Main App) | Auth, Buddy, Visits, Restrictions | Roles, UI layout, routing, guards | **28/28 PASSED** |
| `flutter test test/` (`packages/aries_duix`) | DUIX Native Avatar Engine | Model validation, checksums, registry | **13/13 PASSED** |
| **Combined Software Suite** | **Mobile Architecture** | **Full Regression Matrix** | **47/47 PASSED** |

---

## 3. READY-TO-EXECUTE 19-GATE PHYSICAL HARDWARE TEST PLAN

As soon as a physical Android smartphone (e.g., Pixel 7/8/9, Samsung Galaxy S22/S23/S24, or OnePlus) is attached via USB debugging, execute the following 19 gates:

```bash
# 1. Generate split APKs from the release AAB
java -jar /Volumes/Personal/bundletool.jar build-apks \
  --bundle=ariesxpertv2/build/app/outputs/bundle/release/app-release.aab \
  --output=/tmp/app-release.apks \
  --ks=ariesxpertv2/android/upload-keystore.jks \
  --ks-key-alias=upload \
  --ks-pass=env:ANDROID_STORE_PASSWORD \
  --key-pass=env:ANDROID_KEY_PASSWORD

# 2. Install split APK set to the connected device
java -jar /Volumes/Personal/bundletool.jar install-apks \
  --apks=/tmp/app-release.apks
```

### 19-Point Device Lab Checklist:
1. **Cold Start & Splash:** Launch app from launcher icon; verify cold start latency < 2.0s without ANR.
2. **Authentication & Session:** Complete OTP login with valid phone; verify token caching in `FlutterSecureStorage`.
3. **AI Buddy Navigation:** Navigate to AI Companion screen; observe UI initialization.
4. **Tanya 3D Asset Unpacking:** Verify extraction and loading of canonical `Tanya.glb` (55 MB) from bundled assets.
5. **Native GPU Shader Compilation:** Confirm GPU surface initialization via GLES 3.0 / Vulkan without black frames.
6. **Idle Animation Loop:** Observe natural eye blinking, breathing, and subtle head sways.
7. **Microphone Permission Flow:** Tap speech button; verify standard Android 15 runtime permission prompt appears and succeeds.
8. **Real Voice Recording:** Speak test clinical query: *"I have acute lower back pain when bending."*
9. **Speech-to-Text Pipeline:** Verify real-time transcription appears accurately in chat input overlay.
10. **Backend AI Roundtrip:** Verify response latency from Gemini 2.5 Flash / core API via `https://api.ariesxpert.com`.
11. **Audio Synthesis & Playback:** Verify crisp audio output through mobile loudspeaker.
12. **Observable Lip Synchronization:** Confirm avatar mouth shapes (visemes) dynamically correspond to synthesized speech phonemes.
13. **User Interruption Handling:** Speak or tap screen while avatar is talking; verify speech stops immediately and audio buffer is flushed.
14. **App Lifecycle (Backgrounding):** Minimize app to home screen during speech; verify audio pauses and resumes cleanly on foregrounding without crashing.
15. **Network Degradation:** Toggle Airplane Mode during companion interaction; verify graceful offline error message appears.
16. **Network Reconnection:** Disable Airplane Mode; verify session auto-reconnects without app restart.
17. **Session Memory Stability:** Monitor RAM usage via Android Studio Profiler over a 10-minute continuous session; confirm resident memory remains < 380 MB.
18. **Thermal State:** Confirm no severe thermal throttling or frame rate degradation after 10 minutes of active rendering.
19. **Session Cleanup & Teardown:** Navigate back from companion screen; verify `DuixViewRegistry` releases GPU texture buffer and audio player resources completely.

---

## 4. IOS RELEASE GATE SUMMARY

- **Apple Developer Account:** Enrollment and provisioning profile verification required.
- **Signing & TestFlight:** Gated until Apple Distribution Certificate is installed on macOS keychain.
- **Real iOS Device Lab:** Requires iPhone testing on iOS 17/18.
- **Status:** **BLOCKED (INDEPENDENT RELEASE GATE)**.

---

## 5. VERDICT

| Component | Test Methodology | Verdict |
|---|---|---|
| Automated DUIX Logic | Unit & widget tests (`flutter test`) | **PASS** |
| Asset Packaging Integrity | Canonical Tanya model in bundle | **PASS** |
| Physical Android Device Testing | Requires physical USB device | **PHYSICAL HARDWARE BLOCKED** |
| iOS TestFlight & Signing | Requires Apple certificate & iOS device | **BLOCKED** |

**Final Phase 19 Device Acceptance Verdict:** **SOFTWARE PASS — HARDWARE BLOCKED**
