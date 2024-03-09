import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToMany
} from 'typeorm'
import { Course } from './Course'
import { Lesson } from './Lesson'

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column({ type: 'date' })
    dob: string

    @Column()
    phone: string

    @Column()
    wallet: number

    @Column()
    points: number

    @ManyToMany(() => Course, (course) => course.usersLearning)
    coursesLearning: Course[]

    @ManyToMany(() => Course, (course) => course.usersDone)
    coursesDone: Course[]

    @ManyToMany(() => Lesson, (lesson) => lesson.usersDone)
    lessonsDone: Lesson[]
}
