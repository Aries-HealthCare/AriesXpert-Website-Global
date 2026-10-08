# AEOS AGENT TASK EXECUTION KERNEL ARCHITECTURE

**Specification:** Phase 5A Autonomous Agent Execution  
**Document Code:** `29_AGENT_EXECUTION / 01_EXECUTION_KERNEL.md`  
**System:** Aries HealthCare Ecosystem Autonomous Enterprise Operating System (AEOS)  

---

## 1. Executive Overview

The AEOS Agent Task Execution Kernel orchestrates autonomous agents across 12 healthcare operational departments (Clinical, Finance, HR, Technology, Marketing, Operations, Growth, Executive, Legal, Quality, Support, Research).

The execution kernel guarantees:
1. **Bounded Execution:** Agents operate strictly within assigned capability envelopes (`src/utils/rbac.ts`, `agentRoles.ts`).
2. **Deterministic Task Lifecycle:** Transitions through `PENDING` -> `QUEUED` -> `EXECUTING` -> `VERIFYING` -> `COMPLETED` / `FAILED`.
3. **Persisted State & Deduplication:** Stable idempotency keys prevent duplicate agent execution.
4. **Verification Gate:** Every state mutation requires an independent verification handler (`verify()`).
5. **Level-1 Self-Healing:** Autonomous retry policies with structured error telemetry and backoff.
6. **Founder Approval Gating:** Financial, clinical protocol, or production release actions require explicit human-in-the-loop sign-off.

---

## 2. Core Components

### 2.1 Execution Engine (`agent-task-execution-engine.service.ts`)
- Evaluates agent role permissions before dispatching actions.
- Delegates to registered handlers via the Handler Registry.
- Enforces verification contracts and persists audit logs.

### 2.2 Handler Registry (`agent-task-handler-registry.ts`)
- Maps action types to specialized execution and verification routines.
- Marks informational/LLM investigations as `advisoryOnly: true`.
- Requires `FounderApprovalHandler` for high-consequence mutations.

### 2.3 Execution Loop (`execution-loop.service.ts`)
- Continuously polls persisted `AITaskModel` queue (`source: "persisted"`).
- Distributes work according to priority and departmental capacity.

### 2.4 Self-Healing Subsystem (`agent-task-self-healing.service.ts`)
- Captures transient failures (rate limits, network timeouts).
- Records `selfHealingRecovery` metadata and schedules exponential backoff.

---

## 3. Security & Safety Boundaries

- **No Credential Access:** Agents cannot view, modify, or leak secrets.
- **No Direct Clinical Modification:** Clinical records require clinical staff review.
- **No Unapproved Financial Disbursements:** All payout batches above threshold require dual authorization.
