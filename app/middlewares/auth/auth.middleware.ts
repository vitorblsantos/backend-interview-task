import { IAuthToken, IMiddlewareAuth } from '@/interfaces/index.interfaces'
import { Context, Next } from 'koa'

export class MiddlewareAuth implements IMiddlewareAuth {
  async validateToken(ctx: Context & { token?: IAuthToken }, next: Next): Promise<void> {
    const authHeader = ctx.headers['authorization']
    if (!authHeader) ctx.throw(401, 'Authorization header missing')

    next()
  }
}
