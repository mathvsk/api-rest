import { env } from './env'
import { server } from './app'

server
  .listen({
    port: env.PORT,
    host: 'RENDER' in process.env ? '0.0.0.0' : 'localhost',
  })
  .then(() => {
    console.log(`Server is running on http://localhost:${env.PORT}`)
  })
