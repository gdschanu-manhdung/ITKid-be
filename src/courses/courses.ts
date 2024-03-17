import { Course } from 'src/database/typeorm/entities/Course'
import { CategoryDetails, CourseDetails } from 'src/utils/types'
import { AddCourseDto } from './dto/AddCourse.dto'
import { PayCourseDto } from './dto/PayCourse.dto'

export interface ICoursesService {
    getCoursesByCategory(categoryDetails: CategoryDetails): Promise<Course[]>
    addCourse(addCourseDto: AddCourseDto): Promise<Course>
    payCourse(paycourseDto: PayCourseDto): Promise<string>
    doneCourse(paycourseDto: PayCourseDto): Promise<string>
    editCourse(courseDetails: CourseDetails): Promise<Course>
    deleteCourse(courseDetails: CourseDetails): Promise<string>
    updateAccess(courseDetails: CourseDetails): Promise<Course>
}
