import { afterAll, beforeAll, expect, test } from 'vitest'
import { server } from '../src/app'
import request from 'supertest'

beforeAll(async () => {
  await server.ready()
})

afterAll(async () => {
  await server.close()
})

test('user can create a new transaction', async () => {
  const response = await request(server.server)
    .post('/transactions')
    .send({ title: 'New transaction', amount: 5000, type: 'credit' })

  expect(response.status).toBe(201)
})
