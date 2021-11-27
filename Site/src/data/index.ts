import axios from 'axios';

export async function getPageStats(pageId : String) {
    return (await axios.get(`/search/${pageId}`)).data || [];
}