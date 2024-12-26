import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { ICognitoConfig } from '@/interfaces/index.interfaces'

export class CognitoAuth {
  private userPoolId: string
  private clientId: string
  private username: string
  private password: string

  constructor(config: ICognitoConfig) {
    this.userPoolId = config.userPoolId
    this.clientId = config.clientId
    this.username = config.username
    this.password = config.password
  }

  private getUserPool(): CognitoUserPool {
    return new CognitoUserPool({
      UserPoolId: this.userPoolId,
      ClientId: this.clientId
    })
  }

  private getCognitoUser(userPool: CognitoUserPool): CognitoUser {
    return new CognitoUser({
      Pool: userPool,
      Username: this.username
    })
  }

  private getAuthenticationDetails(): AuthenticationDetails {
    return new AuthenticationDetails({
      Username: this.username,
      Password: this.password
    })
  }

  public async getToken(): Promise<string | null> {
    const userPool = this.getUserPool()
    const cognitoUser = this.getCognitoUser(userPool)
    const authDetails = this.getAuthenticationDetails()

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolve(result.getIdToken().getJwtToken())
        },
        onFailure: err => {
          console.error('Authentication failed:', err)
          reject(err)
        },
        newPasswordRequired: () => {
          const newPassword = 'Caveo@2024'
          cognitoUser.completeNewPasswordChallenge(
            newPassword,
            {},
            {
              onSuccess: result => {
                resolve(result.getIdToken().getJwtToken())
              },
              onFailure: err => {
                console.error('Failed to complete new password challenge:', err)
                reject(err)
              }
            }
          )
        }
      })
    })
  }
}
