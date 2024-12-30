import Router from '@koa/router'

import { ControllerAuth } from '@/controllers/index.controllers'
import { MiddlewareAdmin, MiddlewareAuth } from '@/middlewares/index.middleware'

const controller = new ControllerAuth()
const middlewareAuth = new MiddlewareAuth()
const middlewareAdmin = new MiddlewareAdmin()
const router = new Router({
  prefix: '/auth'
})

router
  .post('/', async ctx => {
    await controller.signIn(ctx)
  })
  .post('/signup', middlewareAuth.execute, async ctx => {
    await controller.signUp(ctx)
  })
  .post('/validate', middlewareAuth.execute, middlewareAdmin.execute, async ctx => {
    await controller.validate(ctx)
  })

export const AuthRouter = router
