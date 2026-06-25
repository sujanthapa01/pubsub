"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/auth/profile",{
            credentials: "include",
          }
         
        );

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>{user.email}</p>
    </div>
  );
}