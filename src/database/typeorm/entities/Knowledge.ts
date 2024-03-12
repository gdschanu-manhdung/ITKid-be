import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Lesson } from './Lesson'

@Entity({ name: 'knowledges' })
export class Knowledge {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => Lesson, (lesson) => lesson.knowledges, { cascade: true })
    lesson: Lesson
}
