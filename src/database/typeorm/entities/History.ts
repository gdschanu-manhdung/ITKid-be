import { FundInEnum } from 'src/utils/constants'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'histories' })
export class History {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    amount: number

    @Column({ type: 'enum', enum: FundInEnum })
    status: string
}
