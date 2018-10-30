require('dotenv').config({ path: '.env' })

// TODO: const db = require('./db')
const createServer = require('./server')

const server = createServer()
// TODO: use middlewares to handle cookies (JWT)
// TODO: use middlewares to populate current user
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  ({ port }) => console.log(`Server is now running on http://localhost:${port}`)
)
