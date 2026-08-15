"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { useAuthStore } from "@/store/auth";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const MAX_LENGTH = 280;

export default function QuoteEditorPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ id: string } | null>(null);

  // Prefill author with the user's display name once it's available.
  useEffect(() => {
    if (user?.display_name && !author) setAuthor(user.display_name);
  }, [user, author]);

  // Guard: must be logged in and must have accepted the guidelines first.
  useEffect(() => {
    if (user === null) return; // still loading auth state
    if (!user) {
      router.replace("/guidelines");
      return;
    }
    if (!user.hasAcceptedCurrentGuidelines) {
      router.replace("/guidelines");
    }
  }, [user, router]);

  const remaining = MAX_LENGTH - text.length;
  const canSubmit =
    text.trim().length > 0 && author.trim().length > 0 && remaining >= 0;

  async function handleSubmit() {
    if (!canSubmit || !user) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/quote/write-new-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
         quote: text.trim(),
          author: author.trim() 
        }),
      });

      if (!res.ok)
        throw new Error("Couldn't submit your quote. Please try again.");

      const data = await res.json();
      setSubmitted({ id: data.id ?? data.quoteId ?? "pending" });
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <SubmittedState
        quoteId={submitted.id}
        onWriteAnother={() => {
          setText("");
          setSubmitted(null);
        }}
      />
    );
  }

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen`}
      style={{
        background: "#14171B",
        color: "#EDE7DA",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="mx-auto max-w-2xl px-6 py-20">
        {/* Header */}
        <div className="mb-10">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#B98B3E",
              background: "rgba(185,139,62,0.12)",
              border: "1px solid rgba(185,139,62,0.35)",
            }}
          >
            QUOTE EDITOR
          </span>

          <h1
            className="mt-5 text-4xl sm:text-[2.75rem]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            Write something
            <br />
            <span style={{ fontStyle: "italic", color: "#B98B3E" }}>
              worth remembering
            </span>
          </h1>
        </div>

        {/* Live preview — same "published card" styling used on the guidelines page */}
        <div
          className="mb-8 rounded-2xl p-8 sm:p-10"
          style={{
            background: "#FBF7EE",
            color: "#1F1B16",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
          }}
        >
          <p
            className="text-2xl leading-snug sm:text-[1.7rem]"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              minHeight: "3.4rem",
            }}
          >
            {text.trim() ? (
              `\u201c${text}\u201d`
            ) : (
              <span style={{ color: "#B7AF9C" }}>
                Your quote will appear here as you type…
              </span>
            )}
          </p>

          <div
            className="mt-6 flex items-center justify-between border-t pt-5"
            style={{ borderColor: "rgba(31,27,22,0.12)" }}
          >
            <span className="text-sm" style={{ color: "#6B6559" }}>
              — {author.trim() || "Your name"}, submitted to QuoteDaily
            </span>
            <span
              className="rounded-full px-3 py-1 text-[11px] tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(107,122,94,0.1)",
                color: "#6B7A5E",
                border: "1px solid rgba(107,122,94,0.3)",
              }}
            >
              PREVIEW · NOT YET SUBMITTED
            </span>
          </div>
        </div>

        {/* Form */}
        <div
          className="rounded-xl p-6 sm:p-7"
          style={{
            background: "#1B1E23",
            border: "1px solid rgba(237,231,218,0.08)",
          }}
        >
          <label
            htmlFor="quote-text"
            className="text-[11px] tracking-[0.16em]"
            style={{ fontFamily: "var(--font-mono)", color: "#B98B3E" }}
          >
            YOUR QUOTE
          </label>
          <textarea
            id="quote-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Write the quote itself, in your own words…"
            className="mt-2 w-full resize-none rounded-lg p-4 text-[15px] leading-relaxed outline-none transition"
            style={{
              background: "#14171B",
              color: "#EDE7DA",
              border: `1px solid ${remaining < 0 ? "rgba(122,46,61,0.5)" : "rgba(237,231,218,0.1)"}`,
              fontFamily: "var(--font-body)",
            }}
          />
          <div className="mt-1 flex justify-end">
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-mono)",
                color: remaining < 0 ? "#D98A8A" : "#6B6559",
              }}
            >
              {remaining} characters left
            </span>
          </div>

          <label
            htmlFor="quote-author"
            className="mt-5 block text-[11px] tracking-[0.16em]"
            style={{ fontFamily: "var(--font-mono)", color: "#B98B3E" }}
          >
            ATTRIBUTED TO
          </label>
          <input
            id="quote-author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name or pen name"
            className="mt-2 w-full rounded-lg p-3 text-[15px] outline-none transition"
            style={{
              background: "#14171B",
              color: "#EDE7DA",
              border: "1px solid rgba(237,231,218,0.1)",
              fontFamily: "var(--font-body)",
            }}
          />

          {error && (
            <p className="mt-4 text-sm" style={{ color: "#D98A8A" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="mt-6 w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: canSubmit ? "#B98B3E" : "#3A3F46",
              color: canSubmit ? "#14171B" : "#7A8088",
            }}
          >
            {submitting ? "Submitting…" : "Submit for Review →"}
          </button>
        </div>
      </div>
    </main>
  );
}

function SubmittedState({
  quoteId,
  onWriteAnother,
}: {
  quoteId: string;
  onWriteAnother: () => void;
}) {
  const router = useRouter();
  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} flex min-h-screen items-center justify-center px-6`}
      style={{
        background: "#14171B",
        color: "#EDE7DA",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 text-center sm:p-10"
        style={{
          background: "#1B1E23",
          border: "1px solid rgba(185,139,62,0.25)",
        }}
      >
        <span
          className="inline-block rounded-full px-3 py-1 text-[11px] tracking-[0.16em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "#B98B3E",
            background: "rgba(185,139,62,0.12)",
            border: "1px solid rgba(185,139,62,0.35)",
          }}
        >
          SUBMITTED
        </span>

        <h1
          className="mt-5 text-2xl"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Your quote is in review
        </h1>

        <p
          className="mt-3 text-[15px] leading-relaxed"
          style={{ color: "#9C9587" }}
        >
          We'll review it against our community guidelines. If approved, it'll
          get a Quote ID and go live.
        </p>

        <div
          className="mt-6 rounded-lg px-4 py-2 text-[11px] tracking-[0.1em]"
          style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(107,122,94,0.1)",
            color: "#8CA179",
          }}
        >
          REFERENCE · {quoteId}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onWriteAnother}
            className="w-full rounded-lg py-3 text-sm font-semibold transition"
            style={{ background: "#B98B3E", color: "#14171B" }}
          >
            Write Another Quote
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-lg py-3 text-sm font-medium transition"
            style={{
              background: "transparent",
              color: "#9C9587",
              border: "1px solid rgba(237,231,218,0.12)",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
