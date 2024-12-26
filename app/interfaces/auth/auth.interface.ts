import { Context, Next } from 'koa'

export interface IAuthToken {
  sub: string
  email: string
  scope: string
}

export interface IServiceAuthLoginRequest {
  email: string
  password: string
}

export interface IServiceAuthLoginResponse {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
  TokenType: string
}

export interface IMiddlewareAuth {
  admin(ctx: Context, next: Next): Promise<void>
  authenticated(ctx: Context, next: Next): Promise<void>
}

export interface IServiceAuth {
  signIn(payload: IServiceAuthLoginRequest): Promise<IServiceAuthLoginResponse>
}
