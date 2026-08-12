# Quote Submission Flow

How a quote goes from "user typing in the editor" to "sitting in the database," and what's still missing after that.

---

## 1. Frontend — `write-editor-page.tsx`

User types a quote + author, clicks **"Submit for Review."**

`handleSubmit()` fires:

```
POST http://localhost:3000/quote
Content-Type: application/json
credentials: include   // sends the auth cookie along

{ "text": "...", "author": "...", "userId": "..." }
```

- `credentials: "include"` is what makes sure the JWT cookie actually reaches the backend.
- `userId` is sent in the body, but **the backend ignores it** (see step 2) — it's effectively dead weight right now and could be removed from the frontend payload.

---

## 2. Backend receives it — `quote.controller.ts`

Runs in this order, and stops early if any step fails:

| Step | What happens | Failure result |
|---|---|---|
| `JwtGuard` | Reads the JWT from the cookie, verifies it | `401 Unauthorized` — controller code never runs |
| `CreateQuoteDto` validation | `text`: not empty, 4–280 chars. `author`: not empty, ≤80 chars | `400 Bad Request` with validation message |
| Controller body | Uses `req.user.id` from the verified JWT — **not** the `userId` in the request body | — |

**Why `req.user.id` instead of the body's `userId`:** a client could otherwise put someone *else's* id in the body and submit quotes (or accept guidelines) as another user. Never trust a client-supplied identity field — always derive "who is doing this" from the verified token.

---

## 3. `QuoteService.createQuote(userId, dto)`

```
1. Look up the user's hasAcceptedQuoteGuidelines + quoteGuidelinesVersion
2. Compare quoteGuidelinesVersion against the CURRENT version (from GuidelinesService)
3. If not accepted, or accepted an OLD version:
     → throw GuidelinesNotAcceptedError
     → controller catches it, returns 403 Forbidden
4. If accepted and current:
     → create a new Quote row:
         text, author, userId, status: "PENDING"
     → quoteCode is NOT set yet (only set on approval)
5. Return the created quote (id, text, author, status, createdAt)
```

**Why this check happens on the backend too, not just the frontend:** the editor page redirects unaccepted users back to the guidelines page — but that's just UI. Someone could skip the UI entirely and hit `POST /quote` directly (curl, Postman, browser devtools). This backend check is the actual enforcement; the frontend redirect is just a nicer UX on top of it.

---

## 4. Response back to the frontend

```json
{
  "id": "clx...",
  "text": "...",
  "author": "...",
  "status": "PENDING",
  "createdAt": "2026-08-07T..."
}
```

The editor page reads `data.id` and swaps to the **"Your quote is in review"** confirmation screen, showing that id as a reference number.

---

## 5. Where it stops — what's NOT built yet

Right now the quote just sits in the `Quote` table with `status: "PENDING"`. Nothing automatically happens after that. Still needed:

- [ ] **Moderation view** (admin-only) — list all `PENDING` quotes, approve or reject each one
- [ ] **On approval**:
  - Generate `quoteCode` (e.g. `QD-104829`)
  - Set `publishedAt`
  - Flip `status` → `APPROVED`
- [ ] **On rejection**: flip `status` → `REJECTED`, maybe store a reason
- [ ] **Connect to `DailyQuote`** — some process (cron job? manual pick?) that selects one `APPROVED` quote to become the featured quote of the day
- [ ] Notify the user their quote was approved/rejected (email? in-app?)

---

## Quick reference — file map

| File | Role |
|---|---|
| `write-editor-page.tsx` | Frontend form + submit call |
| `quote.controller.ts` | Route, guard, DTO validation |
| `quote.service.ts` | Business logic: guideline check, create quote |
| `create-quote.dto.ts` | Validation rules for `text` / `author` |
| `quote.schema.prisma.snippet` | `Quote` model + `QuoteStatus` enum |
| `guidelines.service.ts` | Source of truth for `CURRENT_GUIDELINES_VERSION` |