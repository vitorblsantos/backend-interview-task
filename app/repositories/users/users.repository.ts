import { AppDataSource } from '@/config/index.config'
import { EntityUsers } from '@/entities/index.entities'
import { Repository } from 'typeorm'

export class RepositoryUsers {
  private repository: Repository<EntityUsers>

  constructor() {
    this.repository = AppDataSource.getRepository(EntityUsers)
  }

  async fetch(): Promise<EntityUsers[] | null> {
    return await this.repository.find()
  }

  async get(email: string): Promise<EntityUsers | null> {
    return await this.repository.findOne({ where: { email } })
  }

  async post(data: EntityUsers): Promise<string> {
    await this.repository.create(data).save()
    return '@create-users/success'
  }
}
