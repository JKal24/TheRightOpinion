const Pool = require('pg').Pool;

let pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'tro'
})

pool.on("error", (err, client) => {
    console.error("Error connecting to db", err);
});

module.exports = {

    async addDislike(videoId) {
        await pool.query("INSERT INTO dislikes (id) VALUES($1) ON CONFLICT (id) DO UPDATE SET count = dislikes.count + 1", [videoId]);
    },

    async getDislike(videoId) {
        return (await pool.query("SELECT count FROM dislikes WHERE id = $1", [videoId])).rows;
    }

}