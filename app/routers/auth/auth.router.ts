import Router from '@koa/router'

import { ControllerAuth } from '@/controllers/index.controllers'
import { MiddlewareAuth } from '@/middlewares/index.middleware'

const controller = new ControllerAuth()
const middlewareAuth = new MiddlewareAuth()
const router = new Router({
  prefix: '/auth'
})

router
  .post('/', async ctx => {
    await controller.signIn(ctx)
  })
  .post('/signup', middlewareAuth.authenticated, async ctx => {
    await controller.signUp(ctx)
  })
  .post('/validate', middlewareAuth.authenticated, async ctx => {
    await controller.validate(ctx)
  })

export const AuthRouter = router
