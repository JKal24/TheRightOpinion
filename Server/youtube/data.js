const axios = require('axios');
const url = "https://www.googleapis.com/youtube/v3/";
const appendKey = 'key=' + process.env.YT_API_KEY;
const db = require('../database');

const getVideos = async (query) => {
    const testUrl = `${url}search?part=snippet&q=${query}&max-results=5&${appendKey}`;
    const data = (await axios.get(testUrl)).data.items;

    const videos = [];

    for (let i = 0; i < data.length; i++) {
        const video = data[i];

        videos.push({
            id: video.id.videoId,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnails: video.snippet.thumbnails.default.url,
            author: video.snippet.channelTitle
        })
    }

    return videos;
}

const getVideoData = async (id) => {
    const videoUrl = `${url}videos?${appendKey}&type=video&part=statistics,snippet&id=${id}`;
    const data = (await axios.get(videoUrl)).data.items;

    const viewCount = parseInt(data[0].statistics.viewCount);
    const upvoteCount = parseInt(data[0].statistics.likeCount);

    const channelId = data[0].snippet.channelId || '';
    const channelData = (await makeChannelRequest(channelId)).data.items;

    const snippet = data[0].snippet;

    let videoName = snippet.title;
    let description = snippet.description;
    let name = snippet.channelTitle;
    let thumbnails = snippet.thumbnails;

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
        dislikes,
        videoName,
        description,
        name,
        thumbnails,
        id
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

module.exports = { getVideoData, getVideos };