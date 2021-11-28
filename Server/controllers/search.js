const { getVideoData, getVideos } = require('../youtube/data');
const { addDislike, removeDislike, getDislike } = require('../database');

module.exports = {

    async search(req, res) {
        const { id } = req.params;
        const data = await getVideoData(id);
        res.json(data)
    },

    async searchVideos(req, res) {
        const { query } = req.params;
        const data = await getVideos(query);
        res.json(data)
    },

    async getDislike(req, res) {
        const { id } = req.params;

        const dislikes = (await getDislike(id))[0].count;
        res.json(dislikes);
    },

    async dislike(req, res) {
        const { isDisliked, videoID } = req.params;

        if (isDisliked == 'y') {
            await removeDislike(videoID);
        } else {
            await addDislike(videoID);
        }

        const dislikes = (await getDislike(videoID))[0].count;
        res.json(dislikes);
    }

}