import cors from 'cors'
import express from 'express'

import config from '#config'

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

export default app
