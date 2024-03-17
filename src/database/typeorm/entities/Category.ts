import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Course } from './Course'

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    access: number

    @OneToMany(() => Course, (course) => course.category, { cascade: true })
    courses: Course[]
}
