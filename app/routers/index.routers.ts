import Router from '@koa/router'

import { StatusRouter } from './status/status.router'

const Routers = new Router()

Routers.use(StatusRouter.routes())

export { Routers }
