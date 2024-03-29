import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { CourseDetails, LessonDetails } from 'src/utils/types'
import { User } from 'src/database/typeorm/entities/User'
import { Repository } from 'typeorm'
import { AddLessonDto } from './dto/AddLesson.dto'
import { DoneLessonDto } from './dto/DoneLesson.dto'
import { ILessonsService } from './lessons'
import { Knowledge } from 'src/database/typeorm/entities/Knowledge'
import { Quizlesson } from 'src/database/typeorm/entities/Quizlesson'

export class LessonsService implements ILessonsService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Knowledge)
        private readonly knowledgeRepository: Repository<Knowledge>,
        @InjectRepository(Quizlesson)
        private readonly quizlessonRepository: Repository<Quizlesson>
    ) {}

    async getLessonsByCourse(courseDetails: CourseDetails) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: Number(courseDetails.id) }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const lessons = await this.lessonRepository.find({
                where: { course }
            })

            return lessons
        } catch (error) {
            console.error(error)
        }
    }

    async addLesson(addLessonDto: AddLessonDto) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: addLessonDto.courseId }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const { name } = addLessonDto

            const lessonDetails = {
                course,
                name
            }

            const lesson = this.lessonRepository.create(lessonDetails)
            return await this.lessonRepository.save(lesson)
        } catch (error) {
            console.error(error)
        }
    }

    async editLesson(lessonDetails: LessonDetails) {
        try {
            const lesson = await this.lessonRepository.findOne({
                where: { id: lessonDetails.id }
            })

            if (!lesson) {
                throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
            }

            const { name } = lessonDetails

            const editedLesson = {
                ...lesson,
                name
            }

            return await this.lessonRepository.save(editedLesson)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteLesson(lessonDetails: LessonDetails) {
        const lesson = await this.lessonRepository.findOne({
            where: { id: lessonDetails.id },
            relations: ['usersDone', 'knowledges', 'quizlesson']
        })

        if (!lesson) {
            throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
        }

        lesson.usersDone = []
        await this.lessonRepository.save(lesson)

        await this.knowledgeRepository.remove(lesson.knowledges)

        await this.quizlessonRepository.remove(lesson.quizlesson)

        await this.lessonRepository.remove(lesson)

        return 'Delete successfully'
    }

    async doneLesson(doneLessonDto: DoneLessonDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: doneLessonDto.userId }
            })

            if (!user) {
                throw new HttpException('Wrong user', HttpStatus.NOT_FOUND)
            }

            const lesson = await this.lessonRepository.findOne({
                where: { id: doneLessonDto.lessonId }
            })

            const lessonsDone = user.lessonsDone
                ? [...user.lessonsDone, lesson]
                : [lesson]

            const updatedUser = {
                ...user,
                lessonsDone
            }
            await this.userRepository.save(updatedUser)
            return 'Lesson done!'
        } catch (error) {
            console.error(error)
        }
    }
}
