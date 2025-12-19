import { Assignment } from "@prisma/client";

export default function AssignmentItem({
  assignment,
}: {
  assignment: Assignment;
}) {
  return (
    <li className="border rounded-xl p-4 flex justify-between items-center">
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
          {assignment.dueDate.toLocaleDateString()}
        </p>
      </div>
    </li>
  );
}
