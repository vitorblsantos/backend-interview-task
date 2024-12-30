import { EntityUsers } from '@/entities/index.entities'
import { IServiceUsers } from '@/interfaces/index.interfaces'
import { RepositoryUsers } from '@/repositories/index.repositories'

export class ServiceUsers implements IServiceUsers {
  private readonly repositoryUsers = new RepositoryUsers()

  async delete(reference: EntityUsers['id']): Promise<string> {
    return await this.repositoryUsers.delete(reference)
  }

  async get(id: EntityUsers['id']): Promise<EntityUsers | null> {
    return await this.repositoryUsers.get(id)
  }

  async getByCognitoId(cognitoId: EntityUsers['cognitoId']): Promise<EntityUsers | null> {
    return await this.repositoryUsers.getByCognitoId(cognitoId)
  }

  async getByEmail(email: EntityUsers['email']): Promise<EntityUsers | null> {
    return await this.repositoryUsers.getByEmail(email)
  }

  async fetch(): Promise<EntityUsers[] | null> {
    return await this.repositoryUsers.fetch()
  }

  async put(
    reference: EntityUsers['id'],
    data: {
      isOnboarded: EntityUsers['isOnboarded']
      email: EntityUsers['email']
      name: EntityUsers['name']
      role: EntityUsers['role']
    }
  ): Promise<string> {
    return await this.repositoryUsers.put(reference, data)
  }

  async post(data: Partial<EntityUsers>): Promise<EntityUsers> {
    return await this.repositoryUsers.post(data)
  }
}
