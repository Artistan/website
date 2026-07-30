# Agent Guidelines Directory

> Human-readable tips and tricks for AI-assisted development: [docs/developer-guidelines/](../../docs/developer-guidelines/)

This directory contains **agent-first** guidelines for AI assistants working on the Track Core project.

---

## Naming Conventions

| Prefix | Purpose |
|---|---|
| `app-*-guidelines.md` | Application feature/system guidelines |
| `*-guidelines.md` | Process and migration guides |
| `testing-*-guidelines.md` | Testing patterns and utilities |

- Reference files from repository root: `.agents/guidelines/<filename>`
- Store images and resources in `.agents/guidelines/resources/`

---

## Configuration

- **Priority and registration**: `.agents/guidelines/config.json`
- **Agent config**: `.agents/config.json`
- After adding or updating any guideline, update `config.json` priorities.

### Priority Conventions

- Items with the **same priority number** are loaded together with equal weight; order within a priority level does not matter.
- **Priority 1**: Always-loaded essentials — core processes (Code Request) and active high-priority migration plans.
- **Priority 2–5**: Frequently referenced guidelines — entities, enums, APIs, database, availability.
- **Priority 6–12**: Domain-specific guidelines loaded contextually.
- **Priority 13+**: Supplementary or on-demand guidelines (Docker setup, examples, etc.).
- **Working spec files** (`.agents/specs/`) may be registered here when they are actively in-progress and need high visibility. Move them to a lower priority or remove them once the spec work is complete (it is then distilled to `docs/specs/<feature-name>.md`).
- Use the [_template.md](./_template.md) when creating new guidelines to ensure consistent structure.

---

## Primary Entry Points

| File | Purpose |
|---|---|
| [guidelines.md](./guidelines.md) | Main development guidelines index |
| [config.json](./config.json) | Guideline priority and registration |
