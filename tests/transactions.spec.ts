import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { server } from '../src/app'
import { execSync } from 'node:child_process'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(server.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    expect(response.status).toBe(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    const cookies = createTransactionResponse.get('Set-Cookie') || []

    const listTransactionsResponse = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') || []

    const listTransactionsResponse = await request(server.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionsResponse.body.transactions[0].id

    const getTransactionResponse = await request(server.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 5000,
      }),
    )
  })

  it('should be able to get the balance', async () => {
    const createTransactionResponse = await request(server.server)
      .post('/transactions')
      .send({
        title: 'Credit transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') || []

    await request(server.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit transaction',
        amount: 2000,
        type: 'debit',
      })

    const balanceResponse = await request(server.server)
      .get('/transactions/balance')
      .set('Cookie', cookies)
      .expect(200)

    expect(balanceResponse.body.balance).toEqual({
      balance: 3000,
    })
  })
})
