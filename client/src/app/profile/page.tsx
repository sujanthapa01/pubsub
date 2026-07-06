"use client";

import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="animate-pulse text-lg">Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-neutral-950 p-6">
        <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-white">
            Welcome 👋
          </h1>

          <p className="mt-3 text-neutral-400">
            Sign in with Google to unlock all features.
          </p>

          <button className="mt-8 w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:bg-neutral-200">
            Continue with Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt={user.display_name}
            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <h1 className="mt-5 text-2xl font-bold text-white">
            {user.display_name}
          </h1>

          <p className="mt-1 text-neutral-400">
            {user.email}
          </p>

          <span className="mt-4 rounded-full bg-green-500/20 px-4 py-1 text-sm font-medium text-green-400">
            ● Logged In
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl bg-neutral-800 p-4">
            <p className="text-sm text-neutral-400">Name</p>
            <p className="text-white font-medium">
              {user.display_name}
            </p>
          </div>

          <div className="rounded-xl bg-neutral-800 p-4">
            <p className="text-sm text-neutral-400">Email</p>
            <p className="text-white font-medium break-all">
              {user.email}
            </p>
          </div>

          <div className="rounded-xl bg-neutral-800 p-4">
            <p className="text-sm text-neutral-400">User ID</p>
            <p className="text-white font-medium break-all">
              {user.id}
            </p>
          </div>
        </div>

        <button className="mt-8 w-full rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600">
          Logout
        </button>
      </div>
    </main>
  );
}