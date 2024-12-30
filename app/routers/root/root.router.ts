import Router from '@koa/router'
import { ControllerAuth } from '@/controllers/index.controllers'

const controller = new ControllerAuth()
const router = new Router()

router.post('/', async ctx => {
  await controller.signIn(ctx)
})

router.post('/signup', async ctx => {
  await controller.signUp(ctx)
})

router.post('/validate', async ctx => {
  await controller.validate(ctx)
})

export const AuthRouter = router
