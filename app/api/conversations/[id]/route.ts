import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/conversations/[id] — fetch a single conversation with all messages
export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const conversation = await prisma.conversations.findFirst({
    where: {
      id,
      user: { clerkId },
    },
    select: {
      id: true,
      persona: true,
      createdAt: true,
      updatedAt: true,
      chatMessages: {
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          role: true,
          tokens: true,
          createdAt: true,
        },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: conversation });
}

// DELETE /api/conversations/[id] — delete a conversation
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership
  const conversation = await prisma.conversations.findFirst({
    where: {
      id,
      user: { clerkId },
    },
    select: { id: true },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.conversations.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
