import fastify from 'fastify'
import { add, fibonacciAtGivenSequence } from '~/utils/helpers'

export const app = fastify({
  logger: true,
})

app.get('/', (_req, res) => {
  res.send({
    data: {
      sum: add(2, 3),
    },
  })
})

type Params = {
  position: string
}

app.get<{
  Params: Params
}>('/fibo/:position', async (req, res) => {
  const position = parseInt(req.params.position) || 1
  res.send({
    data: {
      position,
      value: await fibonacciAtGivenSequence(position),
    },
  })
})
