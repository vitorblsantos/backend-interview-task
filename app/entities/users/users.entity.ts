import { Entity, PrimaryColumn, Column, BeforeInsert, BaseEntity } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { EUserRole, EUserStatus } from '@/interfaces/index.interfaces'

@Entity('users')
export class EntityUsers extends BaseEntity {
  @PrimaryColumn()
  id!: string

  @Column()
  email!: string

  @Column()
  name!: string

  @Column({
    type: 'enum',
    enum: EUserRole,
    default: EUserRole.USER
  })
  role!: EUserRole

  @Column({
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.ENABLED
  })
  status!: EUserStatus

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at!: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at!: Date

  @BeforeInsert()
  generateId() {
    this.id = uuidv4()
  }
}
