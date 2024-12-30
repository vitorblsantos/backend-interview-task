import Router from '@koa/router'

import { ControllerUsers } from '@/controllers/index.controllers'
import { MiddlewareAuth } from '@/middlewares/index.middleware'

const controller = new ControllerUsers()
const middlewareAuth = new MiddlewareAuth()
const router = new Router({
  prefix: '/users'
})

router
  .delete('/', middlewareAuth.authenticated, middlewareAuth.admin, async ctx => {
    await controller.delete(ctx)
  })
  .get('/:email', middlewareAuth.authenticated, async ctx => {
    await controller.get(ctx)
  })
  .get('/', middlewareAuth.authenticated, async ctx => {
    await controller.fetch(ctx)
  })
  .post('/', middlewareAuth.authenticated, async ctx => {
    await controller.post(ctx)
  })
  .put('/', middlewareAuth.authenticated, async ctx => {
    await controller.put(ctx)
  })

export const UsersRouter = router
