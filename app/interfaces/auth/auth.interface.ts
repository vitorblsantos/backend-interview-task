import { EntityUsers } from '@/entities/index.entities'
import { JWTPayload } from 'jose'
import { Context, Next } from 'koa'

export interface IAuthToken {
  sub: string
  email: string
  scope: string
}

export interface IServiceAuthSignInRequest {
  email: string
  password: string
}

export type IServiceAuthLoginResponse = string

export interface IMiddlewareAuth {
  execute(ctx: Context, next: Next): Promise<void>
}

export interface IServiceAuth {
  isValidAccessToken(token: string): Promise<boolean | JWTPayload>
  signIn(payload: IServiceAuthSignInRequest): Promise<IServiceAuthLoginResponse>
  signUp(payload: Partial<EntityUsers> & { password: string }): Promise<string>
}
