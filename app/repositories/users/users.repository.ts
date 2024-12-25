import { AppDataSource } from '@/config/index.config'
import { EntityUsers } from '@/entities/index.entities'
import { EUserStatus } from '@/interfaces/index.interfaces'
import { getDatePostgresTimestamp } from '@/utils/index.utils'
import { Repository } from 'typeorm'

export class RepositoryUsers {
  private repository: Repository<EntityUsers>

  constructor() {
    this.repository = AppDataSource.getRepository(EntityUsers)
  }

  async delete(reference: EntityUsers['id']): Promise<string> {
    await this.repository.update(reference, {
      status: EUserStatus['DISABLED'],
      deletedAt: getDatePostgresTimestamp(),
      updatedAt: getDatePostgresTimestamp()
    })

    return '@delete-users/success'
  }

  async fetch(): Promise<EntityUsers[] | null> {
    return await this.repository.find({ where: { status: EUserStatus.ENABLED } })
  }

  async get(id: EntityUsers['id']): Promise<EntityUsers | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async getByEmail(email: EntityUsers['email']): Promise<EntityUsers | null> {
    return await this.repository.findOne({ where: { email } })
  }

  async post(data: EntityUsers): Promise<string> {
    await this.repository
      .create({
        ...data,
        createdAt: getDatePostgresTimestamp(),
        updatedAt: getDatePostgresTimestamp()
      })
      .save()
    return '@post-users/success'
  }

  async put(reference: EntityUsers['id'], data: Partial<EntityUsers>): Promise<string> {
    await this.repository.update(reference, {
      ...data,
      updatedAt: getDatePostgresTimestamp()
    })

    return '@put-users/success'
  }
}
