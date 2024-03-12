import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm'
import { Quiztest } from './Quiztest'

@Entity({ name: 'tests' })
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Quiztest, (quiztest) => quiztest.test, { cascade: true })
    quiztests: Quiztest[]
}
