import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm'
import { Quizfour } from './Quizfour'

@Entity({ name: 'tests' })
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @OneToMany(() => Quizfour, (quizfour) => quizfour.test)
    quizzesfour: Quizfour[]
}
