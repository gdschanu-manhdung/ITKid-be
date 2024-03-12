import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToOne,
    JoinColumn
} from 'typeorm'
import { Lesson } from './Lesson'

@Entity({ name: 'quizlessons' })
export class Quizlesson {
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

    @OneToOne(() => Lesson, (lesson) => lesson.quizlesson)
    @JoinColumn()
    lesson: Lesson
}
