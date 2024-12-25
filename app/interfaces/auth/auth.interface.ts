import { Context, Next } from 'koa'

export interface IAuthToken {
  sub: string
  email: string
  scope: string
}

export interface IMiddlewareAuth {
  validateToken(ctx: Context & { token?: IAuthToken }, next: Next): Promise<void>
}
