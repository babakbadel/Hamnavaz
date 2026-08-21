# Hamnavaz — Product Graph

```text
USER
  ↓
AUTH
  ↓
PROFILE
  ├── INSTRUMENTS
  └── SKILLS
       ↓
   DISCOVERY
    ├── SEARCH
    └── MATCH
         ↓
  COLLABORATION
    ├── REQUEST
    ├── MESSAGES
    └── NOTIFICATIONS

Supporting edges:
PROFILE ↔ RATINGS
PROFILE ↔ FAVORITES
INSTRUMENT ↔ SEARCH
CITY ↔ SEARCH
ONLINE_STATUS ↔ DISCOVERY
```

## Graph development rule
Every new feature should identify its nodes, edges, API endpoints, UI surface, persistence requirement, and verification test before being considered complete.
