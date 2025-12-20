"use client";

import { useEffect, useState } from "react";

type ProgressLog = {
  id: string;
  minutesSpent: number;
  percentDone: number | null;
  date: string;
};

export default function ProgressList({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [logs, setLogs] = useState<ProgressLog[]>([]);

  useEffect(() => {
    fetch(`/api/progress?assignmentId=${assignmentId}`)
      .then((res) => res.json())
      .then(setLogs);
  }, [assignmentId]);

  if (!logs.length) {
    return <p className="text-sm text-muted-foreground">No progress yet.</p>;
  }

  return (
    <ul className="space-y-2 text-sm">
      {logs.map((log) => (
        <li key={log.id} className="border p-2 rounded">
          <div>{log.minutesSpent} minutes</div>
          {log.percentDone !== null && (
            <div>{log.percentDone}% complete</div>
          )}
          <div className="text-xs text-muted-foreground">
            {new Date(log.date).toLocaleDateString()}
          </div>
        </li>
      ))}
    </ul>
  );
}
