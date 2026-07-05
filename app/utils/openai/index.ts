import OpenAI from "openai";
import { getChannelVideos } from "../youtube/youtube";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools: OpenAI.Responses.Tool[] = [
  {
    type: "function",
    name: "getChannelVideos",
    description:
      "Search the creator's YouTube channel for relevant videos.",
    parameters: {
      type: "object",
      properties: {
        channelName: {
          type: "string",
          enum: ["hiteshchaudhary", "piyushgarg"],
        },
        query: {
          type: "string",
          description: "Short search query",
        },
      },
      required: ["channelName", "query"],
      additionalProperties: false,
    },
    strict: true,
  },
];

export async function persona(
  channelName: string,
  tokens: string,
  systemPrompt: string
) {
  // First response
 let response = await client.responses.create({
  model: "gpt-4.1",
  instructions: systemPrompt,
  input: tokens,
  tools,
});

  console.log(response);
  

  // Execute any requested tools
  for (const item of response.output) {
    if (item.type !== "function_call") continue;
  console.log("items" , item);
  

    if (item.name === "getChannelVideos") {
      const args = JSON.parse(item.arguments);

      console.log("args" ,args);
      

      const videos = await getChannelVideos(
        channelName, // don't trust the model for this
        args.query
      );
console.log("videos" ,videos);

      // Continue the conversation
      response = await client.responses.create({
        model: "gpt-4o",
        previous_response_id: response.id,
        input: [
          {
            type: "function_call_output",
            call_id: item.call_id,
            output: JSON.stringify(videos),
          },
        ],
      });
    }
  }

  return response.output_text;
}