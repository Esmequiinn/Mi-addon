const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.eng.mix',
    version: '1.0.0',
    name: 'Multi Latino & English',
    description: 'Vidsrc & Embed.su Latino',
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

    const streams = [];

    // Latino
    streams.push({
        name: 'Embed.su',
        title: 'ESPAÑOL LATINO / MULTI 🇲🇽',
        externalUrl: type === 'movie'
            ? `https://embed.su/embed/movie/${imdbId}`
            : `https://embed.su/embed/tv/${imdbId}/${s}/${e}`
    });

    // Inglés
    streams.push({
        name: 'Vidsrc.to',
        title: 'ENGLISH / MULTI 🇺🇸 (New)',
        externalUrl: type === 'movie'
            ? `https://vidsrc.to/embed/movie/${imdbId}`
            : `https://vidsrc.to/embed/tv/${imdbId}/${s}/${e}`
    });

    return { streams };
});

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, () => {
        res.statusCode = 404;
        res.end('Not Found');
    });
};
