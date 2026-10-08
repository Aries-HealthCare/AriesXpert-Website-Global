# PHASE 20 — MOBILE DUIX PHYSICAL HARDWARE ACCEPTANCE AUDIT

**Execution Timestamp:** 2026-10-08T22:57:00+05:30  
**Target Subsystem:** AriesXpertV2 Flutter DUIX Mobile Avatar (`packages/aries_duix`)  
**Classification:** P1 Device Execution & Native Hardware Gate  
**Status:** **PHYSICAL HARDWARE BLOCKED (NO USB/WIFI DEVICE ATTACHED)**

---

## 1. STRICT AVATAR SCOPE REMINDER

In accordance with Phase 20 specifications:
- **ONLY** the `ariesxpertv2` Flutter DUIX mobile avatar (`packages/aries_duix`) with local on-device neural rendering engine (`libduix.so`) and voice interaction pipeline is evaluated.
- **The following remain strictly EXCLUDED and DEFERRED:**
  1. Admin Avatar Studio (`AriesXpert-Admin-Dashboard`)
  2. Web avatar renderers (`AriesXpert-Web-App` Three.js/WebGL avatars)
  3. Remote GPU avatar streaming server (`157.173.218.56:8080`)
  4. HeyGem generative digital-human pipelines

---

## 2. HARDWARE ATTACHMENT AUDIT

A hardware enumeration was executed via the Android Debug Bridge (`adb`):

```bash
adb devices -l
```

### Result:
```
List of devices attached

```
- **Attached Physical Devices:** `0`
- **Attached Emulators:** `0`
- **Hardware Status:** **PHYSICAL HARDWARE BLOCKED**

### Strict Compliance Stance:
In previous iterations, automated unit test results or headless Gradle completions were sometimes conflated with physical device execution. In Phase 20, we strictly declare: **Zero physical devices are currently connected to this test runner. Therefore, physical hardware acceptance cannot and will not be marked as PASS.**

Unit-test success (34/34 passing in `ariesxpertv2`) confirms software logic integrity, but physical hardware metrics (microphone gain, thermal throttling, real OpenGL ES 3.0 frame presentation, and native lip-sync fidelity) remain gated on an attached physical handset.

---

## 3. UNIT TEST & STATIC ARCHITECTURE PROOF

While physical execution is blocked awaiting device connection, the mobile avatar software layer was validated through automated tests:

### 3.1 Automated Tests Passing
- `packages/aries_duix`: Native library loading fallbacks and model path resolvers compile cleanly.
- `ariesxpertv2/test/environment_isolation_test.dart`: Avatar API routing respects `Environment.apiBaseUrl` and connects to `wss://api.ariesxpert.com` in production or `wss://staging-api.ariesxpert.com` in staging.
- Total passing tests: **34/34**.

### 3.2 Native Library Architecture Audit
Extracted from compiled release splits:
- `lib/arm64-v8a/libduix.so` (Present; compiled for 64-bit ARM architecture)
- Native model assets: `assets/duix/` packaged in assets bundle.

---

## 4. PHYSICAL DEVICE HARDWARE ACCEPTANCE PROTOCOL

When an authorized QA engineer or Release Officer connects a certified physical Android handset (e.g., Google Pixel 7/8/9 or Samsung Galaxy S23/S24 with Android 14/15), the following 8-gate hardware checklist must be executed against the release artifact (`app-release.aab` or extracted APKS):

```bash
# Install to connected device:
bundletool install-apks --apks=/tmp/phase20-app-release.apks
```

### 4.1 Physical Execution Checklist

| Gate # | Hardware Subsystem | Verification Criterion | Expected Observation | Acceptance Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **G-1** | **Tanya Model Loading** | Cold start of avatar consult screen | Neural model loads into GPU memory within 2.5 seconds | Load Time < 2500ms; No GL errors |
| **G-2** | **OpenGL ES Presentation** | Surface rendering & frame rate | Steady 30+ FPS rendering of Tanya face mesh | FPS >= 30, Zero frame drops > 3 |
| **G-3** | **Microphone Capture** | Hardware audio input via `record` plugin | Speech captured at 16kHz PCM with noise suppression | Audio spectrum clearly shows user speech |
| **G-4** | **AI Response Pipeline** | STT -> Telehealth Backend -> LLM | Streaming token response arrives via WebSocket | Time-To-First-Token < 1200ms |
| **G-5** | **Audio Synthesis (TTS)** | Device audio speaker output | Clear, natural speech playback without clipping | SNR > 25dB, No audio crackling |
| **G-6** | **Lip Synchronization** | Viseme mapping to speech phonemes | Mouth shapes match spoken syllables accurately | Viseme-audio offset < 80ms |
| **G-7** | **Native Lifecycle Recovery** | App minimized / Incoming phone call | Audio pauses, GL context suspends, resumes cleanly upon return | Zero native crashes (`SIGSEGV`/`SIGBUS`) |
| **G-8** | **Thermal & Memory** | 10-minute continuous consultation | RAM usage stable (< 450 MB); battery temperature < 42°C | No thermal throttling or OOM kills |

---

## 5. iOS TESTFLIGHT STATUS

In accordance with ecosystem guidelines:
- iOS release builds undergo independent codesigning via Apple Developer provisioning profiles.
- Target: TestFlight Internal Testing track.
- Status: Independent pipeline gate; Android release candidate progress does not bypass iOS TestFlight certification.

---

## 6. STATUS VERDICT

- **Software Compilation:** **PASS** (Compiled cleanly into `app-release.aab`)
- **Native Integration:** **PASS** (arm64-v8a binaries verified in split APKs)
- **Physical Device Execution:** **BLOCKED** (Requires physical USB connection)
