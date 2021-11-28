import axios from 'axios';

export async function getPageStats(pageId : string) {
    return (await axios.get(`http://localhost:3000/search/${pageId}`)).data || [];
}

export async function updateDislikes(isDisliked : any, videoID : any) {
    return (await axios.get(`http://localhost:3000/dislike/${isDisliked}/${videoID}`)).data;
}

export async function getVideos(query : string) {
    return (await axios.get(`http://localhost:3000/videos/${query}`)).data || [];
}