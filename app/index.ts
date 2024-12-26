import 'dotenv/config'

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import helmet from 'koa-helmet'

import { AppDataSource, Environment } from '@/config/index.config'
import { Routers } from '@/routers/index.routers'

async function boostrap() {
  await AppDataSource.initialize()

  const app = new Koa()

  app.use(bodyParser())

  app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'User-Agent']
    })
  )

  app.use(
    helmet({
      contentSecurityPolicy: false
    })
  )

  app.use(Routers.routes()).use(Routers.allowedMethods())
  app.listen(Environment.APP_PORT, () => console.log('API alive'))
}

boostrap()
