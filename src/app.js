import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

const app = express()

// .use() is used usually to configure middlewares.

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true
}

// Handles cross-origin resource sharing (CORS).
app.use(cors(corsOptions))

// Handles JSON data.
app.use(express.json({
    limit: '16kb'
}))

// Handles URL data with nested objects.
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

// Serve static files from the "public" directory
app.use(express.static('public'))


app.use(cookieParser())

export { app }

