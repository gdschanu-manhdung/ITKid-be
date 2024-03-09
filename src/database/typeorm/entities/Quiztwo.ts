import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity({ name: 'quiztwos' })
export class Quiztwo {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column()
    answer_1: string

    @Column()
    answer_2: string

    @Column()
    true_answer: number
}
