import { FastifyInstance } from 'fastify'
import { knex } from '../databse'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    return await knex('transactions')
      .where('amount', 1000)
      .select('*')
  })
}