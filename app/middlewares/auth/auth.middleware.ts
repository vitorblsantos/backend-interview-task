import { Context, Next } from 'koa'
import { IMiddlewareAuth, IServiceAuth } from '@/interfaces/index.interfaces'
import { ServiceAuth } from '@/services/index.services'

export class MiddlewareAuth implements IMiddlewareAuth {
  private serviceAuth: IServiceAuth

  constructor() {
    this.serviceAuth = new ServiceAuth()

    this.execute = this.execute.bind(this)
  }

  async execute(ctx: Context, next: Next): Promise<void> {
    const googleCloudTasks = 'Google-Cloud-Tasks'
    const headers = ctx.headers

    if (!headers.authorization && headers['user-agent'] !== googleCloudTasks) ctx.throw(401)
    if (headers['user-agent'] === googleCloudTasks) return await next()

    const token = headers.authorization?.split(' ')[1]

    if (!token) ctx.throw(400, 'Bad request')

    try {
      const decodedToken = await this.serviceAuth.isValidAccessToken(token)

      if (!decodedToken) return ctx.throw(401)

      ctx.state.cognitoId = decodedToken.username

      return await next()
    } catch (err) {
      ctx.body = {
        error: '@auth-middleware/execute',
        message: err.code
      }
      ctx.status = 401
      return Promise.resolve()
    }
  }
}
