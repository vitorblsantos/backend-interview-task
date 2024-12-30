import { Context, Next } from 'koa'
import { EntityUsers } from '@/entities/index.entities'

export enum EUserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum EUserStatus {
  DISABLED = 'DISABLED',
  ENABLED = 'ENABLED'
}

export interface IMiddlewareUsers {
  execute(ctx: Context, next: Next): Promise<void>
}

export interface IServiceUsers {
  delete(reference: EntityUsers['id']): Promise<string>
  fetch(): Promise<EntityUsers[] | null>
  get(id: string): Promise<EntityUsers | null>
  getByCognitoId(cognitoId: string): Promise<EntityUsers | null>
  getByEmail(email: string): Promise<EntityUsers | null>
  put(
    reference: EntityUsers['id'],
    data: { isOnboarded?: EntityUsers['isOnboarded']; name: EntityUsers['name']; role?: EntityUsers['role'] }
  ): Promise<string>
  post(data: Partial<EntityUsers>): Promise<EntityUsers>
}
