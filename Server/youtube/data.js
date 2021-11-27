const axios = require('axios');
const url = "https://www.googleapis.com/youtube/v3/";
const appendKey = 'key=' + process.env.YT_API_KEY;
const db = require('../database');

const getVideoData = async (id) => {
    const videoUrl = `${url}videos?${appendKey}&type=video&part=statistics,snippet&id=${id}`;
    const data = (await axios.get(videoUrl)).data.items;

    const viewCount = data[0].statistics.viewCount;
    const upvoteCount = data[0].statistics.likeCount;

    const channelId = data[0].snippet.channelId || '';
    const channelData = (await makeChannelRequest(channelId)).data.items;

    const parseVideos = [];

    let top = 0;

    for (let i = 0; i < channelData.length; i++) {
        const dataPiece = channelData[i];
        const dataId = dataPiece.id.videoId;

        if (dataId && dataId != id) {
            parseVideos.push(dataId);
            top++;
            if (top >= 5) break;
        }
    }

    const sentiment = await getSentiment(parseVideos);
    const dislikes = (await db.getDislike(id).count) || 0;
    
    return {
        viewCount,
        upvoteCount,
        sentiment,
        dislikes
    }
}

const getSentiment = async (videoIds) => {
    let views = 0;
    let upvotes = 0;

    for (const videoId of videoIds) {
        const videoUrl = `${url}videos?${appendKey}&type=video&part=statistics&id=${videoId}`;
        const data = (await axios.get(videoUrl)).data.items;
        views += parseInt(data[0].statistics.viewCount);
        upvotes += parseInt(data[0].statistics.likeCount);
    }

    return upvotes / views;
}

const makeChannelRequest = async (channelId) => {
    const channelData = `${url}search?${appendKey}&part=snippet,id&order=date&maxResults=20&channelId=${channelId}`;
    return await axios.get(channelData);
}

module.exports = { getVideoData };