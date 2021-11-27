const { getVideoData } = require('../youtube/data');

module.exports = {

    async search(req, res) {
        const { id } = req.params;
        const data = await getVideoData(id);
        res.json(data)
    }

}