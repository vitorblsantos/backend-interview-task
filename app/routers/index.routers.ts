import Router from '@koa/router'

import { StatusRouter } from './status/status.router'

const router = new Router()

router.use(StatusRouter.routes())

export default router
