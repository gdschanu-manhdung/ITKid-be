import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './User'

@Entity({ name: 'recovery' })
export class Recovery {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.recovery)
    user: User

    @Column()
    recoveryCode: string

    @Column({ type: 'date' })
    generatedTime: string
}
