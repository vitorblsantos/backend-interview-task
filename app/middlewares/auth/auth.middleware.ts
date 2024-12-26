import { Context, Next } from 'koa'
import { IAuthToken } from '@/interfaces/index.interfaces'

export class MiddlewareAuth {
  async validateToken(ctx: Context & { token?: IAuthToken }, next: Next): Promise<void> {
    const authHeader = ctx.headers['authorization']
    if (!authHeader) ctx.throw(401, 'Authorization header missing')

    await next()
  }
}
