import { Context } from 'koa'

import { IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceUsers } from '@/services/index.services'
import { EntityUsers } from '@/entities/index.entities'

export class ControllerUsers {
  private serviceUser: IServiceUsers

  constructor() {
    this.serviceUser = new ServiceUsers()
  }

  async delete(ctx: Context): Promise<void> {
    const body = ctx.request.body as { user: EntityUsers['id'] }

    if (!body || !body.user) ctx.throw(400, 'provide-body.user')

    try {
      const user = await this.serviceUser.get(body.user)

      if (!user) return ctx.throw('not-found')

      await this.serviceUser.delete(user.id)
      ctx.status = 204
      return
    } catch (err) {
      ctx.body = {
        error: '@users/delete',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async fetch(ctx: Context): Promise<void> {
    try {
      const users = await this.serviceUser.fetch()

      ctx.body = users
      ctx.status = 200
      return
    } catch (err) {
      ctx.body = {
        error: '@users/fetch',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async get(ctx: Context): Promise<void> {
    const { email }: { email: string } = ctx.params

    if (!email) ctx.throw(400, 'provide-params.email')

    try {
      const user = await this.serviceUser.get(email)

      if (!user) ctx.throw('not-found')

      ctx.body = user
      ctx.status = 200
      return
    } catch (err) {
      ctx.body = {
        error: '@users/get',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async post(ctx: Context): Promise<void> {
    const body = ctx.request.body as Partial<EntityUsers>

    if (!body || !body.email || !body.cognitoId) {
      ctx.throw('provide-body.cognitoId-body.email')
      return
    }

    try {
      const alreadyExists = await this.serviceUser.get(body.email)

      if (alreadyExists) ctx.throw('already-exists')

      ctx.body = await this.serviceUser.post(body)
      ctx.status = 201
      return
    } catch (err) {
      ctx.body = {
        error: '@users/post',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }

  async put(ctx: Context): Promise<void> {
    const { user, ...body } = ctx.request.body as {
      isOnboarded: EntityUsers['isOnboarded']
      name: EntityUsers['name']
      role: EntityUsers['role']
      user: EntityUsers['id']
    }

    if (!body || (!body.isOnboarded && !body.name && !body.role))
      ctx.throw(400, 'provide-body.isOnboarded-body.name-body.role')

    try {
      const snapshot = await this.serviceUser.get(user)

      if (!snapshot) return ctx.throw('not-found')

      await this.serviceUser.put(snapshot.id, body)
      ctx.status = 204
      return
    } catch (err) {
      ctx.body = {
        error: '@users/put',
        message: err.message
      }
      ctx.status = err.status || 500
    }
  }
}
