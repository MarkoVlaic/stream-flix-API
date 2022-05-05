import { allShowsSchema, singleShowSchema } from './schemas.js';

async function routes(fastify, options) {
  const queryPaths = ['./selectAllShows.sql', 'selectShow.sql'];
  const queryBuffers = await fastify.loadQueries(import.meta.url, queryPaths);
  const [allShowsQuery, singleShowQuery] = queryBuffers.map(buf => buf.toString());

  const allshowsOpts = {
    schema: allShowsSchema
  };

  fastify.get('/show', allshowsOpts, async (request, reply) => {
    const { limit, offset=0 } = request.query;
    const result = await fastify.pg.query(allShowsQuery, [limit, offset]);
    return result.rows; 
  });

  const singleShowOpts = {
    schema: singleShowSchema
  };

  fastify.get('/show/:id', singleShowOpts, async (request, reply) => {
    const { id } = request.params;
    const queryResult = await fastify.pg.query(singleShowQuery, [id]);

    const result = {
      seasons: [],
    };

    if(queryResult.rowCount == 0) {
      reply.code(404).send({ message: `No Show with id ${id} found` });
      return;
    }

    for(let row of queryResult.rows) {
      let seasonEntry = result.seasons.find(({ number }) => row.seasonno === number);

      if(!seasonEntry) {
        seasonEntry = {
          number: row.seasonno,
          episodes: []
        };
        result.seasons.push(seasonEntry);
      }

      const episodeEntry = {
        number: row.episodeno,
        trackId: row.trackid
      };
      seasonEntry.episodes.push(episodeEntry);
    }

    return result;
  });
};

export default routes;