import { Test } from '@nestjs/testing'
import { CourseDetails, TestDetails } from 'src/utils/types'

export interface ITestsService {
    createTest(courseDetails: CourseDetails): Promise<Test>
    getTestByCourse(courseDetails: CourseDetails): Promise<Test>
}
