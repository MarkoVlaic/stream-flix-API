import { trackSchema } from './schemas.js';

async function routes(fastify, options) {
  const queryPahts = ['./selectTrack.sql', './selectSubtitles.sql', './selectAudioLanguages.sql'];
  const queryBuffers = await fastify.loadQueries(import.meta.url, queryPahts);
  const [trackQuery, subtitleQuery, audioLangQuery] = queryBuffers.map(buf => buf.toString());

  const trackOpts = {
    schema: trackSchema
  };

  fastify.get('/track/:id', trackOpts, async (request, reply) => {
    const { id } = request.params;
    const trackPromise = fastify.pg.query(trackQuery, [id]);
    const subtitlesPromise = fastify.pg.query(subtitleQuery, [id]);
    const audioLangPromise = fastify.pg.query(audioLangQuery, [id]);

    const [trackResult, subtitlesResult, audioLangResult] = await Promise.all([trackPromise, subtitlesPromise, audioLangPromise]);

    if(trackResult.rowCount === 0) {
      reply.code(404).send({ message: `No track with id ${id} found` });
      return;
    }

    const subtitleLanguages = subtitlesResult.rows.map(({ subtitlelang }) => subtitlelang);
    const audioLanguages = audioLangResult.rows.map(({ audiolang }) => audiolang);
    
    const result = {...trackResult.rows[0], subtitleLanguages, audioLanguages};

    return result;

  });
}

export default routes;