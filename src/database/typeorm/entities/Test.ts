import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    OneToMany,
    JoinColumn,
    OneToOne
} from 'typeorm'
import { Course } from './Course'
import { Quiztest } from './Quiztest'

@Entity({ name: 'tests' })
export class Test {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Quiztest, (quiztest) => quiztest.test, { cascade: true })
    quiztests: Quiztest[]

    @OneToOne(() => Course, (course) => course.test)
    @JoinColumn()
    course: Course
}
