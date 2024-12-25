import { Context } from 'koa'

import { IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceUsers } from '@/services/index.services'
import { EntityUsers } from '@/entities/index.entities'

export class ControllerUsers {
  private serviceUser: IServiceUsers

  constructor() {
    this.serviceUser = new ServiceUsers()
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
    const userData = ctx.request.body as { email: EntityUsers['email']; name: EntityUsers['name'] } | null

    if (!userData || !userData.email || !userData.name) ctx.throw(400, 'Please, provide userData')

    try {
      ctx.body = await this.serviceUser.post({
        email: userData.email,
        name: userData.name
      })
      ctx.status = 200
      return
    } catch (err) {
      ctx.throw(500, err)
    }
  }
}
