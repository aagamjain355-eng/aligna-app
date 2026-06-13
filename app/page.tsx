"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit() {
    if (!email) {
      setErrorMsg("Please enter your email.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.from("waitlist").insert({ email, name });
    if (error) {
      if (error.code === "23505") {
        setErrorMsg("You're already on the list! 🎉");
      } else {
        setErrorMsg("Something went wrong. Try again.");
      }
      setStatus("error");
    } else {
      setStatus("done");
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Find your <span className="text-violet-500">person</span>.
        </h1>
        <p className="mt-6 text-lg text-zinc-400">
          Aligna matches student builders in Bengaluru with co-founders who share
          their ambition, commitment, and way of working — not just their swipe.
        </p>

        {status === "done" ? (
          <div className="mt-10 rounded-2xl border border-violet-500/40 bg-violet-500/10 p-6">
            <p className="text-xl font-semibold text-violet-300">You&apos;re in. 🎉</p>
            <p className="mt-2 text-zinc-400">
              We&apos;ll reach out when your first matches are ready.
            </p>
          </div>
        ) : (
          <div className="mt-10 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-50 placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
            />
            <input
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-zinc-50 placeholder-zinc-500 focus:border-violet-500 focus:outline-none"
            />
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className="rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-600 transition disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Join the waitlist"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMsg}</p>
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-zinc-600">
          For Bengaluru student builders · Free during early access
        </p>
      </div>
    </main>
  );
}