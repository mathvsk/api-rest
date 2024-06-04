import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { server } from '../src/app'
import request from 'supertest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await server.ready()
  })

  afterAll(async () => {
    await server.close()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(server.server)
      .post('/transactions')
      .send({ title: 'New transaction', amount: 5000, type: 'credit' })

    expect(response.status).toBe(201)
  })
})
