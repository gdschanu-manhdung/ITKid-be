import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToOne,
    ManyToOne
} from 'typeorm'
import { Lesson } from './Lesson'
import { Test } from './Test'

@Entity({ name: 'quizfours' })
export class Quizfour {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    question: string

    @Column()
    answer_1: string

    @Column()
    answer_2: string

    @Column()
    answer_3: string

    @Column()
    answer_4: string

    @Column()
    true_answer: number

    @OneToOne(() => Lesson, (lesson) => lesson.quizfour)
    lesson: Lesson

    @ManyToOne(() => Test, (test) => test.quizzesfour)
    test: Test
}
