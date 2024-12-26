export interface IAuthToken {
  sub: string
  email: string
  scope: string
}

export interface IServiceAuthLoginRequest {
  username: string
  password: string
}

export type IServiceAuthLoginResponse = string

export interface IServiceAuth {
  login(payload: IServiceAuthLoginRequest): Promise<IServiceAuthLoginResponse>
}
