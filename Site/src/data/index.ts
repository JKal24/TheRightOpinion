import axios from 'axios';

export async function getPageStats(pageId : String) {
    return (await axios.get(`http://localhost:3000/search/${pageId}`)).data || [];
}