# Graphify Skill

Use a Graphify-style knowledge graph workflow for this repository.

## Rules
- Extract entities and relationships from code, docs, requirements, decisions, and project history.
- Mark every relationship as `EXTRACTED` or `INFERRED`.
- Preserve source references and timestamps when available.
- Do not turn inferred relationships into facts.
- Keep graph snapshots versioned so historical state can be reconstructed.
- Prefer stable entity IDs over names.

## Core graph
`Project -> Feature -> Component -> File -> Decision -> Evidence -> Source`

## Output
When useful, maintain graph data under `graph/` and document important graph decisions in Markdown.
