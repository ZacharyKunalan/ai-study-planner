"use client";

import { Assignment } from "@prisma/client";
import { useState } from "react";
import ProgressForm from "@/components/ProgressForm";
import ProgressSummary from "@/components/ProgressSummary";

export default function AssignmentItem({
  assignment,
}: {
  assignment: Assignment;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <li className="border rounded-xl p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{assignment.title}</h3>
          {assignment.description && (
            <p className="text-sm text-muted-foreground">
              {assignment.description}
            </p>
          )}
        </div>

        <div className="text-sm text-right">
          <p>Due</p>
          <p className="font-medium">
            {new Date(assignment.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* PROGRESS SUMMARY */}
      <ProgressSummary
        assignmentId={assignment.id}
        refreshKey={refreshKey}
      />

      {/* TOGGLE BUTTON */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          Log progress
        </button>
      )}

      {/* PROGRESS FORM */}
      {showForm && (
        <ProgressForm
          assignmentId={assignment.id}
          onSaved={() => {
            setRefreshKey((k) => k + 1);
            setShowForm(false);
          }}
        />
      )}
    </li>
  );
}
