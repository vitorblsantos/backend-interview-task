import { str, envsafe, port } from 'envsafe'

export const Environment = envsafe({
  APP_NAME: str({
    default: 'backend-interview-task'
  }),
  APP_PORT: port({
    devDefault: 8080,
    desc: 'The port the app is running on',
    example: 8080
  }),
  NODE_ENV: str({
    devDefault: 'development',
    choices: ['development', 'production']
  })
})
