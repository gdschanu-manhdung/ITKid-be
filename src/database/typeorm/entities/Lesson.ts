import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinTable
} from 'typeorm'
import { Course } from './Course'
import { Knowledge } from './Knowledge'
import { Quizlesson } from './Quizlesson'
import { User } from './User'

@Entity({ name: 'lessons' })
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    isFree: boolean

    @ManyToMany(() => User, (user) => user.lessonsDone)
    @JoinTable()
    usersDone: User[]

    @ManyToOne(() => Course, (course) => course.lessons)
    course: Course

    @OneToMany(() => Knowledge, (knowledge) => knowledge.lesson)
    knowledges: Knowledge[]

    @OneToOne(() => Quizlesson, (quizfour) => quizfour.lesson, {
        cascade: true
    })
    quizlesson: Quizlesson
}
