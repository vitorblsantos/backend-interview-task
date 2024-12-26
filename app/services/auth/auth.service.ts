import { Environment } from '@/config/index.config'
import { IServiceAuth, IServiceAuthLoginRequest, IServiceAuthLoginResponse } from '@/interfaces/index.interfaces'
import { RepositoryUsers } from '@/repositories/index.repositories'
import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand
} from '@aws-sdk/client-cognito-identity-provider'

export class ServiceAuth implements IServiceAuth {
  private readonly repositoryUsers = new RepositoryUsers()
  private config = {
    region: Environment.COGNITO_REGION
  }
  private clientId = Environment.COGNITO_CLIENT_ID
  private cognito: CognitoIdentityProviderClient

  constructor() {
    this.cognito = new CognitoIdentityProviderClient(this.config)
  }

  async signIn({ email, password }: IServiceAuthLoginRequest): Promise<IServiceAuthLoginResponse> {
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
}
