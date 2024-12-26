import { Context } from 'koa'

import { IServiceAuth, IServiceAuthLoginRequest } from '@/interfaces/index.interfaces'
import { ServiceAuth } from '@/services/index.services'

export class ControllerAuth {
  private serviceAuth: IServiceAuth

  constructor() {
    this.serviceAuth = new ServiceAuth()
  }

  async login(ctx: Context): Promise<void> {
    const body = ctx.request.body as IServiceAuthLoginRequest
    if (!body || !body.username || !body.password) ctx.throw(400, 'Bad request')

    try {
      const token = await this.serviceAuth.login(body)

      ctx.body = token
      ctx.status = 201
      return
    } catch (error) {
      ctx.throw(500, 'Internal Server Error')
    }
  }
}
