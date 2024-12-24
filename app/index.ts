import 'dotenv/config'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'

import { Environment } from './config/index.config'
import { Routers } from './routers/index.routers'

const app = new Koa()

app.use(Routers.routes()).use(Routers.allowedMethods())
app.use(bodyParser())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
)
app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

app.listen(Environment.APP_PORT, () => console.log(`API alive - PORT: ${Environment.APP_PORT}`))
