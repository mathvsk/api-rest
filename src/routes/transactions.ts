import { FastifyInstance } from 'fastify'
import { knex } from '../databse'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  // Para usar um preHandler "global" na função, usar o código abaixo
  // app.addHook('preHandler', checkSessionIdExists)

  app.post('/', async (request, reply) => {
    const createTransactionSchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionSchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()
      const SEVEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 7

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: SEVEN_DAYS_IN_MS,
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies
      const transactions = await knex('transactions')
        .where({ session_id: sessionId })
        .select()

      return { transactions }
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionsParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionsParamsSchema.parse(request.params)
      const { sessionId } = request.cookies

      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()

      return { transaction }
    },
  )

  app.get(
    '/balance',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const balance = await knex('transactions')
        .where({ session_id: sessionId })
        .sum('amount', { as: 'balance' })
        .first()

      return { balance }
    },
  )
}
