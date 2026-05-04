const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.multi.sources',
    version: '1.1.0',
    name: 'Latino Multi Fuentes',
    description: 'Vidsrc.me y 2embed — Multi idioma',
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

    // Vidsrc.me
    streams.push({
        name: '🌎 Vidsrc.me',
        title: 'Multi — Vidsrc.me',
        externalUrl: isMovie
            ? `https://vidsrc.me/embed/movie?imdb=${imdbId}`
            : `https://vidsrc.me/embed/tv?imdb=${imdbId}&season=${s}&episode=${e}`
    });

    // 2embed.cc
    streams.push({
        name: '🌎 2embed',
        title: 'Multi — 2embed.cc',
        externalUrl: isMovie
            ? `https://www.2embed.cc/embed/${imdbId}`
            : `https://www.2embed.cc/embedtv/${imdbId}&s=${s}&e=${e}`
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
