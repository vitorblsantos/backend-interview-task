import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { google } from '@google-cloud/tasks/build/protos/protos'

import { Environment } from '@/config/index.config'
import { EntityUsers } from '@/entities/index.entities'
import { IServiceAuth, IServiceAuthSignInRequest, IServiceAuthLoginResponse } from '@/interfaces/index.interfaces'
import { RepositoryUsers } from '@/repositories/index.repositories'
import { createQueue, createTask } from '@/utils/index.utils'

export class ServiceAuth implements IServiceAuth {
  private readonly repositoryUsers = new RepositoryUsers()
  private config = {
    region: Environment.COGNITO_REGION
  }
  private clientId = Environment.COGNITO_CLIENT_ID
  private cognito: CognitoIdentityProviderClient
  private queueUsers: google.cloud.tasks.v2.IQueue

  constructor() {
    this.cognito = new CognitoIdentityProviderClient(this.config)
  }

  async signIn({ email, password }: IServiceAuthSignInRequest): Promise<IServiceAuthLoginResponse> {
    this.queueUsers = await createQueue('users')

    const params = {
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password
      }
    }

    const command = new InitiateAuthCommand(params)
    const response = await this.cognito.send(command)

    return response['AuthenticationResult'] as IServiceAuthLoginResponse
  }

  async signUp(payload: Partial<EntityUsers> & { password: string }): Promise<string> {
    this.queueUsers = await createQueue('users')

    const params = {
      ClientId: this.clientId,
      Username: payload.email,
      Password: payload.password
    }

    const signupCommand = new SignUpCommand(params)
    const response = await this.cognito.send(signupCommand)

    console.log(response)

    createTask({
      parent: this.queueUsers.name,
      task: {
        dispatchCount: 3,
        httpRequest: {
          body: Buffer.from(
            JSON.stringify({
              email: payload.email,
              name: payload.name
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
