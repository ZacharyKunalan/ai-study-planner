"use client";

import { useState } from "react";

export default function ProgressForm({
  assignmentId,
  onSaved,
}: {
  assignmentId: string;
  onSaved?: () => void;
}) {
  const [minutes, setMinutes] = useState("");
  const [percent, setPercent] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assignmentId,
        minutesSpent: Number(minutes),
        percentDone: percent ? Number(percent) : null,
      }),
    });

    setMinutes("");
    setPercent("");
    setLoading(false);
    onSaved?.();
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        type="number"
        placeholder="Minutes spent"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        required
        className="border p-2 w-full rounded"
      />

      <input
        type="number"
        placeholder="% done (optional)"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <button
        disabled={loading}
        className="bg-black text-white px-3 py-1 rounded"
      >
        {loading ? "Saving..." : "Log progress"}
      </button>
    </form>
  );
}
