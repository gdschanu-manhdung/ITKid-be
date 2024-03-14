import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinTable
} from 'typeorm'
import { Category } from './Category'
import { Lesson } from './Lesson'
import { Test } from './Test'
import { User } from './User'

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    fee: number

    @Column()
    image: string

    @ManyToMany(() => User, (user) => user.coursesLearning, { cascade: true })
    @JoinTable()
    usersLearning: User[]

    @ManyToMany(() => User, (user) => user.coursesDone, { cascade: true })
    @JoinTable()
    usersDone: User[]

    @ManyToOne(() => Category, (category) => category.courses)
    category: Category

    @OneToMany(() => Lesson, (lesson) => lesson.course, { cascade: true })
    lessons: Lesson[]

    @OneToOne(() => Test, (test) => test.course, { cascade: true })
    test: Test
}
