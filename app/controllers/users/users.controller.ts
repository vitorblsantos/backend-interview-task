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

    if (!body || !body.user) ctx.throw(400, 'Provide body.user')

    try {
      const user = await this.serviceUser.get(body.user)

      if (!user) ctx.throw(404, `User ${user} not found`)
      ctx.body = await this.serviceUser.delete(user.id)
      ctx.status = 200
      return
    } catch (error) {
      ctx.throw(500, 'Internal Server Error')
    }
  }

  async fetch(ctx: Context): Promise<void> {
    try {
      const users = await this.serviceUser.fetch()

      ctx.body = users
      ctx.status = 200
      return
    } catch (error) {
      ctx.throw(500, 'Internal Server Error')
    }
  }

  async get(ctx: Context): Promise<void> {
    const email: string | undefined = ctx.params.email

    if (!email) ctx.throw(400, 'Please, provide user email')

    console.log(email)

    try {
      const user = await this.serviceUser.get(email)

      if (!user) ctx.throw(404, 'User not found')

      ctx.body = user
      ctx.status = 200
      return
    } catch (error) {
      ctx.throw(500, 'Internal Server Error')
    }
  }

  async post(ctx: Context): Promise<void> {
    const body = ctx.request.body as { email: EntityUsers['email']; name: EntityUsers['name'] }

    if (!body || !body.email || !body.name) ctx.throw(400, 'Provide body.email and body.name')

    try {
      const alreadyExists = await this.serviceUser.get(body.email)

      if (alreadyExists) ctx.throw(406, 'User already exists')

      ctx.body = await this.serviceUser.post({
        email: body.email,
        name: body.name
      })
      ctx.status = 200
      return
    } catch (err) {
      ctx.throw(500, err)
    }
  }

  async put(ctx: Context): Promise<void> {
    const body = ctx.request.body as {
      name: EntityUsers['name']
      role: EntityUsers['role']
      user: EntityUsers['id']
    }

    if (!body || (!body.name && !body.role)) ctx.throw(400, 'Invalid payload')

    try {
      const user = await this.serviceUser.get(body.user)

      if (!user) ctx.throw(404, 'User not found')

      ctx.body = await this.serviceUser.put(user.id, {
        name: body.name,
        role: body.role
      })
      ctx.status = 200
      return
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}
