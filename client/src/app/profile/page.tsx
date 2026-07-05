"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { user, loading } = useAuthStore();

  return (
    <div className=" text-white">
      email : {user?.email}
      name :{user?.display_name}
    </div>
  );
}
