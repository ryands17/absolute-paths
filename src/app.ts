import fastify from 'fastify'
import { add } from '~/utils/helpers'

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
