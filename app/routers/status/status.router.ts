import Router from '@koa/router'

import { Alive } from '@/controllers/index.controllers'

const router = new Router({
  prefix: '/status'
})

router.get('/', ctx => {
  ctx.body = { message: Alive() }
})

export const StatusRouter = router
