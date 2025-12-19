import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // 1. Get session
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Parse body (App Router way)
    const body = await req.json();
    const { title, description, dueDate } = body;

    if (!title || !dueDate) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // 3. Create assignment
    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        userId: session.user.id,
      },
    });

    return NextResponse.json(assignment, { status: 201 });
  } catch (error) {
    console.error("CREATE ASSIGNMENT ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
