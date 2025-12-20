import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  console.log("PROGRESS GET HIT");

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const assignmentId = searchParams.get("assignmentId");

    if (!assignmentId) {
      return new NextResponse("Missing assignmentId", { status: 400 });
    }

    const logs = await prisma.progressLog.findMany({
      where: {
        assignmentId,
        userId: session.user.id,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("FETCH PROGRESS ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  console.log("PROGRESS POST HIT");

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { assignmentId, minutesSpent, percentDone } = body;

    if (!assignmentId || !minutesSpent) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const progress = await prisma.progressLog.create({
      data: {
        assignmentId,
        minutesSpent,
        percentDone,
        userId: session.user.id,
      },
    });

    return NextResponse.json(progress, { status: 201 });
  } catch (error) {
    console.error("CREATE PROGRESS ERROR:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
