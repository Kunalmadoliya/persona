import OpenAI from "openai";

const client = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
    
});

const tools = [
  {
    type: "function",
    name: "get_horoscope",
    description: "Get today's horoscope for an astrological sign.",
    parameters: {
      type: "object",
      properties: {
        sign: {
          type: "string",
          description: "An astrological sign like Taurus or Aquarius",
        },
      },
      required: ["sign"],
      additionalProperties: false,
    },
    strict: true,
  },
];

async function getYoutubeContent(){
    try{
        

    }catch(error){
        console.log(error)
    }
}