"use client";

import { useState } from "react";

export default function CreateAssignmentForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, dueDate }),
    });

    setLoading(false);

    if (res.ok) {
      setTitle("");
      setDueDate("");
      location.reload(); // simple + valid for now
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-8">
      <h2 className="font-semibold">Add Assignment</h2>

      <input
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Assignment title"
        className="w-full border rounded p-2"
      />

      <input
        required
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded p-2"
      />

      <button
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
