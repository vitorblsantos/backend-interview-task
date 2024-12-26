import { IServiceAuth, IServiceAuthLoginRequest, IServiceAuthLoginResponse } from '@/interfaces/index.interfaces'
import { RepositoryUsers } from '@/repositories/index.repositories'

export class ServiceAuth implements IServiceAuth {
  private readonly repositoryUsers = new RepositoryUsers()

  constructor() {}

  async login({ password, username }: IServiceAuthLoginRequest): Promise<IServiceAuthLoginResponse> {
    return `${password}:${username}`
  }
}
