import { EntityUsers } from '@/entities/index.entities'
import { IServiceUsers } from '@/interfaces/index.interfaces'
import { RepositoryUsers } from '@/repositories/index.repositories'

export class ServiceUsers implements IServiceUsers {
  private readonly repositoryUsers = new RepositoryUsers()

  async get(email: string): Promise<EntityUsers | null> {
    return await this.repositoryUsers.get(email)
  }

  async fetch(): Promise<EntityUsers[] | null> {
    return await this.repositoryUsers.fetch()
  }

  async post(data: EntityUsers): Promise<string> {
    return await this.repositoryUsers.post(data)
  }
}
