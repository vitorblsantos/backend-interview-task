import Router from '@koa/router'

import { ControllerRoot } from '@/controllers/index.controllers'
import { MiddlewareAuth, MiddlewareUsers } from '@/middlewares/index.middleware'

const controller = new ControllerRoot()

const middlewareAuth = new MiddlewareAuth()
const middlewareUsers = new MiddlewareUsers()

const router = new Router()

router.get('/me', middlewareAuth.execute, middlewareUsers.execute, async ctx => {
  await controller.me(ctx)
})

router.post('/edit-account', async ctx => {
  await controller.editAccount(ctx)
})

export const RootRouter = router
