import { IBM_Plex_Sans } from "next/font/google";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

const items = [
  { href: "/profile", label: "Profile", icon: "👤", accent: "#B98B3E", authOnly: true },
  { href: "/write", label: "Write a Quote", icon: "✍️", accent: "#8CA179" },
  { href: "/subscribe", label: "Subscribe", icon: "⭐", accent: "#B98B3E" },
];

type MoreOptionsProps = {
  isLoggedIn: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
};

export default function MoreOptions({ isLoggedIn, onLogin, onLogout }: MoreOptionsProps) {
  return (
    <div
      className={`${bodyFont.variable} flex items-center gap-1 overflow-x-auto rounded-full p-1.5`}
      style={{
        background: "rgba(20,23,27,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(185,139,62,0.15)",
        boxShadow: "0 20px 50px -16px rgba(0,0,0,0.6)",
        fontFamily: "var(--font-body)",
      }}
    >
      {items
        .filter((item) => !item.authOnly || isLoggedIn)
        .map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm transition"
          style={{ color: "#EDE7DA" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(237,231,218,0.06)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px]"
            style={{ background: `${item.accent}1f` }}
          >
            {item.icon}
          </span>
          {item.label}
        </a>
      ))}

      <div className="mx-1 h-6 w-px shrink-0" style={{ background: "rgba(237,231,218,0.1)" }} />

      {isLoggedIn ? (
        <button
          onClick={onLogout}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm transition"
          style={{ color: "#D98A8A" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(122,46,61,0.12)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            style={{ background: "rgba(122,46,61,0.15)" }}
          >
            <GoogleIcon size={12} />
          </span>
          Logout
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="cursor-pointer font-medium flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 text-sm transition"
          style={{ color: "#1F1B16", background:"#FBF7EE" }}
        
        >
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white"
            style={{ background: "rgba(185,139,62,0.15)" }}
          >
            <GoogleIcon size={12} />
          </span>
          Login
        </button>
      )}
    </div>
  );
}

function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.97v2.33A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.97A9 9 0 0 0 0 9c0 1.45.35 2.83.97 4.03l2.98-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .97 4.97l2.98 2.33C4.66 5.17 6.65 3.58 9 3.58z"
      />
    </svg>
  );
}