"use client"

import React, { useEffect } from "react";
import { loadUser } from "@/util/load-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    loadUser();
  }, []);

  return <>{children}</>;
}
