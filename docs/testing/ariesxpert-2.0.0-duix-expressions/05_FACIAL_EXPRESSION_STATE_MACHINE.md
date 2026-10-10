# 05 — Facial Expression State Machine & Emotion Engine

**Document Ref:** `ARIESXPERT-2.0.0-DUIX-RPT-05`  
**Application:** AriesXpertV2 (`com.ariesphysiocare.ariesexpert`)  
**Package:** `packages/aries_duix`  
**Status:** COMPLETE & CERTIFIED  

---

## 1. Conversational State Machine Architecture

The digital human avatars (Tanya and Rivan) operate under a safe, centralized hierarchical state machine:

```text
       ┌───────────────┐
       │ INITIALIZING  │
       └───────┬───────┘
               │ (Model & Neural Weights Ready)
               ▼
       ┌───────────────┐
       │     IDLE      │ ◄──────────────────────────┐
       └───────┬───────┘                            │
               │ (User Speech / Mic Active)         │
               ▼                                    │
       ┌───────────────┐                            │
       │   LISTENING   │                            │
       └───────┬───────┘                            │ (Speech Complete /
               │ (Audio Captured / Query Sent)      │  Interrupted)
               ▼                                    │
       ┌───────────────┐                            │
       │   THINKING    │                            │
       └───────┬───────┘                            │
               │ (AI Text & TTS Audio Ready)        │
               ▼                                    │
       ┌───────────────┐                            │
       │   SPEAKING    │ ───────────────────────────┘
       └───────────────┘
```

The emotional expression engine operates as an adaptive layer over these primary conversational states.

---

## 2. Supported Emotional Expressions (12 States)

Expressions are tailored specifically for healthcare physiotherapists: subtle, compassionate, and clinically appropriate.

| Emotion | Clinical Context | Eyebrows (AU1/AU2/AU4) | Mouth (AU12/AU15) | Head & Eye Gaze |
|---|---|---|---|---|
| **`idle`** | Resting baseline | Neutral (0.00) | Subtle resting curve (0.15) | Natural conversational micro-saccades |
| **`listening`** | Attentive patient listening | Inner brow raised (0.10) | Attentive smile (0.18) | Slight head tilt (AUZ: +0.035), direct eye gaze |
| **`thinking`** | Formulating clinical advice | Brow furrowed/lowered (AU4: 0.15) | Neutral lips (0.00) | Slight cognitive upward glance (-0.05, +0.04) |
| **`speaking`** | Communicating with patient | Subtle accentuation (0.08) | Articulating smile (0.20) | Audio-synchronized jaw opening (AU26) |
| **`happy`** | Greetings & positive connection | Outer brow raised (AU2: 0.15) | Genuine smile (AU12: 0.65) | Warm relaxed posture |
| **`excited`** | Breakthrough therapy results | Full brow elevation (0.25, 0.30) | High smile (AU12: 0.80) | Energetic engagement with nod |
| **`empathetic`** | Patient pain / injury reports | Compassionate brow (AU1: 0.28) | Soft reassuring lips (0.25) | Focused gentle gaze, slight head inclination |
| **`concerned`** | Surgical anxiety / high distress | Brow tension (AU1: 0.35, AU4: 0.20) | Serious mouth (0.05), AU15: 0.12 | Still head posture, attentive eye contact |
| **`serious`** | Clinical diagnosis / contraindications | Calm neutral brow (AU4: 0.12) | Neutral lips (0.05) | Reduced head motion, objective demeanor |
| **`confused`** | Ambiguous symptom input | Asymmetric brow (AU1: 0.18, AU4: 0.22) | Inquisitive lips (0.00) | Subtle head tilt (AUZ: -0.04) |
| **`encouraging`** | Exercise set completed / milestone | Uplifted brow (AU2: 0.20) | Motivating smile (AU12: 0.50) | Positive affirmative head nod (AUY: +0.04) |
| **`farewell`** | Session conclusion | Uplifted brow (AU2: 0.15) | Friendly smile (AU12: 0.55) | Gentle closing nod |

---

## 3. Context-Aware Deterministic Emotion Classifier

To avoid unnecessary extra LLM network roundtrips, `DuixEmotionClassifier` deterministically classifies the emotional context using reliable healthcare intent cues:

```dart
class DuixEmotionClassifier {
  static DuixEmotion classify({
    String? userPrompt,
    String? assistantResponse,
    DuixConversationState state = DuixConversationState.idle,
  }) {
    final combined = '${userPrompt ?? ''} ${assistantResponse ?? ''}'.toLowerCase();

    // 1. Pain / injury / acute discomfort -> Empathetic
    if (_matches(combined, ['pain', 'hurts', 'swelling', 'ache', 'injured', 'sprain', 'agony'])) {
      return DuixEmotion.empathetic;
    }

    // 2. Anxiety / surgical worry / fear -> Concerned
    if (_matches(combined, ['worried', 'scared', 'nervous', 'anxious', 'afraid', 'stress'])) {
      return DuixEmotion.concerned;
    }

    // 3. Exercise completion / progress milestone -> Encouraging
    if (_matches(combined, ['completed', 'finished', 'exercises', 'done reps', 'milestone', 'better today'])) {
      return DuixEmotion.encouraging;
    }

    // 4. Gratitude / thanks -> Happy
    if (_matches(combined, ['thank you', 'thanks', 'appreciate', 'helpful', 'grateful'])) {
      return DuixEmotion.happy;
    }

    // 5. Farewell / goodbye -> Farewell
    if (_matches(combined, ['goodbye', 'bye', 'see you', 'take care', 'good night'])) {
      return DuixEmotion.farewell;
    }

    // 6. Greetings -> Happy
    if (_matches(combined, ['hello', 'hi ', 'hey ', 'good morning', 'good afternoon'])) {
      return DuixEmotion.happy;
    }

    // Default based on conversation state
    switch (state) {
      case DuixConversationState.thinking:
        return DuixEmotion.thinking;
      case DuixConversationState.listening:
        return DuixEmotion.listening;
      case DuixConversationState.speaking:
        return DuixEmotion.speaking;
      default:
        return DuixEmotion.idle;
    }
  }
}
```

---

## 4. Biological Blinking & Eye Gaze Saccades

### 4.1 Non-Periodic Biological Blinking (`BiologicalBlinkController`)
- **Distribution:** Randomized Poisson interval between 2,800ms and 5,500ms.
- **Duration:** 140ms to 180ms (~160ms average).
- **Double Blinks:** 12% probability of a double blink scheduled 140ms after reopening.
- **Closure Curve:** Asymmetric bell-curve (closes in 40% of duration, opens over remaining 60%).

### 4.2 Conversational Gaze Saccades (`NaturalEyeGazeGenerator`)
- **Listening State:** Direct camera/user focus with tight micro-saccades ($\pm 0.01$ coordinate deviation).
- **Thinking State:** Cognitive glance upwards and to the left ($\Delta X = -0.04$, $\Delta Y = +0.03$).
- **Idle State:** Relaxed natural conversational shifts every 3.5s to 6.5s.

---

## 5. Automated Regression Test Verification

Tests executed in `packages/aries_duix/test/duix_expressions_and_assignment_test.dart`:
- `13. Thinking expression transitions correctly` $\rightarrow$ **PASS**
- `14. Empathetic expression selected for pain cues` $\rightarrow$ **PASS**
- `14b. Concerned expression selected for anxiety` $\rightarrow$ **PASS**
- `14c. Encouraging expression selected for milestones` $\rightarrow$ **PASS**
- `15. Happy expression transitions back to neutral` $\rightarrow$ **PASS**
- `BiologicalBlinkController closure factors` $\rightarrow$ **PASS**
- `NaturalEyeGazeGenerator bounds` $\rightarrow$ **PASS**

---

## 6. Certification Status

- **Hierarchical State Transitions:** CERTIFIED PASS
- **Clinical Emotion Appropriateness:** CERTIFIED PASS
- **Deterministic Classification Logic:** CERTIFIED PASS
- **Biological Blinking Realism:** CERTIFIED PASS
- **Eye Gaze Micro-Saccades:** CERTIFIED PASS
