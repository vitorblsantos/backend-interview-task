export interface IAuthToken {
  sub: string
  email: string
  scope: string
}

export interface IServiceAuthLoginRequest {
  username: string
  password: string
}

export interface IServiceAuthLoginResponse {
  AccessToken: string
  ExpiresIn: number
  IdToken: string
  RefreshToken: string
  TokenType: string
}

export interface IServiceAuth {
  login(payload: IServiceAuthLoginRequest): Promise<IServiceAuthLoginResponse>
}
