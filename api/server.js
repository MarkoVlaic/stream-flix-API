import Fastify from "fastify";
import fastifyCors from "fastify-cors";

import postgresConnector from './postgresConnector.js';
import loadQueries from "./plugins/loadQueries.js";

import movieRoutes from './routes/movie/index.js';
import showRoutes from './routes/show/index.js';
import trackRoutes from './routes/track/index.js'; 

const fastify = Fastify({
  logger: true
}); 

fastify.register(postgresConnector);
fastify.register(fastifyCors, {
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000']
});
fastify.decorate('loadQueries', loadQueries);

fastify.register(movieRoutes);
fastify.register(showRoutes);
fastify.register(trackRoutes);

const start = async () => {
  try {
    await fastify.listen(8080);
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();