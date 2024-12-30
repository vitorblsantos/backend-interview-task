import Router from '@koa/router'

import { ControllerUsers } from '@/controllers/index.controllers'
import { MiddlewareAuth } from '@/middlewares/index.middleware'

const controller = new ControllerUsers()
const middlewareAuth = new MiddlewareAuth()
const router = new Router({
  prefix: '/users'
})

router
  .delete('/', middlewareAuth.execute, async ctx => {
    await controller.delete(ctx)
  })
  .get('/:email', middlewareAuth.execute, async ctx => {
    await controller.get(ctx)
  })
  .get('/', middlewareAuth.execute, async ctx => {
    await controller.fetch(ctx)
  })
  .post('/', middlewareAuth.execute, async ctx => {
    await controller.post(ctx)
  })
  .put('/', middlewareAuth.execute, async ctx => {
    await controller.put(ctx)
  })

export const UsersRouter = router
