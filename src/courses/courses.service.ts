import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Like, Repository } from 'typeorm'
import { ICoursesService } from './courses'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Course } from 'src/database/typeorm/entities/Course'
import { CategoryDetails, CourseDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'
import { PayCourseDto } from './dto/PayCourse.dto'
import { User } from 'src/database/typeorm/entities/User'
import { Lesson } from 'src/database/typeorm/entities/Lesson'
import { Test } from 'src/database/typeorm/entities/Test'
import { SearchCategoryDto } from 'src/categories/dto/SearchCategory.dto'
import { SearchCourseDto } from './dto/SearchCourse.dto'

export class CoursesService implements ICoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Test)
        private readonly testRepository: Repository<Test>
    ) {}

    async getCoursesByCategory(categoryDetails: CategoryDetails) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: Number(categoryDetails.id) },
                order: { access: 'DESC' }
            })

            if (!category) {
                throw new HttpException('Wrong category', HttpStatus.NOT_FOUND)
            }

            const courses = await this.courseRepository.find({
                where: { category }
            })

            return courses
        } catch (error) {
            console.error(error)
        }
    }

    async addCourse(addCourseDto: AddCourseDto) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: addCourseDto.categoryId }
            })

            if (!category) {
                throw new HttpException('Wrong category', HttpStatus.NOT_FOUND)
            }

            const { name, fee, image } = addCourseDto

            const courseDetails = {
                category,
                name,
                fee,
                image,
                access: 0
            }

            const course = this.courseRepository.create(courseDetails)
            return await this.courseRepository.save(course)
        } catch (error) {
            console.error(error)
        }
    }

    async payCourse(paycourseDto: PayCourseDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: paycourseDto.userId }
            })

            if (!user) {
                throw new HttpException('Wrong user', HttpStatus.NOT_FOUND)
            }

            const course = await this.courseRepository.findOne({
                where: { id: paycourseDto.courseId }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            if (course.fee > user.wallet) {
                return 'Pay failed!'
            }

            const coursesLearning = user.coursesLearning
                ? [...user.coursesLearning, course]
                : [course]

            const updatedUser = {
                ...user,
                wallet: user.wallet - course.fee,
                coursesLearning
            }

            await this.userRepository.save(updatedUser)
            return 'Pay successfully!'
        } catch (error) {
            console.error(error)
        }
    }

    async doneCourse(paycourseDto: PayCourseDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: paycourseDto.userId }
            })

            if (!user) {
                throw new HttpException('Wrong user', HttpStatus.NOT_FOUND)
            }

            const course = await this.courseRepository.findOne({
                where: { id: paycourseDto.courseId }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            if (user.coursesLearning && user.coursesLearning.includes(course)) {
                const coursesLearning = user.coursesLearning.filter(
                    (courseLearning) => courseLearning.id !== course.id
                )
                const coursesDone = user.coursesDone
                    ? [...user.coursesDone, course]
                    : [course]

                const updatedUser = {
                    ...user,
                    wallet: user.wallet - course.fee,
                    coursesLearning,
                    coursesDone
                }
                await this.userRepository.save(updatedUser)
                return 'Course done!'
            } else {
                throw new HttpException('Invalid Course', HttpStatus.NOT_FOUND)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async editCourse(courseDetails: CourseDetails) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: courseDetails.id }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const { name, image, fee } = courseDetails

            const editedCourse = {
                ...course,
                name,
                image,
                fee
            }

            return await this.categoryRepository.save(editedCourse)
        } catch (error) {
            console.error(error)
        }
    }

    async deleteCourse(courseDetails: CourseDetails) {
        const course = await this.courseRepository.findOne({
            where: { id: courseDetails.id },
            relations: ['usersLearning', 'usersDone', 'lessons', 'test']
        })

        if (!course) {
            throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
        }

        // Xóa các mối quan hệ ManyToMany
        course.usersLearning = []
        course.usersDone = []
        await this.courseRepository.save(course)

        // Xóa các Lesson liên quan
        await this.lessonRepository.remove(course.lessons)

        // Xóa Test liên quan
        await this.testRepository.remove(course.test)

        // Sau đó xóa Course
        await this.courseRepository.remove(course)

        return 'Delete successfully'
    }

    async updateAccess(courseDetails: CourseDetails) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: courseDetails.id }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const updatedCourse = {
                ...course,
                access: course.access + 1
            }

            return await this.courseRepository.save(updatedCourse)
        } catch (error) {
            console.error(error)
        }
    }

    async getCoursesByString(searchCourseDto: SearchCourseDto) {
        try {
            const courses = await this.courseRepository.find({
                where: { name: Like(`%${searchCourseDto.searchQuery}%`) }
            })

            return courses
        } catch (error) {
            console.error(error)
        }
    }
}
