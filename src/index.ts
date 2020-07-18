import express from 'express'
import { add } from '~/utils/helpers'

const app = express()

app.get('/', (_req, res) => {
  res.json({
    data: {
      sum: add(2, 3),
    },
  })
})

app.listen(3000, () => console.log('🚀 server running!'))
