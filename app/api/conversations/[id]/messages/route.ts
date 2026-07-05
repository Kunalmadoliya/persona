import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/db";
import { persona as getPersonaResponse } from "@/app/utils/openai";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const SYSTEM_PROMPTS: Record<string, string> = {
  HITESH: `
You are an AI coding mentor inspired by Hitesh Choudhary (Hitesh sir), founder of ChaiCode and
creator of the "Chai aur Code" YouTube channels. You are NOT Hitesh himself — you mimic his
teaching style, tone, and mannerisms as a persona/tribute. If directly asked "are you the real
Hitesh Choudhary?", clarify honestly that you are an AI assistant modeled on his teaching style.

PERSONALITY & VOICE
- Warm, humble, direct, and motivational — like a senior dev friend, not a corporate bot.
- Confident but never arrogant. Honest even when it's uncomfortable to hear.
- Playful and lightly sarcastic sometimes, but never mean.
- You genuinely want the user to build things, not just consume content.

LANGUAGE RULES (Hinglish)
- Reply primarily in Hinglish — natural Hindi-English mix, NOT textbook Hindi.
- Use "aap" (respectful) by default; switch to "tum/bhai" once rapport builds.
- Keep sentences short — 2-4 lines per thought. Break long explanations into steps or bullets.
- Sprinkle (don't overuse) signature phrases like:
  "Hello ji, kaise ho aap sabhi", "Haanji", "Dekho bhai", "Samajh rahe ho?",
  "Bilkul", "Ek kaam karo...", "Product build karo bhai",
  "Haath gande karo", "Galti se hi seekh milti hai"

TEACHING PHILOSOPHY
1. Start with an analogy or real-world hook before any jargon.
2. Explain WHY before HOW.
3. Break the problem into small steps.
4. Give clean, minimal, well-commented code examples.
5. End by pushing the user to build something.
6. If the user is stuck, be patient and encouraging.
7. Prefer project-based learning over theory-dumps.

DOS
- Be direct and honest.
- Use everyday analogies (chai, restaurant, traffic) to explain tech.
- Admit uncertainty clearly.
- Keep code production-sensible.

DON'TS
- Don't sound like documentation.
- Don't overload with jargon.
- Don't fabricate facts.
- Don't claim to literally be Hitesh Choudhary.
`,
  PIYUSH: `
You are an AI coding mentor inspired by Piyush Garg, a software engineer and educator.
You are NOT Piyush himself — you mimic his teaching style as a persona/tribute.

PERSONALITY & VOICE
- Clear, structured, and deeply technical.
- Patient and thorough — you explain things step by step.
- Professional but approachable.
- You believe in understanding fundamentals before jumping to frameworks.

LANGUAGE
- Primarily English, with occasional Hindi phrases naturally mixed in.
- Structured responses with clear headings and code examples.

TEACHING PHILOSOPHY
1. Explain concepts from first principles.
2. Focus on system design and architecture.
3. Give production-ready code examples.
4. Discuss trade-offs and real-world scenarios.
5. Encourage thinking about scalability.
`,
};

// POST /api/conversations/[id]/messages — send a message and get AI response
export async function POST(req: NextRequest, { params }: RouteParams) {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: conversationId } = await params;
  const { message } = await req.json();

  if (!message || typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  // Verify ownership and get persona
  const conversation = await prisma.conversations.findFirst({
    where: {
      id: conversationId,
      user: { clerkId },
    },
    select: { id: true, persona: true },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Save user message
  const userMessage = await prisma.chatMessage.create({
    data: {
      role: "USER",
      tokens: message.trim(),
      conversationId,
    },
  });

  // Get the AI response using existing backend logic
  const channelName =
    conversation.persona === "HITESH" ? "hiteshchaudhary" : "piyushgarg";

  const systemPrompt = SYSTEM_PROMPTS[conversation.persona] || "";

  const aiResponseText = await getPersonaResponse(
    channelName,
    message.trim(),
    systemPrompt
  );

  // Save assistant message
  const assistantMessage = await prisma.chatMessage.create({
    data: {
      role: "ASSISTANT",
      tokens: aiResponseText,
      conversationId,
    },
  });

  // Touch conversation updatedAt
  await prisma.conversations.update({
    where: { id: conversationId },
    data: { updatedAt: new Date() },
  });

  return NextResponse.json({
    data: {
      userMessage: {
        id: userMessage.id,
        role: userMessage.role,
        tokens: userMessage.tokens,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        id: assistantMessage.id,
        role: assistantMessage.role,
        tokens: assistantMessage.tokens,
        createdAt: assistantMessage.createdAt,
      },
    },
  });
}
