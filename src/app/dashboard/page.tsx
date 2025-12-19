import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth-options";

import AssignmentList from "./assignments/AssignmentList";
import CreateAssignmentForm from "./assignments/CreateAssignmentForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Your Study Plan</h1>

      {/* Assignments */}
      <AssignmentList userId={session.user.id as string} />

      {/* Create new assignment */}
      <CreateAssignmentForm />
    </div>
  );
}
