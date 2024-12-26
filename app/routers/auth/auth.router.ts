import Router from '@koa/router'
import { ControllerAuth } from '@/controllers/index.controllers'

const controller = new ControllerAuth()
const router = new Router({
  prefix: '/auth'
})

router.post('/', async ctx => {
  await controller.login(ctx)
})

export const AuthRouter = router
