import cors from 'cors'
import express from 'express'

import config from '#config'
import plant from '#routes/plant.js'
import journal from '#routes/journal.js'

const app = express()

// middleware
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || config.allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  }),
)

// routes
app.use('/api/plant', plant)
app.use('/api/journal', journal)

export default app
