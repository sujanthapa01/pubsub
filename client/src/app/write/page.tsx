"use client";

import { useState } from "react";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

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

type Entry = {
  tag: string;
  accent: string;
  title: string;
  body: React.ReactNode;
};

const entries: Entry[] = [
  {
    tag: "ORIGINALITY",
    accent: "#B98B3E",
    title: "Write your own words",
    body: (
      <ul className="space-y-2">
        <li>Publish quotes you created yourself.</li>
        <li>Share your own ideas and experiences.</li>
        <li className="text-[#C98A8A]">
          Don&apos;t copy quotes from books, movies, websites, or social media.
        </li>
      </ul>
    ),
  },
  {
    tag: "RESPECT",
    accent: "#7A2E3D",
    title: "Respect every reader",
    body: (
      <ul className="space-y-2">
        <li>No hate speech or harassment.</li>
        <li>No abusive or offensive language.</li>
        <li>No discrimination or threats.</li>
      </ul>
    ),
  },
  {
    tag: "QUALITY",
    accent: "#6B7A5E",
    title: "Make it worth reading",
    body: (
      <ul className="space-y-2">
        <li>Keep quotes meaningful and easy to understand.</li>
        <li>Avoid spam, advertisements, and links.</li>
        <li>Use proper spelling and punctuation whenever possible.</li>
      </ul>
    ),
  },
  {
    tag: "OWNERSHIP",
    accent: "#B98B3E",
    title: "Your rights stay yours",
    body: (
      <p>
        You keep ownership of your original quote. By publishing it, you give
        us permission to display and share it on our platform.
      </p>
    ),
  },
];

export default function WriteGuidelinesPage() {
  const [checks, setChecks] = useState({
    original: false,
    reviewed: false,
    guidelines: false,
  });
  const [agreed, setAgreed] = useState(false);

  const allChecked = Object.values(checks).every(Boolean) && agreed;

  return (
    <main
      className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen`}
      style={{
        background: "#14171B",
        color: "#EDE7DA",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="mx-auto max-w-3xl px-6 py-20">
        {/* Header */}
        <div className="mb-14">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-medium tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#B98B3E",
              background: "rgba(185,139,62,0.12)",
              border: "1px solid rgba(185,139,62,0.35)",
            }}
          >
            QUOTE WRITER GUIDE
          </span>

          <h1
            className="mt-5 text-[2.75rem] leading-[1.08] sm:text-5xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Before you publish
            <br />
            <span style={{ fontStyle: "italic", color: "#B98B3E" }}>
              your first quote
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "#9C9587" }}>
            Help us build a community where words inspire people —
            original, thoughtful, and respectful.
          </p>
        </div>

        {/* Signature: sample published quote card */}
        <div
          className="mb-16 rounded-2xl p-8 sm:p-10"
          style={{
            background: "#FBF7EE",
            color: "#1F1B16",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
          }}
        >
          <p
            className="text-2xl leading-snug sm:text-[1.7rem]"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            &ldquo;What you make today is proof of who you&apos;re becoming.&rdquo;
          </p>

          <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: "rgba(31,27,22,0.12)" }}>
            <span className="text-sm" style={{ color: "#6B6559" }}>
              — A. Rowan, published on QuoteDaily
            </span>
            <span
              className="rounded-full px-3 py-1 text-[11px] tracking-[0.1em]"
              style={{
                fontFamily: "var(--font-mono)",
                background: "rgba(122,46,61,0.08)",
                color: "#7A2E3D",
                border: "1px solid rgba(122,46,61,0.25)",
              }}
            >
              QD-104829 · CERTIFIED
            </span>
          </div>
        </div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <section
              key={entry.tag}
              className="rounded-xl p-6 sm:p-7"
              style={{
                background: "#1B1E23",
                borderLeft: `3px solid ${entry.accent}`,
              }}
            >
              <span
                className="text-[11px] tracking-[0.16em]"
                style={{ fontFamily: "var(--font-mono)", color: entry.accent }}
              >
                {entry.tag}
              </span>
              <h2
                className="mt-2 text-xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {entry.title}
              </h2>
              <div className="mt-3 text-[15px] leading-relaxed" style={{ color: "#B9B2A3" }}>
                {entry.body}
              </div>
            </section>
          ))}

          {/* Certificate note */}
          <section
            className="rounded-xl p-6 sm:p-7"
            style={{ background: "rgba(185,139,62,0.08)", border: "1px solid rgba(185,139,62,0.25)" }}
          >
            <span
              className="text-[11px] tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "#B98B3E" }}
            >
              CERTIFICATE
            </span>
            <h2
              className="mt-2 text-xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "#EDE7DA" }}
            >
              Approved quotes get a Quote ID
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#B9B2A3" }}>
              Approved quotes may receive a unique Quote ID and publication
              certificate. This records when your quote was published on our
              platform. It is <em>not</em> an official government copyright
              registration.
            </p>
          </section>

          {/* Checklist */}
          <section
            className="rounded-xl p-6 sm:p-7"
            style={{ background: "rgba(107,122,94,0.1)", border: "1px solid rgba(107,122,94,0.3)" }}
          >
            <span
              className="text-[11px] tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "#8CA179" }}
            >
              CHECKLIST
            </span>
            <h2
              className="mt-2 text-xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "#EDE7DA" }}
            >
              Before continuing
            </h2>

            <div className="mt-5 space-y-3">
              <Checkbox
                label="My quote is original."
                checked={checks.original}
                onChange={() => setChecks((c) => ({ ...c, original: !c.original }))}
              />
              <Checkbox
                label="I understand it may be reviewed."
                checked={checks.reviewed}
                onChange={() => setChecks((c) => ({ ...c, reviewed: !c.reviewed }))}
              />
              <Checkbox
                label="I agree to follow the community guidelines."
                checked={checks.guidelines}
                onChange={() => setChecks((c) => ({ ...c, guidelines: !c.guidelines }))}
              />
            </div>

            <div
              className="mt-6 flex items-center gap-3 border-t pt-5"
              style={{ borderColor: "rgba(237,231,218,0.12)" }}
            >
              <input
                id="agree"
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed((a) => !a)}
                className="h-5 w-5 shrink-0 rounded accent-[#B98B3E]"
              />
              <label htmlFor="agree" className="text-sm" style={{ color: "#EDE7DA" }}>
                I have read and agree to the Quote Writing Guidelines.
              </label>
            </div>

            <button
              disabled={!allChecked}
              className="mt-6 w-full rounded-lg py-3 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed disabled:opacity-40"
              style={{
                background: allChecked ? "#B98B3E" : "#3A3F46",
                color: allChecked ? "#14171B" : "#7A8088",
              }}
            >
              Continue to Quote Editor →
            </button>
          </section>
        </div>

        <p className="mt-14 text-center text-sm italic" style={{ fontFamily: "var(--font-display)", color: "#6B6559" }}>
          Thank you for helping words inspire people, every day.
        </p>
      </div>
    </main>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[15px]" style={{ color: "#EDE7DA" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 rounded accent-[#8CA179]"
      />
      {label}
    </label>
  );
}