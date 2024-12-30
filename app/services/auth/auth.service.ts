import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'

import { google } from '@google-cloud/tasks/build/protos/protos'
import { KeyObject } from 'crypto'
import { jwtVerify, importJWK, JWTPayload } from 'jose'
import axios from 'axios'

import { Environment } from '@/config/index.config'
import { EntityUsers } from '@/entities/index.entities'
import { IServiceAuth, IServiceAuthSignInRequest, IServiceAuthLoginResponse } from '@/interfaces/index.interfaces'
import { createQueue, createTask } from '@/utils/index.utils'

interface Jwk {
  kid: string
  kty: string
  use: string
  n: string
  e: string
}

export class ServiceAuth implements IServiceAuth {
  private clientId = Environment.COGNITO_CLIENT_ID
  private cognito: CognitoIdentityProviderClient
  private queueUsers: google.cloud.tasks.v2.IQueue

  constructor() {
    this.cognito = new CognitoIdentityProviderClient({
      region: Environment.COGNITO_REGION
    })
  }

  private async getPublicKeys(): Promise<Record<string, KeyObject>> {
    const url = `https://cognito-idp.${Environment.COGNITO_REGION}.amazonaws.com/${Environment.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
    const response = await axios.get<{ keys: Jwk[] }>(url)
    const keys = response.data.keys

    const publicKeys: Record<string, KeyObject> = {}
    for (const key of keys) {
      const publicKey = await importJWK(key, 'RS256')
      if (publicKey instanceof KeyObject) {
        publicKeys[key.kid] = publicKey
      }
    }

    return publicKeys
  }

  async isValidAccessToken(token: string): Promise<boolean | JWTPayload> {
    const decodedHeader = JSON.parse(Buffer.from(token.split('.')[0], 'base64').toString('utf-8'))
    const kid = decodedHeader.kid

    if (!kid) throw 'token-does-not-have-kid-header'

    const publicKeys = await this.getPublicKeys()
    const publicKey = publicKeys[kid]

    if (!publicKey) throw 'public-key-not-found'

    const { payload } = await jwtVerify(token, publicKey)

    if (!payload) return false

    return payload
  }

  async signIn({ email, password }: IServiceAuthSignInRequest): Promise<IServiceAuthLoginResponse> {
    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }

    const signInCommand = new InitiateAuthCommand(params)
    const signInResponse = await this.cognito.send(signInCommand)

    const data = signInResponse['AuthenticationResult']

    if (!data || !data['AccessToken']) throw 'accessToken-not-found'

    return data['AccessToken']
  }

  async signUp(payload: Partial<EntityUsers> & { password: string }): Promise<string> {
    this.queueUsers = await createQueue('users')

    const params = {
      ClientId: this.clientId,
      Username: payload.email,
      Password: payload.password,
      TemporaryPassword: Environment.CAVEO_DEFAULT_PASSWORD,
      UserAttributes: [
        {
          Name: 'email',
          Value: payload.email
        }
      ]
    }

    const signupCommand = new SignUpCommand(params)
    const signupResponse = await this.cognito.send(signupCommand)

    await createTask({
      parent: this.queueUsers.name,
      task: {
        dispatchCount: 3,
        httpRequest: {
          body: Buffer.from(
            JSON.stringify({
              email: payload.email,
              name: payload.name,
              cognitoId: signupResponse['UserSub']
            })
          ).toString('base64'),
          httpMethod: 'POST',
          url: `${Environment.APP_URL}/users`
        }
      }
    })

    return 'success'
  }
}
