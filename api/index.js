const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.eng.mix',
    version: '1.0.0',
    name: 'Multi Latino & English',
    description: 'Vidsrc & Embed.su Latino',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    const [imdbId, s, e] = id.split(':');
    const streams = [];

    // Opción Latino
    streams.push({
        name: "Embed.su",
        title: "ESPAÑOL LATINO / MULTI 🇲🇽",
        url: type === 'movie' ? `https://embed.su/embed/movie/${imdbId}` : `https://embed.su/embed/tv/${imdbId}/${s}/${e}`
    });

    // Opción Inglés New
    streams.push({
        name: "Vidsrc.to",
        title: "ENGLISH / MULTI 🇺🇸 (New)",
        url: type === 'movie' ? `https://vidsrc.to/embed/movie/${imdbId}` : `https://vidsrc.to/embed/tv/${imdbId}/${s}/${e}`
    });

    // Opción Inglés Old
    streams.push({
        name: "Vidsrc.me",
        title: "ENGLISH / MULTI 🌎 (Old)",
        url: type === 'movie' ? `https://vidsrc.me/embed/movie?imdb=${imdbId}` : `https://vidsrc.me/embed/tv?imdb=${imdbId}&sea=${s}&episode=${e}`
    });

    return { streams };
});

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, () => {
        res.status(404).send('Not Found');
    });
};
