import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/db";

// GET /api/conversations — list all conversations for the current user
export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const conversations = await prisma.conversations.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      persona: true,
      createdAt: true,
      updatedAt: true,
      chatMessages: {
        orderBy: { createdAt: "asc" },
        take: 1,
        select: {
          tokens: true,
          role: true,
        },
      },
    },
  });

  return NextResponse.json({ data: conversations });
}

// POST /api/conversations — create a new conversation
export async function POST(req: NextRequest) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { persona } = await req.json();

  if (!persona || !["HITESH", "PIYUSH"].includes(persona)) {
    return NextResponse.json({ error: "Invalid persona" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const conversation = await prisma.conversations.create({
    data: {
      persona,
      userId: user.id,
    },
  });

  return NextResponse.json({ data: conversation }, { status: 201 });
}
