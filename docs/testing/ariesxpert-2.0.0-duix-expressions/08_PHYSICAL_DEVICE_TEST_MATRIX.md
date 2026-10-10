# 08 — Physical Device Test Matrix & Certification Readiness

**Document Ref:** `ARIESXPERT-2.0.0-DUIX-RPT-08`  
**Application:** AriesXpertV2 (`com.ariesphysiocare.ariesexpert`)  
**Package:** `packages/aries_duix`  
**Status:** BLOCKED — PHYSICAL HARDWARE ATTACHMENT REQUIRED  

---

## 1. Physical Hardware Scope & Requirements

Guiji's native DUIX SDK requires physical ARM64 mobile hardware for real-time neural inference:
- **iOS Target:** iPhone 13 Pro or newer (A15 Bionic or later with Apple Neural Engine, Metal 3, 6GB+ RAM).
- **Android Target:** ARM64-v8a device with Vulkan / OpenGL ES 3.2 (Qualcomm Snapdragon 888 / 8 Gen 1+ or MediaTek Dimensity 9000+, 8GB+ RAM).

In strict compliance with architectural directives:
> **No physical device is currently attached to this developer test runner.**  
> Tests requiring physical hardware are marked **BLOCKED**, never simulated or falsely reported as PASS.

---

## 2. Physical Device Verification Matrix

| Test ID | Test Scenario | Expected Hardware Behavior | Current Hardware Status |
|---|---|---|---|
| **HW-01** | Native DUIX model extraction | Extracts `Lily` (Tanya) and `Leo` (Rivan) WeNet weights into app sandbox. | **BLOCKED: DEVICE REQUIRED** |
| **HW-02** | Metal / GLES3 Texture Allocation | Allocates neural face texture buffer at 30+ FPS without thermal throttling. | **BLOCKED: DEVICE REQUIRED** |
| **HW-03** | Tanya neural speech articulation | 16kHz PCM audio stream directly articulates Tanya's lips using WeNet acoustic model. | **BLOCKED: DEVICE REQUIRED** |
| **HW-04** | Rivan neural speech articulation | 16kHz PCM audio stream directly articulates Rivan's lips using WeNet acoustic model. | **BLOCKED: DEVICE REQUIRED** |
| **HW-05** | Real-time audio-to-lip latency | Lip motion onset begins within $\le 120\text{ms}$ of first audio PCM buffer ingestion. | **BLOCKED: DEVICE REQUIRED** |
| **HW-06** | Hardware interruption / barge-in | Tapping mic or typing immediately stops native audio stream and resets mouth. | **BLOCKED: DEVICE REQUIRED** |
| **HW-07** | Thermal & memory stability | 15+ continuous conversational turns maintain stable memory footprint ($\le 320\text{MB}$ RSS). | **BLOCKED: DEVICE REQUIRED** |
| **HW-08** | App backgrounding / resume | App backgrounding releases Metal/GLES context cleanly; resumes without black frame. | **BLOCKED: DEVICE REQUIRED** |

---

## 3. Physical Hardware Execution Protocol

To execute physical certification when hardware is connected:

### iOS Deployment
```bash
# 1. Connect physical iPhone via USB with Developer Mode enabled
flutter run -d <physical_iphone_udid> --profile
```

### Android Deployment
```bash
# 1. Connect physical Android phone via USB with USB Debugging enabled
flutter run -d <physical_android_serial> --profile
```

### Verification Checklist on Device:
1. Log in with a male user account $\rightarrow$ verify Tanya loads natively.
2. Log in with a female user account $\rightarrow$ verify Rivan loads natively.
3. Speak "I have knee pain" $\rightarrow$ verify empathetic facial reaction and natural speech mouth movements.
4. Interrupt the avatar while speaking $\rightarrow$ verify instant cutoff without residual mouth flutter.
