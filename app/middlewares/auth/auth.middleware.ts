import { Context, Next } from 'koa'
import { IMiddlewareAuth, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceUsers } from '@/services/index.services'

export class MiddlewareAuth implements IMiddlewareAuth {
  private serviceUsers: IServiceUsers
  private readonly googleCloudTasks: string = 'Google-Cloud-Tasks'

  constructor() {
    this.serviceUsers = new ServiceUsers()
  }

  async admin(ctx: Context, next: Next): Promise<void> {
    // await this.serviceUsers.get()
    await next()
  }

  async authenticated(ctx: Context, next: Next): Promise<void> {
    const headers = ctx.headers
    if (!headers.authorization && headers['user-agent'] !== this.googleCloudTasks)
      ctx.throw(401, 'Authorization header missing')

    await next()
  }
}
