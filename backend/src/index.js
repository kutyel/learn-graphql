require('dotenv').config({ path: '.env' })

// TODO: const db = require('./db')
const cookie = require('cookie-parser')
const createServer = require('./server')

const server = createServer()
server.express.use(cookie())
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
