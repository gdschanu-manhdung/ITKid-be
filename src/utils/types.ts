import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'

export type UserDetails = {
    id?: number
    email?: string
    password?: string
    name?: string
    dob?: string
    phone?: string
    wallet?: number
    points?: number
    coursesLearning?: Course[]
    coursesDone?: Course[]
    lessonsDone?: Lesson[]
}
