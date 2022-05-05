import fastifyPlugin from 'fastify-plugin';
import fastifyPostgres from 'fastify-postgres';

async function postgresConnector(fastify, options) {
  fastify.register(fastifyPostgres, {
    user: 'marko',
    hostname: '127.0.0.1',
    database: 'flixstreamplatform',
    password: 'DiffieHellman',
  });
}

export default fastifyPlugin(postgresConnector);