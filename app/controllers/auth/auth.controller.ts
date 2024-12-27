import { Context } from 'koa'

import { IServiceAuth, IServiceAuthSignInRequest, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceAuth, ServiceUsers } from '@/services/index.services'

export class ControllerAuth {
  private serviceAuth: IServiceAuth
  private serviceUsers: IServiceUsers

  constructor() {
    this.serviceAuth = new ServiceAuth()
    this.serviceUsers = new ServiceUsers()
  }

  async signIn(ctx: Context): Promise<void> {
    const body = ctx.request.body as IServiceAuthSignInRequest

    if (!body || !body.email || !body.password) ctx.throw(400, 'Bad request')

    try {
      const user = await this.serviceUsers.get(body.email)

      if (!user) {
        this.serviceAuth.signUp({ email: body.email, password: body.password })

        return
      }

      const token = await this.serviceAuth.signIn(body)

      ctx.body = token
      ctx.status = 201
      return
    } catch (error) {
      ctx.throw(500, error)
    }
  }

  async signUp(ctx: Context): Promise<void> {
    const body = ctx.request.body as IServiceAuthSignInRequest

    if (!body || !body.email) ctx.throw(400, 'Bad request')

    try {
      const user = await this.serviceUsers.get(body.email)

      if (user) ctx.throw(406, 'User already exists')

      ctx.body = await this.serviceAuth.signUp(body)
      ctx.status = 201
      return
    } catch (error) {
      ctx.throw(500, error)
    }
  }
}
