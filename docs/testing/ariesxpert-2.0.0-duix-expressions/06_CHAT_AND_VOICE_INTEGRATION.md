# 06 — Chat and Voice Integration Pipeline

**Document Ref:** `ARIESXPERT-2.0.0-DUIX-RPT-06`  
**Application:** AriesXpertV2 (`com.ariesphysiocare.ariesexpert`)  
**Package:** `packages/aries_duix`  
**Status:** COMPLETE & CERTIFIED  

---

## 1. End-to-End Pipeline Architecture

The integration between conversational AI, voice recording, speech synthesis, and native DUIX avatar rendering flows through a unified pipeline:

```text
               ┌───────────────────────┐
               │      USER INPUT       │
               └───┬───────────────┬───┘
                   │               │
       [Voice: 16kHz PCM]     [Text Chat]
                   ▼               ▼
           _startVoiceRecord   _sendMessage
                   │               │
     Listening State (Attentive)   Thinking State (Reflective)
                   │               │
                   ▼               ▼
            _stopVoiceRecord       AI Orchestration (BuddyProvider)
                   │               │
       Thinking State              Assistant Response & Expression
                   │               │
                   └───────┬───────┘
                           │
                           ▼
                  AIService.synthesizeBuddySpeech()
                           │
                  [16kHz Audio Base64]
                           │
                           ▼
           BuddyDuixSessionController.speakBuddyText()
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
      Native ARM64 DUIX        Fallback & Viseme Clock
      (Acoustic WeNet stream)  (33ms Synchronized Articulation)
              │                         │
              └────────────┬────────────┘
                           │ [Playback End / audioPlayEnd]
                           ▼
                 _onSpeechComplete()
                           │
                    Idle / Listening
```

---

## 2. Text Chat Workflow

1. **User Types Message:**  
   When the user submits text via `_textController`:
   - Text field clears, message scrolls into view.
   - Immediate transition to `_switchExpression('thinking')` and `_buddyDuix.beginThinking()`.
   - Ongoing speech (if any) is cancelled instantly.
2. **AI Generates Response:**  
   Backend returns clinical assistant text and optional expression hint.
3. **Synchronized Playback:**  
   - Avatar transitions to `_switchExpression('talking')`.
   - `speakBuddyText` receives the text and user prompt for context-aware emotion classification.
   - Synchronized mouth articulation begins simultaneously with audio.
4. **Natural Completion:**  
   - When audio completes, mouth closes cleanly.
   - Expression returns to classified emotional state (e.g. `happy`, `empathetic`, `encouraging`).

---

## 3. Voice Chat Workflow

1. **User Activates Microphone:**  
   In `AriesBuddyPage._startVoiceRecording()`:
   - Microphone permission verified via `Permission.microphone`.
   - Any playing speech is interrupted via `await _buddyDuix.stopSpeech()`.
   - Avatar immediately assumes attentive posture: `_buddyDuix.beginListening()` and `_switchExpression('listening')`.
   - Native audio recorder captures 16-bit 16000Hz mono PCM.
2. **User Releases Microphone:**  
   In `AriesBuddyPage._stopVoiceRecording()`:
   - Audio file is finalized (`avatar_audio.pcm`).
   - Avatar transitions immediately to `_buddyDuix.beginThinking()` and `_switchExpression('thinking')`.
3. **Synthesis & Spoken Reply:**  
   Assistant responds using speech-synchronized mouth movements.

---

## 4. Interruption & Barge-In Protocol

Healthcare users frequently interrupt or ask follow-up questions while an assistant is speaking. The barge-in engine enforces:

1. **Zero Overlap:** Audio playback stops instantly when `beginListening()` or `beginThinking()` is called.
2. **Viseme Reset:** Pending visemes are cleared, and `visemeJawOpening` is forced to `0.0`.
3. **Generation Increment:** `_speechGeneration` is incremented, discarding all delayed callbacks from prior messages.

---

## 5. Verification Matrix

| Interaction | Expected Behavioral Outcome | Verified Status |
|---|---|---|
| **Text Prompt Submission** | Switches to 'thinking' brow furrow, then articulates response | PASS |
| **Pain Report ("severe knee pain")** | Switches to 'empathetic' comforting expression during speech | PASS |
| **Exercise Completion ("finished reps")** | Switches to 'encouraging' smile with affirmative nod | PASS |
| **Voice Tap While Avatar Speaking** | Immediate barge-in cutoff, mouth closes, transitions to 'listening' | PASS |
| **Mute Assistant** | Speaks audio muted; zero fake mouth movement generated | PASS |
| **Chat Page Exit** | Disposes all timers, cancels audio controllers, releases DUIX view slot | PASS |

---

## 6. Certification Status

- **Text Chat Flow:** CERTIFIED PASS
- **Voice Chat Flow:** CERTIFIED PASS
- **Barge-In Interruption:** CERTIFIED PASS
- **Resource Cleanup on Dispose:** CERTIFIED PASS
