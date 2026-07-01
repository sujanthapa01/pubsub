"use client";

import QuoteComponent from "../components/qoute";
import LoginButton from "@/components/login-button";
import NavigatonBar from "@/components/navbar";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500] w-[500] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[140px]" />
      </div>

      <NavigatonBar />

      <div className="flex flex-1 items-center justify-center">
        <QuoteComponent />
      </div>
      <div className="fixed bottom-10 flex justify-end w-full px-40">
        <LoginButton />
      </div>
    </div>
  );
}
