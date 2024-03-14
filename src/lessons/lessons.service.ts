import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { User } from 'src/database/typeorm/entities/User'
import { CourseDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { AddLessonDto } from './dto/AddLesson.dto'
import { DoneLessonDto } from './dto/DoneLesson.dto'
import { ILessonsService } from './lessons'

export class LessonsService implements ILessonsService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

            if (!lesson) {
                throw new HttpException('Wrong lesson', HttpStatus.NOT_FOUND)
            }

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
