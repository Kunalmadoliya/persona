import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function persona(tokens: string, systemPrompt: string) {
  try {
    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: systemPrompt,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: tokens,
            },
          ],
        },
      ],
    });

   
    console.log(response.output_text);

    return response.output_text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}