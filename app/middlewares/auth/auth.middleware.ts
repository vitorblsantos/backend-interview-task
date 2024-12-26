import { Context, Next } from 'koa'
import { IAuthToken, ICognitoConfig } from '@/interfaces/index.interfaces'
import { CognitoAuth, Environment } from '@/config/index.config'

export class MiddlewareAuth {
  async validateToken(ctx: Context & { token?: IAuthToken }, next: Next): Promise<void> {
    const authHeader = ctx.headers['authorization']
    if (!authHeader) ctx.throw(401, 'Authorization header missing')

    const config: ICognitoConfig = {
      userPoolId: Environment.COGNITO_USER_POOL_ID,
      clientId: Environment.COGNITO_CLIENT_ID,
      username: 'vitorblsantos@gmail.com',
      password: 'Caveo@2024'
    }

    const auth = new CognitoAuth(config)

    const token = await auth.getToken()

    console.log(token)

    next()
  }
}
