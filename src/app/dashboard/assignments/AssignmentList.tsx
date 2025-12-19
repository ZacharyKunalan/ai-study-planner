import { prisma } from "@/lib/prisma";
import AssignmentItem from "./AssignmentItem";

type Props = {
  userId: string;
};

export default async function AssignmentList({ userId }: Props) {
  const assignments = await prisma.assignment.findMany({
    where: { userId },
    orderBy: { dueDate: "asc" },
  });

  if (assignments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No assignments yet. Add your first one 👇
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {assignments.map((assignment) => (
        <AssignmentItem key={assignment.id} assignment={assignment} />
      ))}
    </ul>
  );
}
