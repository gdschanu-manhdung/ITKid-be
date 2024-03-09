import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    ManyToOne,
    OneToMany
} from 'typeorm'
import { Category } from './Category'
import { Lesson } from './Lesson'
import { User } from './User'

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: number

    @Column()
    fee: number

    @Column()
    image: string

    @ManyToMany(() => User, (user) => user.coursesLearning)
    usersLearning: User[]

    @ManyToMany(() => User, (user) => user.coursesDone)
    usersDone: User[]

    @ManyToOne(() => Category, (category) => category.courses)
    category: Category

    @OneToMany(() => Lesson, (lesson) => lesson.course)
    lessons: Lesson[]
}
