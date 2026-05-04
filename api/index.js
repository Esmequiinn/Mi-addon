const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.eng.mix',
    version: '1.0.0',
    name: 'Multi Latino & English',
    description: 'Vidsrc (New/Old) & Embed.su Latino',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    const imdbId = id.split(':')[0];
    const s = id.split(':')[1];
    const e = id.split(':')[2];
    const streams = [];

    const embedUrl = type === 'movie'
        ? `https://embed.su/embed/movie/${imdbId}`
        : `https://embed.su/embed/tv/${imdbId}/${s}/${e}`;

    streams.push({
        name: "Embed.su",
        title: "ESPAÑOL LATINO / MULTI 🇲🇽\n(Seleccionar audio en el player)",
        url: embedUrl
    });

    const vidsrcToUrl = type === 'movie'
        ? `https://vidsrc.to/embed/movie/${imdbId}`
        : `https://vidsrc.to/embed/tv/${imdbId}/${s}/${e}`;

    streams.push({
        name: "Vidsrc.to (New)",
        title: "ENGLISH / MULTI 🇺🇸\nNew Version - High Quality",
        url: vidsrcToUrl
    });

    const vidsrcMeUrl = type === 'movie'
        ? `https://vidsrc.me/embed/movie?imdb=${imdbId}`
        : `https://vidsrc.me/embed/tv?imdb=${imdbId}&sea=${s}&episode=${e}`;

    streams.push({
        name: "Vidsrc.me (Old)",
        title: "ENGLISH / MULTI 🌎\nLegacy Version",
        url: vidsrcMeUrl
    });

    return { streams };
});

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, () => {
        res.status(404).send('Not found');
    });
};
