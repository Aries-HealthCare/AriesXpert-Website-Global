# 01 — SIMULATOR ENVIRONMENT AND SETUP AUDIT

**Environment Target:** Apple iOS Simulator  
**Audit Timestamp:** 2026-10-09T16:44:00+05:30  
**Operating System:** macOS 26.6.2 (Darwin arm64)  
**Host Architecture:** Apple Silicon (Apple M-series)  

---

## 1. Device Specifications & Runtime Identifiers

| Parameter | Observed Runtime Value | Validation Status |
|---|---|---|
| **Device Model** | Apple iPhone 16 Pro | VERIFIED |
| **Simulator UDID** | `AD96EF36-D4DF-43E6-A372-E15982179942` | ACTIVE / BOOTED |
| **SimRuntime Identity** | `com.apple.CoreSimulator.SimRuntime.iOS-18-3` (iOS 18.3) | INSTALLED & RUNNING |
| **Runtime Storage Root** | `/Library/Developer/CoreSimulator/Volumes/iOS_22D8075/.../iOS 18.3.simruntime` | ACTIVE |
| **Screen Resolution** | 1206 x 2622 px (Scale Factor: 3.0x, Logical: 402 x 874 pt) | VERIFIED VIA SIMCTL |
| **Display Name** | `Internal-1` (LCD framebuffer display `C0FD0DD4-5419-4B0A-9F40-EAB7B0D61516`) | CAPTURED |

---

## 2. Flutter & Toolchain Specifications

| Toolchain Component | Version / Build Details | Status |
|---|---|---|
| **Flutter SDK** | 3.38.5 (Channel stable, revision `f6ff1529fd`) | VERIFIED |
| **Dart SDK** | 3.10.4 | VERIFIED |
| **Xcode Version** | Xcode 27.0 (Build `27A266a`) | INSTALLED |
| **CocoaPods** | 1.16.2 | VERIFIED |
| **Minimum iOS Deployment Target** | `15.0` (aligned in Podfile & Runner.xcodeproj) | COMPILED CLEANLY |
| **Build Configuration Mode** | Simulator (`--simulator --dart-define=APP_ENV=production`) | BUILT |

---

## 3. Installed Mobile Application Metadata

| Property | Value |
|---|---|
| **Application Package** | `Runner.app` |
| **iOS Bundle Identifier** | `com.aries.ariesxpertv2` |
| **Android Matching Identity** | `com.ariesphysiocare.ariesexpert` |
| **App Version** | `2.0.0` |
| **Version Code** | `33000` |
| **Installation Path** | `/Users/akshay/Library/Developer/CoreSimulator/Devices/AD96EF36-D4DF-43E6-A372-E15982179942/data/Containers/Bundle/Application/763D2DEE-2D0E-4792-ADCD-77E4B40AE526/Runner.app` |
| **Live Process ID (PID)** | `50559` |
| **Process State** | Active, foreground rendering, responsive to system signals |

---

## 4. Hardware & Capability Assessment

| Capability | Simulator Support Status | Technical Evidence / Limitation |
|---|---|---|
| **Network (HTTP/HTTPS)** | PASS | Full internet access via macOS bridge (`https://api.ariesxpert.com`) |
| **WebSockets (WSS)** | PASS | Socket.IO connects via `SocketService` |
| **Local Storage / SharedPreferences** | PASS | Read/write verified in simulator app container |
| **Push Notifications (APNS)** | SIMULATOR LIMITED | APNS requires sandbox push certificates or direct simulator payload injection via `xcrun simctl push` |
| **Camera** | SIMULATOR LIMITED | Simulated camera feed / mock camera frame in simulator |
| **Microphone / Audio Input** | SIMULATOR LIMITED | Virtual audio session without hardware input routing |
| **Native DUIX Tanya Avatar** | PASS (STUBBED FOR SIMULATOR) | `GJLocalDigitalSDK` is built for physical iOS devices (arm64 device slices only). For the iOS simulator, `DuixSessionManager` correctly invokes simulator-safe fallback and test rendering without crashing |
| **Biometrics (Face ID)** | PASS | Enrolled via `xcrun simctl biometrics` |
| **Location / Telemetry** | PASS | Geolocation simulated via CoreSimulator location engine |

---

## 5. Visual Launch Verification

Initial launch verified and captured:
- **Screenshot Evidence:** `evidence/ios_simulator_launch.png`
- **Initial Screen Rendered:** AriesXpert Dashboard with Tanya "Arena Challenge Live!" Gamification Dialog.
