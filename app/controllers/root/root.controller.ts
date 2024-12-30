import { Context } from 'koa'

import { EUserRole, IServiceAuth, IServiceUsers } from '@/interfaces/index.interfaces'
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

      if (ctx.state.user.role === EUserRole.ADMIN)
        ctx.body = await this.serviceUsers.put(body.user, {
          name: body.name,
          role: body.role
        })

      if (ctx.state.user.role === EUserRole.USER)
        ctx.body = await this.serviceUsers.put(body.user, {
          isOnboarded: true,
          name: body.name
        })

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
