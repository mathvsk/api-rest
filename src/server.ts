import { fastify } from 'fastify'
import { knex } from './databse'
import { env } from './env'

const server = fastify()

server.get('/', async (request, reply) => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
  })
