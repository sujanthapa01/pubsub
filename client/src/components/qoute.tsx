import { useEffect, useState } from "react";

type TQuote = {
  author: String;
  quote: String;
};

export default function QuoteComponent() {
  const [response, setResponse] = useState<TQuote | null>(null);

  async function fetchQuote() {
    const response = await fetch("http://localhost:3000/quote/today");
    const data = await response.json();

    setResponse({ author: data.quote.author, quote: data.quote.quote });
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
<div className="min-h-screen flex items-center justify-center px-6 pt-16">
      {response !== null ? (
        <div className="felx flex-col gap-2 w-[50%]">
          {" "}
          <p className="text-5xl font-light leading-relaxed tracking-tight">{response.quote}</p>{" "}
          <p  className="text-lg text-zinc-400">{response.author}</p>{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
