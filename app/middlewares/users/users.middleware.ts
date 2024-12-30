import { Context, Next } from 'koa'
import { IMiddlewareUsers, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceUsers } from '@/services/index.services'

export class MiddlewareUsers implements IMiddlewareUsers {
  private serviceUsers: IServiceUsers

  constructor() {
    this.serviceUsers = new ServiceUsers()

    this.execute = this.execute.bind(this)
  }

  async execute(ctx: Context, next: Next): Promise<void> {
    const googleCloudTasks = 'Google-Cloud-Tasks'
    const headers = ctx.headers
    if (headers['user-agent'] === googleCloudTasks) return await next()

    const user = await this.serviceUsers.getByCognitoId(ctx.state.cognitoId)

    if (!user) {
      ctx.body = {
        error: '@users-middleware/execute',
        message: 'Unauthorized'
      }
      ctx.status = 401
      return Promise.resolve()
    }

    ctx.state.user = user

    return await next()
  }
}
