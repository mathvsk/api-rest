import { fastify } from 'fastify'
import { knex } from './databse'

const server = fastify()

server.get('/', async (request, reply) => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

server
  .listen({
    port: 3000,
  })
  .then(() => {
    console.log('Server is running on http://localhost:3000')
  })
