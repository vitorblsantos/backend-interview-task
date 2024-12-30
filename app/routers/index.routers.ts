import Router from '@koa/router'

import { AuthRouter } from './auth/auth.router'
import { StatusRouter } from './status/status.router'
import { RootRouter } from './root/root.router'
import { UsersRouter } from './users/users.router'

const Routers = new Router()

Routers.use(AuthRouter.routes())
Routers.use(RootRouter.routes())
Routers.use(StatusRouter.routes())
Routers.use(UsersRouter.routes())

export { Routers }
