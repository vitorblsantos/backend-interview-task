import { Context } from 'koa'

import { EUserRole, IServiceAuth, IServiceAuthSignInRequest, IServiceUsers } from '@/interfaces/index.interfaces'
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

      if (!body) {
        ctx.body = {
          error: '@root/editAccount',
          message: 'body cannot be null'
        }
        ctx.status = 400
        return
      }

      if (!body.name?.length && !body.role.length) {
        ctx.body = {
          error: '@root/editAccount',
          message: 'Invalid payload'
        }
        ctx.status = 400
        return
      }

      if (ctx.state.user.role === EUserRole.ADMIN) {
        let oddBody = {}

        if (body.name) oddBody = { ...oddBody, name: body.name, isOnboarded: true }
        if (body.role) oddBody = { ...oddBody, role: body.role }

        const data = oddBody as {
          isOnboarded?: EntityUsers['isOnboarded']
          name: EntityUsers['name']
          role?: EntityUsers['role']
        }

        ctx.body = await this.serviceUsers.put(body.user, data)
      }

      if (ctx.state.user.role === EUserRole.USER && body.name?.length) {
        ctx.body = await this.serviceUsers.put(body.user, {
          isOnboarded: true,
          name: body.name
        })
        ctx.status = 200
        return
      }
    } catch (err) {
      ctx.body = {
        error: '@root/editAccount',
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

  async signInOrRegister(ctx: Context): Promise<void> {
    try {
      const body = ctx.request.body as IServiceAuthSignInRequest

      if (!body || !body.email || !body.password) {
        ctx.body = {
          error: '@root/signInOrRegister',
          message: 'Invalid payload'
        }
        ctx.status = 400

        return Promise.resolve()
      }

      const user = await this.serviceUsers.getByEmail(body.email)

      if (!user) {
        await this.serviceAuth.signUp(body)

        ctx.body = {
          error: '@root/signInOrRegister',
          message: 'User pre-registered'
        }
        ctx.status = 201

        return Promise.resolve()
      }

      ctx.body = await this.serviceAuth.signIn(body)
      ctx.status = 200
      return Promise.resolve()
    } catch (err) {
      ctx.body = {
        error: '@root/signInOrRegister',
        message: err.message
      }
      ctx.status = err.status || 500
      return Promise.resolve()
    }
  }
}
