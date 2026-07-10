"use client";

import Image from "next/image";
import moreIcon from "@/assets/more-98.png";
import { useEffect, useState } from "react";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import { useAuthStore } from "@/store/auth";
import MoreOptions from "./more-option-card";

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

export default function Navbar() {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${display.variable} ${mono.variable} fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 sm:px-8`}
      style={{
        background: scrolled ? "rgba(20,23,27,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(185,139,62,0.15)" : "transparent"}`,
      }}
    >
      <div className="flex items-baseline gap-2.5">
        <span
          className="text-[10px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-mono)", color: "#B98B3E" }}
        >
          QD
        </span>
        <p
          className="hidden text-[15px] sm:block"
          style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#EDE7DA" }}
        >
          Quote of the day
        </p>
      </div>

      <div className="relative flex items-center">
        {isOpen && (
          <>
            {/* click-outside overlay, no background/border of its own */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden />

            <div
              className="dropdown-reveal-h absolute right-full z-50 mr-3 max-w-[calc(100vw-2rem)]"
              style={{ top: "50%" }}
            >
              <MoreOptions
                isLoggedIn={!!user}
                onLogin={() => {
                  window.location.href = "http://localhost:3000/auth/google/login";
                }}
                onLogout={async () => {
                  try {
                    await fetch("http://localhost:3000/auth/logout", {
                      method: "POST",
                      credentials: "include",
                    });
                  } finally {
                    window.location.href = "/";
                  }
                }}
              />
            </div>
          </>
        )}

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="More options"
          aria-expanded={isOpen}
          className="relative z-50 rounded-full p-2 transition"
          style={{
            background: isOpen ? "rgba(185,139,62,0.14)" : "transparent",
            border: `1px solid ${isOpen ? "rgba(185,139,62,0.35)" : "transparent"}`,
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.background = "rgba(237,231,218,0.06)";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.background = "transparent";
          }}
        >
          <Image src={moreIcon} alt="" width={20} height={20} style={{ opacity: 0.85 }} />
        </button>
      </div>

      <style jsx>{`
        .dropdown-reveal-h {
          opacity: 0;
          transform: translateY(-50%) translateX(8px) scale(0.96);
          animation: revealH 0.18s ease forwards;
          transform-origin: right center;
        }
        @keyframes revealH {
          to {
            opacity: 1;
            transform: translateY(-50%) translateX(0) scale(1);
          }
        }
      `}</style>
    </header>
  );
}