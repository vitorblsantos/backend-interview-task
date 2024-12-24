import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'

import Routers from './routers/index.routers'

const app = new Koa()

app.use(
  helmet({
    contentSecurityPolicy: false
  })
)

app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(Routers.routes()).use(Routers.allowedMethods())

app.use(bodyParser())

app.listen(8080, () => console.log('Api serving on port: 8080'))
