import { DataSource } from 'typeorm'

import { Environment } from '@/config/environment/environment.config'
import { EntityUsers } from '@/entities/index.entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: Environment.POSTGRES_HOST,
  port: Environment.POSTGRES_PORT,
  username: Environment.POSTGRES_USER,
  password: Environment.POSTGRES_PASSWORD,
  database: Environment.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [EntityUsers],
  migrations: ['app/migrations/*.ts']
})
