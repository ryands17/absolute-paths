import { AddressInfo } from 'net'
import { FastifyInstance } from 'fastify'
import { app } from './app'

const start = async (app: FastifyInstance) => {
  try {
    await app.listen(3000)
    const { port } = app.server.address() as AddressInfo
    app.log.info(`server listening on ${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start(app)
