import { google } from '@google-cloud/tasks/build/protos/protos'
import { Context } from 'koa'

import { Environment } from '@/config/index.config'
import { IServiceAuth, IServiceAuthLoginRequest, IServiceUsers } from '@/interfaces/index.interfaces'
import { ServiceAuth, ServiceUsers } from '@/services/index.services'
import { createQueue, createTask } from '@/utils/index.utils'

export class ControllerAuth {
  private serviceAuth: IServiceAuth
  private serviceUsers: IServiceUsers
  private queueUsers: google.cloud.tasks.v2.IQueue

  constructor() {
    this.serviceAuth = new ServiceAuth()
    this.serviceUsers = new ServiceUsers()
  }

  async signIn(ctx: Context): Promise<void> {
    const body = ctx.request.body as IServiceAuthLoginRequest

    if (!body || !body.email || !body.password) ctx.throw(400, 'Bad request')

    try {
      const user = await this.serviceUsers.get(body.email)

      if (!user) {
        this.queueUsers = await createQueue('users')

        createTask({
          parent: this.queueUsers.name,
          task: {
            dispatchCount: 3,
            httpRequest: {
              body: Buffer.from(
                JSON.stringify({
                  email: body.email
                })
              ).toString('base64'),
              httpMethod: 'POST',
              url: `${Environment.APP_URL}/users`
            }
          }
        })
      }

      const token = await this.serviceAuth.signIn(body)

      ctx.body = token
      ctx.status = 201
      return
    } catch (error) {
      ctx.throw(500, error)
    }
  }
}
