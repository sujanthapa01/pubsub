"use client";

import QuoteComponent from "../components/qoute";
import LoginButton from "@/components/login-button";

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: "#14171B" }}
    >
      {/* Background glow + subtle grain */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[160px]"
          style={{ background: "rgba(185,139,62,0.10)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(237,231,218,0.035) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <QuoteComponent />
      </div>

    
    </div>
  );
}