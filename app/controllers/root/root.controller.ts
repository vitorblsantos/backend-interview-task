import { Context } from 'koa'

import { IServiceAuth, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceAuth, ServiceUsers } from '@/services/index.services'
import { EntityUsers } from '@/entities/index.entities'

export class ControllerRoot {
  private serviceAuth: IServiceAuth
  private serviceUsers: IServiceUsers

  constructor() {
    this.serviceAuth = new ServiceAuth()
    this.serviceUsers = new ServiceUsers()
  }

  async editAccount(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body as {
        isOnboarded: EntityUsers['isOnboarded']
        name: EntityUsers['name']
        role: EntityUsers['role']
        user: EntityUsers['id']
      }

      ctx.body = await this.serviceUsers.put(body.user, body)
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

  async me(ctx: Context): Promise<void> {
    try {
      ctx.body = ctx.state.user
      ctx.status = 200
      return
    } catch (err) {
      ctx.body = {
        error: '@root/me',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }
}
