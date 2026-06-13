export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          Find your <span className="text-violet-500">person</span>.
        </h1>
        <p className="mt-6 text-lg text-zinc-400">
          Aligna matches student builders in Bengaluru with co-founders who share
          their ambition, commitment, and way of working — not just their swipe.
        </p>
        <button className="mt-10 rounded-xl bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-600 transition">
          Join the waitlist
        </button>
      </div>
    </main>
  );
}