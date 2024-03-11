import { Category } from 'src/database/typeorm/entities/Category'
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

export type CategoryDetails = {
    id?: number
    name?: string
    courses?: Course[]
}

export type CourseDetails = {
    id?: number
    name?: string
    image?: string
    category?: Category
    fee?: number
}

export type LessonDetails = {
    id?: number
    name?: string
    description?: string
    lesson?: Lesson
}
