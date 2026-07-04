import { google } from 'googleapis';

// Initialize the YouTube client
const youtube = google.youtube('v3');
const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey) {
    throw new Error("Missing YOUTUBE_API_KEY in environment variables");
}

const CHANNELS: Record<string, string> = {
    hiteshchaudhary: "UCNQ6FEtztATuaVhZKCY28Yw",
    piyushgarg: "UCf9T51_FmMlfhiGpoes0yFA",
};

export async function getChannelVideos(
    channelName: string,
    query: string
) {
    const channelId = CHANNELS[channelName.toLowerCase()];

    if (!channelId) {
        throw new Error(`Unknown channel: ${channelName}`);
    }

    const response = await youtube.search.list({
        key: apiKey,
        part: ["snippet"],
        channelId,
        q: query,
        type: ["video"],
        maxResults: 5,
    });

    return (response.data.items ?? []).map((video) => ({
        title: video.snippet?.title,
        videoId: video.id?.videoId,
        thumbnailUrl:
            video.snippet?.thumbnails?.high?.url ??
            video.snippet?.thumbnails?.default?.url,
    }));
}