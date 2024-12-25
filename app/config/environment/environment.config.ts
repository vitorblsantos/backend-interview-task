import { str, envsafe, port } from 'envsafe'

export const Environment = envsafe({
  APP_NAME: str({
    default: 'backend-interview-task'
  }),
  APP_PORT: port({
    devDefault: 8080,
    desc: 'The port that the App is running on',
    example: 8080
  }),
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'production']
  }),
  POSTGRES_DB: str(),
  POSTGRES_HOST: str({
    devDefault: 'localhost'
  }),
  POSTGRES_PASSWORD: str({
    devDefault: 'toor'
  }),
  POSTGRES_PORT: port({
    devDefault: 5432
  }),
  POSTGRES_USER: str({
    devDefault: 'root'
  })
})
