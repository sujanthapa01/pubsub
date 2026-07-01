"use client";

import Image from "next/image";
import moreIcon from "@/assets/more-98.png";
import { useState } from "react";
import MoreOptions from "./more-option-card";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-end px-8">
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-full p-2 transition hover:bg-white/10"
        >
          <Image
            src={moreIcon}
            alt="Menu"
            width={20}
            height={20}
          />
        </button>

        {isOpen && (
        
            <MoreOptions />
          
        )}
      </div>
    </header>
  );

}
