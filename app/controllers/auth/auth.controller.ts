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
    try {
      const body = ctx.request.body as IServiceAuthSignInRequest

      if (!body || !body.email || !body.password) ctx.throw('Invalid payload')

      const user = await this.serviceUsers.getByEmail(body.email)

      if (!user) {
        await this.serviceAuth.signUp({ email: body.email, password: body.password })
        ctx.body = '@auth/user-signup'
        ctx.status = 200
        return
      }

      ctx.body = await this.serviceAuth.signIn(body)
      ctx.status = 200
      return
    } catch (err) {
      ctx.body = {
        error: '@auth/signin',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async signUp(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body as IServiceAuthSignInRequest

      if (!body || !body.email) ctx.throw(400, '@signup/bad-request')

      ctx.body = await this.serviceAuth.signUp(body)
      ctx.status = 201
      return
    } catch (err) {
      ctx.body = {
        error: '@auth/signup',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async validate(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body as { token: string }

      if (!body || !body.token) ctx.throw(400, '@validate/bad-request')

      ctx.body = await this.serviceAuth.isValidAccessToken(body.token)
      ctx.status = 200
      return
    } catch (err) {
      ctx.body = {
        error: '@auth/validate',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }
}
