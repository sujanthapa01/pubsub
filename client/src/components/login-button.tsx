"use client";

export default function LoginButton() {
  function handleLogin() {
    window.location.href = "http://localhost:3000/auth/google/login";
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-black w-30 h-12 rounded-2xl"
    >
      Login
    </button>
  );
}
