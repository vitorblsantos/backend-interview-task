import Router from '@koa/router'

import { StatusRouter } from './status/status.router'
import { UsersRouter } from './users/users.router'

const Routers = new Router()

Routers.use(StatusRouter.routes())
Routers.use(UsersRouter.routes())

export { Routers }
