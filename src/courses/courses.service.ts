import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/database/typeorm/entities/Category'
import { Repository } from 'typeorm'
import { ICoursesService } from './courses'
import { HttpException, HttpStatus } from '@nestjs/common'
import { Course } from 'src/database/typeorm/entities/Course'
import { CategoryDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'

export class CoursesService implements ICoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async getCoursesByCategory(categoryDetails: CategoryDetails) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: Number(categoryDetails.id) }
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
                image
            }

            const course = this.courseRepository.create(courseDetails)
            return await this.courseRepository.save(course)
        } catch (error) {
            console.error(error)
        }
    }
}
