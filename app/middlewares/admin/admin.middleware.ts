import { Context, Next } from 'koa'
import { EUserRole, IMiddlewareAdmin, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceUsers } from '@/services/index.services'

export class MiddlewareAdmin implements IMiddlewareAdmin {
  private serviceUsers: IServiceUsers

  constructor() {
    this.serviceUsers = new ServiceUsers()

    this.execute = this.execute.bind(this)
  }

  async execute(ctx: Context, next: Next): Promise<void> {
    const googleCloudTasks = 'Google-Cloud-Tasks'
    const headers = ctx.headers
    if (headers['user-agent'] === googleCloudTasks) return await next()

    const user = await this.serviceUsers.getByCognitoId(ctx.state.user)

    if (!user || user.role !== EUserRole.ADMIN) {
      ctx.body = {
        error: '@auth-admin/execute',
        message: 'Unauthorized'
      }
      ctx.status = 401
      return Promise.resolve()
    }

    return await next()
  }
}
