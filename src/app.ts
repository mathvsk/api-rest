import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import { fastify } from 'fastify'

export const server = fastify()

server.register(cookie)
server.register(transactionsRoutes, {
  prefix: 'transactions',
})
