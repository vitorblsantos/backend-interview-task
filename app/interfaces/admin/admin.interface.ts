import { Context, Next } from 'koa'

export interface IMiddlewareAdmin {
  execute(ctx: Context, next: Next): Promise<void>
}
