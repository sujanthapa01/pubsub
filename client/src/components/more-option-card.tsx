export default function MoreOptions() {
  return (
    <div className="absolute  right-0 top-12 w-64 rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl backdrop-blur-xl">
      <ul className="flex flex-col gap-1">
        <li>
          <a
            href="/profile"
            className="block rounded-xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            👤 Profile
          </a>
        </li>

        <li>
          <a
            href="/write"
            className="block rounded-xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            ✍️ Write a Quote
          </a>
        </li>

        <li>
          <a
            href="/subscribe"
            className="block rounded-xl px-4 py-3 text-sm text-zinc-200 transition hover:bg-zinc-800"
          >
            ⭐ Subscribe
          </a>
        </li>

        <hr className="my-2 border-zinc-800" />

        <li>
          <button className="w-full rounded-xl px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10">
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}