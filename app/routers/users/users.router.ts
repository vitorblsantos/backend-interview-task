import Router from '@koa/router'
import { ControllerUsers } from '@/controllers/index.controllers'

const controller = new ControllerUsers()
const router = new Router({
  prefix: '/users'
})

router.delete('/', async ctx => {
  await controller.delete(ctx)
})

router.get('/:email', async ctx => {
  await controller.get(ctx)
})

router.get('/', async ctx => {
  await controller.fetch(ctx)
})

router.post('/', async ctx => {
  await controller.post(ctx)
})

router.put('/', async ctx => {
  await controller.put(ctx)
})

export const UsersRouter = router
