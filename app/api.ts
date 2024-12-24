import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'

import { Status } from './routes/routes.index'

const api = express()

api.use(bodyParser.json())

api.use(cors())

api.use('/', Status)

export default api
