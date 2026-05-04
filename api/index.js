const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.multi.sources',
    version: '1.0.0',
    name: 'Latino Multi Fuentes',
    description: 'Múltiples fuentes en Español Latino y Multi',
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

    // 1. Embed.su — muy buena compatibilidad latino/multi
    streams.push({
        name: '🇲🇽 Embed.su',
        title: 'Latino / Multi — Embed.su',
        externalUrl: isMovie
            ? `https://embed.su/embed/movie/${imdbId}`
            : `https://embed.su/embed/tv/${imdbId}/${s}/${e}`
    });

    // 2. Vidfast.pro — fuente latino
    streams.push({
        name: '🇲🇽 Vidfast',
        title: 'Latino — Vidfast.pro',
        externalUrl: isMovie
            ? `https://vidfast.pro/embed/movie/${imdbId}`
            : `https://vidfast.pro/embed/tv/${imdbId}/${s}/${e}`
    });

    // 3. Vidsrc.me — multi idioma
    streams.push({
        name: '🌎 Vidsrc.me',
        title: 'Multi — Vidsrc.me',
        externalUrl: isMovie
            ? `https://vidsrc.me/embed/movie?imdb=${imdbId}`
            : `https://vidsrc.me/embed/tv?imdb=${imdbId}&season=${s}&episode=${e}`
    });

    // 4. Vidsrc.to — multi idioma
    streams.push({
        name: '🌎 Vidsrc.to',
        title: 'Multi — Vidsrc.to',
        externalUrl: isMovie
            ? `https://vidsrc.to/embed/movie/${imdbId}`
            : `https://vidsrc.to/embed/tv/${imdbId}/${s}/${e}`
    });

    // 5. Multiembed.mov — latino/multi
    streams.push({
        name: '🇲🇽 Multiembed',
        title: 'Latino / Multi — Multiembed.mov',
        externalUrl: isMovie
            ? `https://multiembed.mov/directstream.php?video_id=${imdbId}&tmdb=1`
            : `https://multiembed.mov/directstream.php?video_id=${imdbId}&tmdb=1&s=${s}&e=${e}`
    });

    // 6. 2embed.cc — multi idioma
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