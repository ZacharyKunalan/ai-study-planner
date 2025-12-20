"use client";

import { useEffect, useState } from "react";

type Summary = {
  totalMinutes: number;
  latestPercent: number;
};

export default function ProgressSummary({
  assignmentId,
  refreshKey,
}: {
  assignmentId: string;
  refreshKey: number;
}) {
  const [summary, setSummary] = useState<Summary>({
    totalMinutes: 0,
    latestPercent: 0,
  });

  useEffect(() => {
    fetch(`/api/progress?assignmentId=${assignmentId}`)
      .then((res) => res.json())
      .then((logs) => {
        const totalMinutes = logs.reduce(
          (sum: number, log: any) => sum + log.minutesSpent,
          0
        );

        const latestPercent =
          logs.length > 0 ? logs[0].percentDone ?? 0 : 0;

        setSummary({ totalMinutes, latestPercent });
      });
  }, [assignmentId, refreshKey]);

  return (
    <div className="text-sm text-muted-foreground">
      <p>🕒 {summary.totalMinutes} minutes</p>
      <p>📊 {summary.latestPercent}% complete</p>
    </div>
  );
}
