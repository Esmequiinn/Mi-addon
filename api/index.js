const { addonBuilder, getRouter } = require('stremio-addon-sdk');

const manifest = {
    id: 'com.latino.vidfast.pro',
    version: '1.0.0',
    name: 'Vidfast Pro Latino',
    description: 'Solo contenido en Español Latino desde Vidfast.pro',
    resources: ['stream'],
    types: ['movie', 'series'],
    idPrefixes: ['tt']
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(async ({ type, id }) => {
    const parts = id.split(':');
    const imdbId = parts[0];
    const s = parts[1];
    const e = parts[2];

    const streams = [];

    // Vidfast.pro Latino
    streams.push({
        name: 'Vidfast Latino',
        title: 'REPRODUCIR EN LATINO 🇲🇽',
        externalUrl: type === 'movie' 
            ? `https://vidfast.pro/embed/movie/${imdbId}` 
            : `https://vidfast.pro/embed/tv/${imdbId}/${s}/${e}`
    });

    return { streams };
});

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
    router(req, res, (err) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.status(404).send('Not Found');
        }
    });
};
