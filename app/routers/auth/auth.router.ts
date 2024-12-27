import Router from '@koa/router'
import { ControllerAuth } from '@/controllers/index.controllers'

const controller = new ControllerAuth()
const router = new Router({
  prefix: '/auth'
})

router.post('/login', async ctx => {
  await controller.signIn(ctx)
})

router.post('/signup', async ctx => {
  await controller.signUp(ctx)
})

export const AuthRouter = router
