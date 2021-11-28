const { getVideoData } = require('../youtube/data');
const { addDislike, removeDislike, getDislike } = require('../database');

module.exports = {

    async search(req, res) {
        const { id } = req.params;
        const data = await getVideoData(id);
        res.json(data)
    },

    async searchVideos(req, res) {
        const { query } = req.params;
        const data = await getVideoData(query);
        res.json(data)
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