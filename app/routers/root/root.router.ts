import Router from '@koa/router'

import { ControllerUsers } from '@/controllers/index.controllers'
import { MiddlewareAuth, MiddlewareUsers } from '@/middlewares/index.middleware'

const controllerUsers = new ControllerUsers()

const middlewareAuth = new MiddlewareAuth()
const middlewareUsers = new MiddlewareUsers()

const router = new Router()

router.get('/me', middlewareAuth.execute, middlewareUsers.execute, async ctx => {
  await controllerUsers.me(ctx)
})

router.put('/edit-account', middlewareAuth.execute, middlewareUsers.execute, async ctx => {
  await controllerUsers.put(ctx)
})

export const RootRouter = router
