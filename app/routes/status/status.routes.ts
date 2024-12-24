import { Router } from 'express'
import { Alive } from '../../controllers/index.controllers'

const router = Router()

router.get('/', (_, res) => res.status(200).send(Alive()))

export const Status = router
