import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'

import { google } from '@google-cloud/tasks/build/protos/protos'

// import axios from 'axios'
// import JWT from 'jsonwebtoken'

import { Environment } from '@/config/index.config'
import { EntityUsers } from '@/entities/index.entities'
import { IServiceAuth, IServiceAuthSignInRequest, IServiceAuthLoginResponse } from '@/interfaces/index.interfaces'
import { createQueue, createTask } from '@/utils/index.utils'

export class ServiceAuth implements IServiceAuth {
  private clientId = Environment.COGNITO_CLIENT_ID
  private cognito: CognitoIdentityProviderClient
  private queueUsers: google.cloud.tasks.v2.IQueue

  constructor() {
    this.cognito = new CognitoIdentityProviderClient({
      region: Environment.COGNITO_REGION
    })
  }

  async isValidAccessToken(token: string): Promise<boolean> {
    return Promise.resolve(token === '1234')
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

    if (!data || !data['AccessToken']) throw '@signup/accessToken-not-found'

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

    return '@signup/success'
  }
}
