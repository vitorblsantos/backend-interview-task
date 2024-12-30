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

export interface IServiceAuthValidateResponse {
  sub: string
  iss: string
  client_id: string
  origin_jti: string
  event_id: string
  token_use: string
  scope: string
  auth_time: number
  exp: number
  iat: number
  jti: string
  username: string
}

export interface IMiddlewareAuth {
  execute(ctx: Context, next: Next): Promise<void>
}

export interface IServiceAuth {
  isValidAccessToken(token: string): Promise<null | (JWTPayload & IServiceAuthValidateResponse)>
  signIn(payload: IServiceAuthSignInRequest): Promise<IServiceAuthLoginResponse>
  signUp(payload: Partial<EntityUsers> & { password: string }): Promise<string>
}
