import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'

import router from './routes/router.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended : true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended : true }))
app.use(cors())
app.use(router)

dotenv.config({
    path : './config/.env.local'
})

const PORT = process.env.PORT | 4000

mongoose.set('strictQuery', false)
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}).catch((error) => {
    console.log(error.message)
})