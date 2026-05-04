const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.streamimdb.english',
    version: '1.0.0',
    name: 'StreamIMDb',
    description: 'stream las peliculas o series qu quieras desde la pagina de StreamIMDb con solo un toque',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt'],
    catalogs: []
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    const parts = id.split(':');
    const imdbId = parts[0];
    const s = parts[1];
    const e = parts[2];

    const isMovie = type === 'movie';
    const streams = [];

    streams.push({
        name: '🇺🇸 StreamIMDb',
        title: 'ENGLISH — StreamIMDb.ru',
        externalUrl: isMovie
            ? `https://streamimdb.ru/embed/movie/${imdbId}`
            : `https://streamimdb.ru/embed/tv/${imdbId}/${s}/${e}`
    });

    return { streams };
});

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, (err) => {
        if (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
        } else {
            res.statusCode = 404;
            res.end('Not Found');
        }
    });
};
