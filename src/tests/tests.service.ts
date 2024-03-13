import { HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Course } from 'src/database/typeorm/entities/Course'
import { Test } from 'src/database/typeorm/entities/Test'
import { CourseDetails } from 'src/utils/types'
import { Repository } from 'typeorm'
import { ITestsService } from './tests'

export class TestsService implements ITestsService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Test)
        private readonly testRepository: Repository<Test>
    ) {}

    async createTest(courseDetails: CourseDetails) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: courseDetails.id }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const testDetails = {
                name: course.name + ' Test',
                course
            }

            const test = this.testRepository.create(testDetails)
            return await this.testRepository.save(test)
        } catch (error) {
            console.error(error)
        }
    }

    async getTestByCourse(courseDetails: CourseDetails) {
        try {
            const course = await this.courseRepository.findOne({
                where: { id: Number(courseDetails.id) }
            })

            if (!course) {
                throw new HttpException('Wrong course', HttpStatus.NOT_FOUND)
            }

            const test = await this.testRepository.findOne({
                where: { course }
            })

            return test
        } catch (error) {}
    }
}
