import { Context, Next } from 'koa'
import { IMiddlewareAuth, IServiceAuth, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceAuth, ServiceUsers } from '@/services/index.services'

export class MiddlewareAuth implements IMiddlewareAuth {
  private serviceAuth: IServiceAuth
  private serviceUsers: IServiceUsers

  constructor() {
    this.serviceAuth = new ServiceAuth()
    this.serviceUsers = new ServiceUsers()
  }

  async admin(ctx: Context, next: Next): Promise<void> {
    // await this.serviceUsers.get()
    await next()
  }

  async authenticated(ctx: Context, next: Next): Promise<void> {
    const googleCloudTasks = 'Google-Cloud-Tasks'
    const headers = ctx.headers

    if (!headers.authorization && headers['user-agent'] !== googleCloudTasks) ctx.throw(401, 'unauthorized')

    const token = headers.authorization?.split(/\d/)[1]

    if (!token) ctx.throw(400, 'invalid token')

    await next()
  }
}
