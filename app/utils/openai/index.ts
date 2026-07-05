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


  //this loop will return the video if necessary ai will automatically configure it out 
  // if necesaary then it will recommend the videos if not the it will give the simeple output

  for (const item of response.output) {

    if (item.type !== "function_call") continue

    if (item.name === "getChannelVideos") {
      const args = JSON.parse(item.arguments);

      const videos = await getChannelVideos(channelName, args.query)
      //AI tool ka output dekhkar khud decide karta hai ki video recommend karni hai ya nahi.
      response = await client.responses.create({
        model: "gpt-4o",
        previous_response_id: response.id,
        input: [{
          type: "function_call_output",
          call_id: item.call_id,
          output: JSON.stringify(videos)
        }]
      })



    }
  }

  return response.output_text;
}