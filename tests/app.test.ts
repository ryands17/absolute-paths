import supertest from 'supertest'
import { app } from '../src/app'

beforeAll(async done => {
  await app.ready()
  done()
})

test('health check', async () => {
  const res = await supertest(app.server)
    .get('/')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(res.body).toEqual({
    data: { sum: 5 },
  })
})

test('web worker computation', async () => {
  const position = 10
  const res = await supertest(app.server)
    .get(`/fibo/${position}`)
    .expect('Content-Type', /json/)
    .expect(200)

  expect(res.body).toEqual({
    data: { position, value: 34 },
  })
})
