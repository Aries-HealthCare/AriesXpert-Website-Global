# PHASE 8C — AGENT OPERATING PROFILE API CONTRACT SPECIFICATION

**Endpoint:** `GET /api/v1/aeos/identity/employee/:agentId/profile-bundle`  
**Authentication:** Required (`Bearer <JWT>`) with valid RBAC role (`admin`, `SUPER_ADMIN`, `founder`)  

---

## 1. Response Envelope

```json
{
  "success": true,
  "data": {
    "agentId": "string",
    "employee": {},
    "operatingProfile": {
      "identity": {},
      "mission": {},
      "execution": {
        "requiredCapabilities": []
      }
    },
    "responsibilities": [],
    "recentTasks": [],
    "performance": {},
    "businessImpact": {
      "revenue": null,
      "unavailableReason": "revenue attribution source not connected"
    },
    "orgSubgraph": {}
  }
}
```

## 2. Error Contracts
- `404 Not Found` when agent ID is unmapped in the canonical registry.
- `403 Forbidden` for unauthorized roles.
