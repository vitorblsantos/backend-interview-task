import { EntityUsers } from '@/entities/index.entities'

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum EUserStatus {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED'
}

export interface IServiceUsers {
  get(email: string): Promise<EntityUsers | null>
  post(data: { email: EntityUsers['email']; name: EntityUsers['name'] }): Promise<string>
  fetch(): Promise<EntityUsers[] | null>
}
