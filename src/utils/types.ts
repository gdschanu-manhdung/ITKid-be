import { Category } from 'src/database/typeorm/entities/Category'
import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Quiztest } from 'src/database/typeorm/entities/Quiztest'
import { Test } from 'src/database/typeorm/entities/Test'

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
    access?: number
}

export type CourseDetails = {
    id?: number
    name?: string
    image?: string
    category?: Category
    fee?: number
    access?: number
}

export type LessonDetails = {
    id?: number
    name?: string
    description?: string
    lesson?: Lesson
}

export type QuizlessonDetails = {
    id?: number
    question?: string
    answer_1?: string
    answer_2?: string
    answer_3?: string
    answer_4?: string
    true_answer?: number
    lesson?: Lesson
}

export type TestDetails = {
    id?: number
    name?: string
    quiztests?: Quiztest[]
    course?: Course
}

export type QuiztestDetails = {
    id?: number
    question?: string
    answer_1?: string
    answer_2?: string
    answer_3?: string
    answer_4?: string
    true_answer?: number
    test?: Test
}

export type QuiztwoDetails = {
    id?: number
    question?: string
    answer_1?: string
    answer_2?: string
    true_answer?: number
}

export type FundInDetails = {
    id?: number
    email?: string
    amount?: string
    status?: string
}
