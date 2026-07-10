"use client";

import { useEffect, useState } from "react";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

type TQuote = {
  author: string;
  quote: string;
};

export default function QuoteComponent() {
  const [quote, setQuote] = useState<TQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchQuote() {
      try {
        const res = await fetch("http://localhost:3000/quote/today");
        const data = await res.json();
        if (!cancelled) setQuote({ author: data.author, quote: data.quote });
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchQuote();
    return () => {
      cancelled = true;
    };
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`${display.variable} ${mono.variable} ${bodyFont.variable} relative flex w-full max-w-3xl flex-col items-center px-6`}
    >
      {/* watermark quotation mark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 select-none text-[13rem] leading-none"
        style={{ fontFamily: "var(--font-display)", color: "rgba(185,139,62,0.08)" }}
      >
        &ldquo;
      </span>

      <span
        className="relative text-[11px] tracking-[0.22em]"
        style={{ fontFamily: "var(--font-mono)", color: "#B98B3E" }}
      >
        TODAY&apos;S QUOTE · {today.toUpperCase()}
      </span>

      <div className="relative mt-10 w-full min-h-36">
        {loading && <SkeletonQuote />}

        {!loading && error && (
          <p className="text-center text-base" style={{ color: "#9C9587" }}>
            Couldn&apos;t load today&apos;s quote. Please try again shortly.
          </p>
        )}

        {!loading && !error && quote && (
          <div className="quote-reveal flex flex-col items-center gap-6">
            <p
              className="text-center text-3xl sm:text-4xl md:text-[2.75rem]"
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                lineHeight: 1.28,
                color: "#EDE7DA",
              }}
            >
              {quote.quote}
            </p>

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10" style={{ background: "rgba(185,139,62,0.4)" }} />
              <p
                className="text-sm tracking-wide"
                style={{ fontFamily: "var(--font-body)", color: "#9C9587" }}
              >
                {quote.author}
              </p>
              <span className="h-px w-10" style={{ background: "rgba(185,139,62,0.4)" }} />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .quote-reveal {
          opacity: 0;
          transform: translateY(14px);
          animation: rise 0.7s ease forwards;
        }
        @keyframes rise {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function SkeletonQuote() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="skeleton h-8 w-[85%] rounded-md" />
      <div className="skeleton h-8 w-[65%] rounded-md" />
      <div className="skeleton mt-4 h-4 w-32 rounded-md" />

      <style jsx>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            rgba(237, 231, 218, 0.04) 25%,
            rgba(237, 231, 218, 0.09) 37%,
            rgba(237, 231, 218, 0.04) 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.6s ease infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }
      `}</style>
    </div>
  );
}