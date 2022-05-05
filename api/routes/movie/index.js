import { allMoviesSchema } from './schemas.js';

async function routes(fastify, options) {
  
  // const allMoviesQuery = readFileSync(new URL('./selectAllMovies.sql', import.meta.url)).toString();
  // const singleMovieQuery = readFileSync(new URL('./selectMovie.sql', import.meta.url)).toString();
  // const subtitleQuery = readFileSync(new URL('./selectSubtitles.sql', import.meta.url)).toString();
  // const audioLangQuery = readFileSync(new URL('./selectAudioLanguages.sql', import.meta.url)).toString();

  const queryPaths = ['./selectAllMovies.sql']
  const queryBuffers = await fastify.loadQueries(import.meta.url, queryPaths);
  const [allMoviesQuery] = queryBuffers.map(buf => buf.toString());

  console.log(allMoviesQuery);

  const allMoviesOpts = {
    schema: allMoviesSchema
  };
  
  fastify.get('/movie', allMoviesOpts, async (request, reply) => {
    console.log(request.params);
    const { limit, offset=0 } = request.query;
    const result = await fastify.pg.query(allMoviesQuery, [limit, offset]);

    return result.rows;
  });
}

export default routes;