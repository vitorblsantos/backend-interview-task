import { Context } from 'koa'

import { IServiceAuth, IServiceAuthSignInRequest } from '@/interfaces/index.interfaces'
import { ServiceAuth } from '@/services/index.services'

export class ControllerAuth {
  private serviceAuth: IServiceAuth

  constructor() {
    this.serviceAuth = new ServiceAuth()
  }

  async signIn(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body as IServiceAuthSignInRequest

      if (!body || !body.email || !body.password) ctx.throw(400, 'Invalid payload')

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
