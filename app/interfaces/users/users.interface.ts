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
  delete(reference: EntityUsers['id']): Promise<string>
  fetch(): Promise<EntityUsers[] | null>
  get(email: string): Promise<EntityUsers | null>
  put(reference: EntityUsers['id'], data: { name: EntityUsers['name']; role: EntityUsers['role'] }): Promise<string>
  post(data: { email: EntityUsers['email']; name: EntityUsers['name'] }): Promise<EntityUsers>
}
