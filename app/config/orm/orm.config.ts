import { DataSource } from 'typeorm'

import { Environment } from '@/config/environment/environment.config'
import { EntityUsers } from '@/entities/index.entities'

export const AppDataSource = new DataSource({
  entities: [EntityUsers],
  logging: true,
  synchronize: false,
  type: 'postgres',
  url: `postgresql://${Environment.POSTGRES_USER}:${Environment.POSTGRES_PASSWORD}@${Environment.POSTGRES_HOST}:${Environment.POSTGRES_PORT}/${Environment.POSTGRES_DB}?ssl=true&sslmode=no-verify&application_name=rapidapp_nodejs`
})
