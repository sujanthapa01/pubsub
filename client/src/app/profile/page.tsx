"use client";

import { useAuthStore } from "@/store/auth";
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

const fontClasses = `${display.variable} ${body.variable} ${mono.variable}`;

export default function HomePage() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <main
        className={`${fontClasses} min-h-screen flex items-center justify-center`}
        style={{ background: "#14171B", color: "#EDE7DA", fontFamily: "var(--font-body)" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-transparent"
            style={{ borderTopColor: "#B98B3E", borderRightColor: "rgba(185,139,62,0.25)" }}
          />
          <p className="text-sm tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)", color: "#9C9587" }}>
            LOADING
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        className={`${fontClasses} min-h-screen flex items-center justify-center p-6`}
        style={{ background: "#14171B", fontFamily: "var(--font-body)" }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center sm:p-10"
          style={{
            background: "#1B1E23",
            border: "1px solid rgba(185,139,62,0.25)",
            boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
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
            WELCOME
          </span>

          <h1
            className="mt-5 text-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "#EDE7DA" }}
          >
            Sign in to continue
          </h1>

          <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "#9C9587" }}>
            Sign in with Google to unlock all features.
          </p>

          <button
            className="mt-8 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl py-3 font-semibold transition hover:opacity-90"
            style={{ background: "#FBF7EE", color: "#1F1B16" }}
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className={`${fontClasses} min-h-screen flex items-center justify-center p-6`}
      style={{ background: "#14171B", fontFamily: "var(--font-body)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 sm:p-10"
        style={{
          background: "#1B1E23",
          border: "1px solid rgba(237,231,218,0.08)",
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt={user.display_name}
            className="h-28 w-28 rounded-full object-cover"
            style={{ border: "3px solid #B98B3E", boxShadow: "0 8px 24px rgba(185,139,62,0.25)" }}
          />

          <h1
            className="mt-5 text-2xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: "#EDE7DA" }}
          >
            {user.display_name}
          </h1>

          <p className="mt-1 text-sm" style={{ color: "#9C9587" }}>
            {user.email}
          </p>

          <span
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1 text-[11px] tracking-[0.14em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "#8CA179",
              background: "rgba(107,122,94,0.12)",
              border: "1px solid rgba(107,122,94,0.3)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#8CA179" }} />
            LOGGED IN
          </span>
        </div>

        <div className="mt-8 space-y-3">
          <InfoRow label="NAME" value={user.display_name} accent="#B98B3E" />
          <InfoRow label="EMAIL" value={user.email} accent="#7A2E3D" mono breakAll />
          <InfoRow label="USER ID" value={user.id} accent="#8CA179" mono breakAll />
        </div>

        <button
          className="mt-8 w-full rounded-xl py-3 font-semibold transition hover:opacity-90"
          style={{ background: "rgba(122,46,61,0.15)", color: "#D98A8A", border: "1px solid rgba(122,46,61,0.4)" }}
        >
          Logout
        </button>
      </div>
    </main>
  );
}

function InfoRow({
  label,
  value,
  accent,
  mono = false,
  breakAll = false,
}: {
  label: string;
  value: string;
  accent: string;
  mono?: boolean;
  breakAll?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4"
      style={{ background: "#14171B", borderLeft: `3px solid ${accent}` }}
    >
      <p className="text-[11px] tracking-[0.14em]" style={{ fontFamily: "var(--font-mono)", color: "#6B6559" }}>
        {label}
      </p>
      <p
        className={`mt-1 font-medium ${breakAll ? "break-all" : ""}`}
        style={{
          color: "#EDE7DA",
          fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
          fontSize: mono ? "13px" : "15px",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.97v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.97A9 9 0 0 0 0 9c0 1.45.35 2.83.97 4.03l2.98-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .97 4.97l2.98 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}